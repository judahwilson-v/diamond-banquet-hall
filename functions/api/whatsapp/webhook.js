import { ensureDatabase } from "../../../server/database.js";
import { json, toErrorResponse } from "../../../server/http.js";
import {
  assertValidWhatsAppSignature,
  buildWhatsAppReply,
  deleteWhatsAppMessage,
  getIncomingMessageText,
  hasWhatsAppMessage,
  logWhatsAppMessage,
  normalizeWhatsAppPhone,
  sendWhatsAppText,
  upsertWhatsAppContact
} from "../../../server/whatsapp.js";

const normalizeText = (value) =>
  String(value ?? "")
    .replace(/\s+/gu, " ")
    .trim();

const readWebhookBody = (rawBody) => {
  if (!normalizeText(rawBody)) {
    return {};
  }

  try {
    return JSON.parse(rawBody);
  } catch (_error) {
    const error = new Error("Invalid WhatsApp webhook payload.");
    error.status = 400;
    error.code = "WHATSAPP_INVALID_JSON";
    throw error;
  }
};

const findProfileName = (changeValue, phone) => {
  const normalizedPhone = normalizeWhatsAppPhone(phone);

  for (const contact of changeValue?.contacts || []) {
    if (normalizeWhatsAppPhone(contact?.wa_id) === normalizedPhone) {
      return normalizeText(contact?.profile?.name);
    }
  }

  return "";
};

const logStatusEvents = async (db, statuses) => {
  for (const status of statuses || []) {
    const recipientPhone = normalizeWhatsAppPhone(status?.recipient_id);

    if (!recipientPhone) {
      continue;
    }

    await upsertWhatsAppContact(db, { phone: recipientPhone });

    const statusId = normalizeText(status?.id);
    const statusLabel = normalizeText(status?.status || "status").toLowerCase() || "status";
    const storedStatusId = statusId ? `status:${statusId}:${statusLabel}` : "";

    if (storedStatusId && (await hasWhatsAppMessage(db, storedStatusId))) {
      continue;
    }

    await logWhatsAppMessage(db, {
      waMessageId: storedStatusId || null,
      contactPhone: recipientPhone,
      direction: "status",
      messageType: statusLabel,
      textBody: statusLabel,
      payload: status
    });
  }
};

const handleInboundMessage = async (db, env, message, profileName, origin) => {
  const inboundId = normalizeText(message?.id);
  const senderPhone = normalizeWhatsAppPhone(message?.from);

  if (!inboundId || !senderPhone) {
    return { processed: false };
  }

  if (await hasWhatsAppMessage(db, inboundId)) {
    return { processed: false, duplicate: true };
  }

  await upsertWhatsAppContact(db, { phone: senderPhone, profileName });

  const inboundText = getIncomingMessageText(message);
  const messageType = normalizeText(message?.type).toLowerCase() || "text";
  const replyBody = await buildWhatsAppReply({
    db,
    message: inboundText,
    origin
  });

  await logWhatsAppMessage(db, {
    waMessageId: inboundId,
    contactPhone: senderPhone,
    direction: "inbound",
    messageType,
    textBody: inboundText,
    payload: message
  });

  let outboundResponse;

  try {
    outboundResponse = await sendWhatsAppText({
      env,
      to: senderPhone,
      body: replyBody
    });
  } catch (error) {
    await deleteWhatsAppMessage(db, inboundId);
    throw error;
  }

  await logWhatsAppMessage(db, {
    waMessageId: outboundResponse.waMessageId || null,
    contactPhone: senderPhone,
    direction: "outbound",
    messageType: "text",
    textBody: replyBody,
    payload: outboundResponse.payload
  });

  return { processed: true };
};

const processWebhookPayload = async (db, env, payload, origin) => {
  let inboundCount = 0;
  let statusCount = 0;

  for (const entry of payload?.entry || []) {
    for (const change of entry?.changes || []) {
      const changeValue = change?.value || {};

      await logStatusEvents(db, changeValue.statuses);
      statusCount += Array.isArray(changeValue.statuses) ? changeValue.statuses.length : 0;

      for (const message of changeValue.messages || []) {
        const profileName = findProfileName(changeValue, message?.from);
        const result = await handleInboundMessage(db, env, message, profileName, origin);

        if (result.processed) {
          inboundCount += 1;
        }
      }
    }
  }

  return {
    inboundCount,
    statusCount
  };
};

export const onRequestGet = async (context) => {
  const verifyToken = normalizeText(context.env.WHATSAPP_VERIFY_TOKEN);

  if (!verifyToken) {
    return new Response("WHATSAPP_VERIFY_TOKEN is missing.", { status: 500 });
  }

  const url = new URL(context.request.url);
  const mode = normalizeText(url.searchParams.get("hub.mode"));
  const token = normalizeText(url.searchParams.get("hub.verify_token"));
  const challenge = url.searchParams.get("hub.challenge") || "";

  if (mode === "subscribe" && token === verifyToken) {
    return new Response(challenge, { status: 200 });
  }

  return new Response("Forbidden", { status: 403 });
};

export const onRequestPost = async (context) => {
  try {
    const rawBody = await context.request.text();
    await assertValidWhatsAppSignature({
      request: context.request,
      rawBody,
      env: context.env
    });

    const payload = readWebhookBody(rawBody);

    if (payload?.object !== "whatsapp_business_account") {
      return json({
        success: true,
        ignored: true
      });
    }

    const db = await ensureDatabase(context.env);
    const origin = new URL(context.request.url).origin;
    const result = await processWebhookPayload(db, context.env, payload, origin);

    return json({
      success: true,
      ...result
    });
  } catch (error) {
    return toErrorResponse(error, "Unable to process the WhatsApp webhook.");
  }
};
