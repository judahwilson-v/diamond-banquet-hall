import { normalizeSiteSettingsRow, nowIso } from "./database.js";
import { DEFAULT_SITE_SETTINGS_ROW } from "./defaults.js";

const encoder = new TextEncoder();
const validDatePattern = /^\d{4}-\d{2}-\d{2}$/u;
const DEFAULT_GRAPH_API_VERSION = "v22.0";

const normalizeText = (value) =>
  String(value ?? "")
    .replace(/\s+/gu, " ")
    .trim();

export const normalizeWhatsAppPhone = (value) => String(value ?? "").replace(/\D/gu, "");

const bytesToHex = (value) =>
  Array.from(value, (byte) => byte.toString(16).padStart(2, "0")).join("");

const timingSafeEqual = (left, right) => {
  const leftValue = String(left ?? "");
  const rightValue = String(right ?? "");
  const maxLength = Math.max(leftValue.length, rightValue.length);
  let mismatch = leftValue.length ^ rightValue.length;

  for (let index = 0; index < maxLength; index += 1) {
    mismatch |=
      (leftValue.charCodeAt(index) || 0) ^ (rightValue.charCodeAt(index) || 0);
  }

  return mismatch === 0;
};

const importSigningKey = async (secret) =>
  crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    {
      name: "HMAC",
      hash: "SHA-256"
    },
    false,
    ["sign"]
  );

const signHex = async (payload, secret) => {
  const key = await importSigningKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return bytesToHex(new Uint8Array(signature));
};

const formatCurrency = (value) => {
  const amount = Number.parseInt(String(value ?? ""), 10);

  if (!Number.isFinite(amount) || amount <= 0) {
    return null;
  }

  return `Rs ${amount.toLocaleString("en-IN")}`;
};

const formatDisplayPhone = (value) => {
  const digits = normalizeWhatsAppPhone(value);

  if (!digits) {
    return "";
  }

  if (digits.length === 12 && digits.startsWith("91")) {
    return `+91 ${digits.slice(2)}`;
  }

  if (digits.length === 10) {
    return `+91 ${digits}`;
  }

  return `+${digits}`;
};

const buildBookingUrl = (origin) => new URL("/booking.html", origin).toString();

const buildMenuReply = (settings, origin) => {
  const lines = [
    `Hello from ${settings.hall_name}.`,
    settings.is_hall_open
      ? "I can help with prices, location, contact details, and date availability."
      : "Bookings are currently paused, but I can still share prices, location, and contact details.",
    "Reply with:",
    "price",
    "location",
    "availability 2026-05-01",
    "booking",
    "contact",
    `Booking form: ${buildBookingUrl(origin)}`
  ];

  return lines.join("\n");
};

const buildPricingReply = (settings, origin) => {
  const hallPrice = formatCurrency(settings.hall_price_4hrs || settings.hall_price);
  const roomPrice = formatCurrency(settings.room_price_night || settings.room_price);
  const lines = [`${settings.hall_name} pricing:`];

  if (hallPrice) {
    lines.push(`Hall (4 hours): ${hallPrice}`);
  }

  if (roomPrice) {
    lines.push(`Rooms: ${settings.room_count || 0} room(s), ${roomPrice} per room per night`);
  }

  lines.push(settings.is_hall_open ? "Reply with availability YYYY-MM-DD to check a date." : "Bookings are temporarily paused right now.");
  lines.push(`Booking form: ${buildBookingUrl(origin)}`);

  return lines.join("\n");
};

const buildLocationReply = (settings) => {
  const lines = [settings.hall_name];
  const addressLines = [settings.location_label, settings.address_line_1, settings.address_line_2]
    .map((value) => normalizeText(value))
    .filter(Boolean);

  lines.push(...addressLines);

  if (settings.google_maps_link) {
    lines.push(`Map: ${settings.google_maps_link}`);
  }

  return lines.join("\n");
};

const buildContactReply = (settings) => {
  const displayPhone = formatDisplayPhone(settings.whatsapp_number || settings.contact_number);
  const lines = [`Contact ${settings.hall_name}:`];

  if (displayPhone) {
    lines.push(`Call or WhatsApp: ${displayPhone}`);
  }

  if (settings.contact_number && settings.contact_number !== settings.whatsapp_number) {
    lines.push(`Call: ${formatDisplayPhone(settings.contact_number)}`);
  }

  if (settings.inquiry_hours) {
    lines.push(settings.inquiry_hours);
  }

  return lines.join("\n");
};

const buildBookingReply = (settings, origin) => {
  const lines = [];

  if (settings.is_hall_open) {
    lines.push(`You can request a booking here: ${buildBookingUrl(origin)}`);
    lines.push("You can also reply with availability YYYY-MM-DD to check a date first.");
  } else {
    lines.push("Bookings are currently paused.");
  }

  const contactReply = buildContactReply(settings);

  if (contactReply) {
    lines.push(contactReply);
  }

  return lines.join("\n");
};

const buildFallbackReply = (settings, origin) => [
  `I am the ${settings.hall_name} WhatsApp assistant.`,
  "Try one of these messages:",
  "price",
  "location",
  "availability 2026-05-01",
  "booking",
  "contact",
  `Booking form: ${buildBookingUrl(origin)}`
].join("\n");

const hasKeyword = (value, keywords) =>
  keywords.some((keyword) => value.includes(keyword));

const extractMessageText = (message) => {
  const type = normalizeText(message?.type).toLowerCase();

  if (type === "text") {
    return normalizeText(message?.text?.body);
  }

  if (type === "button") {
    return normalizeText(message?.button?.text || message?.button?.payload);
  }

  if (type === "interactive") {
    return normalizeText(
      message?.interactive?.button_reply?.title ||
        message?.interactive?.list_reply?.title ||
        message?.interactive?.nfm_reply?.body
    );
  }

  if (type === "image") {
    return normalizeText(message?.image?.caption || "image");
  }

  if (type === "video") {
    return normalizeText(message?.video?.caption || "video");
  }

  if (type === "document") {
    return normalizeText(message?.document?.caption || message?.document?.filename || "document");
  }

  if (type === "location") {
    return "location";
  }

  return normalizeText(type);
};

const extractDate = (value) => {
  const match = String(value ?? "").match(/\b(20\d{2}-\d{2}-\d{2})\b/u);
  return validDatePattern.test(match?.[1] || "") ? match[1] : null;
};

const loadSiteSettings = async (db) => {
  const row = await db
    .prepare("SELECT * FROM site_settings WHERE id = 1 LIMIT 1")
    .first();

  return normalizeSiteSettingsRow(row ?? DEFAULT_SITE_SETTINGS_ROW);
};

const findConfirmedBooking = async (db, eventDate) =>
  db
    .prepare(
      `
      SELECT id
      FROM bookings
      WHERE event_date = ?1
        AND status = 'confirmed'
      LIMIT 1
      `
    )
    .bind(eventDate)
    .first();

const buildAvailabilityReply = async (db, settings, eventDate, origin) => {
  if (!validDatePattern.test(eventDate)) {
    return "Please send the date like this: availability 2026-05-01";
  }

  if (!settings.is_hall_open) {
    return `Bookings are currently paused. Please contact ${settings.hall_name} directly for updates.`;
  }

  const existingBooking = await findConfirmedBooking(db, eventDate);

  if (existingBooking?.id) {
    return `${eventDate} is already booked. You can try another date or use ${buildBookingUrl(origin)} to send a request for a different day.`;
  }

  return `${eventDate} is currently available to request. Final confirmation happens after the team reviews your booking. Start here: ${buildBookingUrl(origin)}`;
};

export const buildWhatsAppReply = async ({ db, message, origin }) => {
  const settings = await loadSiteSettings(db);
  const normalizedMessage = normalizeText(message);
  const lowerMessage = normalizedMessage.toLowerCase();

  if (!normalizedMessage) {
    return buildMenuReply(settings, origin);
  }

  if (/^(hi|hello|hey|hii|menu|start)\b/iu.test(normalizedMessage)) {
    return buildMenuReply(settings, origin);
  }

  if (hasKeyword(lowerMessage, ["price", "pricing", "rate", "rates", "cost", "package"])) {
    return buildPricingReply(settings, origin);
  }

  if (hasKeyword(lowerMessage, ["location", "address", "map", "where"])) {
    return buildLocationReply(settings);
  }

  if (hasKeyword(lowerMessage, ["contact", "call", "phone", "number", "hours"])) {
    return buildContactReply(settings);
  }

  const extractedDate = extractDate(normalizedMessage);

  if (
    extractedDate &&
    (normalizedMessage === extractedDate ||
      hasKeyword(lowerMessage, ["availability", "available", "date", "slot", "free"]))
  ) {
    return buildAvailabilityReply(db, settings, extractedDate, origin);
  }

  if (hasKeyword(lowerMessage, ["book", "booking", "reserve", "reservation"])) {
    return buildBookingReply(settings, origin);
  }

  if (hasKeyword(lowerMessage, ["availability", "available", "date", "slot", "free"])) {
    return "Please send the date like this: availability 2026-05-01";
  }

  return buildFallbackReply(settings, origin);
};

export const assertValidWhatsAppSignature = async ({ request, rawBody, env }) => {
  const appSecret = normalizeText(env.WHATSAPP_APP_SECRET);

  if (!appSecret) {
    return;
  }

  const signatureHeader = normalizeText(request.headers.get("x-hub-signature-256"));

  if (!signatureHeader.startsWith("sha256=")) {
    const error = new Error("Missing WhatsApp webhook signature.");
    error.status = 401;
    error.code = "WHATSAPP_SIGNATURE_MISSING";
    throw error;
  }

  const expectedSignature = await signHex(rawBody, appSecret);
  const receivedSignature = signatureHeader.slice("sha256=".length).toLowerCase();

  if (!timingSafeEqual(receivedSignature, expectedSignature)) {
    const error = new Error("Invalid WhatsApp webhook signature.");
    error.status = 401;
    error.code = "WHATSAPP_SIGNATURE_INVALID";
    throw error;
  }
};

export const extractWhatsAppContacts = (payload) => {
  const contacts = [];

  for (const entry of payload?.entry || []) {
    for (const change of entry?.changes || []) {
      const changeValue = change?.value || {};

      for (const contact of changeValue?.contacts || []) {
        const phone = normalizeWhatsAppPhone(contact?.wa_id);

        if (!phone) {
          continue;
        }

        contacts.push({
          phone,
          profileName: normalizeText(contact?.profile?.name)
        });
      }
    }
  }

  return contacts;
};

export const upsertWhatsAppContact = async (db, { phone, profileName = "" }) => {
  const normalizedPhone = normalizeWhatsAppPhone(phone);

  if (!normalizedPhone) {
    return null;
  }

  const timestamp = nowIso();

  await db
    .prepare(
      `
      INSERT INTO whatsapp_contacts (
        phone,
        profile_name,
        last_message_at,
        created_at,
        updated_at
      )
      VALUES (?1, ?2, ?3, ?3, ?3)
      ON CONFLICT(phone) DO UPDATE SET
        profile_name = CASE
          WHEN excluded.profile_name IS NOT NULL AND excluded.profile_name <> '' THEN excluded.profile_name
          ELSE whatsapp_contacts.profile_name
        END,
        last_message_at = excluded.last_message_at,
        updated_at = excluded.updated_at
      `
    )
    .bind(normalizedPhone, normalizeText(profileName) || null, timestamp)
    .run();

  return {
    phone: normalizedPhone,
    profileName: normalizeText(profileName)
  };
};

export const hasWhatsAppMessage = async (db, waMessageId) => {
  if (!normalizeText(waMessageId)) {
    return false;
  }

  const row = await db
    .prepare(
      `
      SELECT 1 AS found
      FROM whatsapp_messages
      WHERE wa_message_id = ?1
      LIMIT 1
      `
    )
    .bind(waMessageId)
    .first();

  return Boolean(row?.found);
};

export const logWhatsAppMessage = async (
  db,
  {
    waMessageId,
    contactPhone,
    direction,
    messageType = "text",
    textBody = "",
    payload = null
  }
) => {
  const normalizedPhone = normalizeWhatsAppPhone(contactPhone);

  if (!normalizedPhone) {
    return null;
  }

  await db
    .prepare(
      `
      INSERT INTO whatsapp_messages (
        wa_message_id,
        contact_phone,
        direction,
        message_type,
        text_body,
        payload_json,
        created_at
      )
      VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
      `
    )
    .bind(
      normalizeText(waMessageId) || null,
      normalizedPhone,
      normalizeText(direction) || "inbound",
      normalizeText(messageType) || "text",
      normalizeText(textBody) || null,
      payload ? JSON.stringify(payload) : null,
      nowIso()
    )
    .run();

  return {
    waMessageId: normalizeText(waMessageId),
    contactPhone: normalizedPhone
  };
};

export const deleteWhatsAppMessage = async (db, waMessageId) => {
  if (!normalizeText(waMessageId)) {
    return;
  }

  await db
    .prepare("DELETE FROM whatsapp_messages WHERE wa_message_id = ?1")
    .bind(waMessageId)
    .run();
};

export const getIncomingMessageText = (message) => extractMessageText(message);

export const sendWhatsAppText = async ({ env, to, body }) => {
  const accessToken = normalizeText(env.WHATSAPP_ACCESS_TOKEN);
  const phoneNumberId = normalizeText(env.WHATSAPP_PHONE_NUMBER_ID);
  const apiVersion = normalizeText(env.WHATSAPP_API_VERSION) || DEFAULT_GRAPH_API_VERSION;
  const recipient = normalizeWhatsAppPhone(to);
  const messageBody = normalizeText(body);

  if (!accessToken || !phoneNumberId) {
    const error = new Error(
      "WhatsApp Cloud API is not configured. Add WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID."
    );
    error.status = 500;
    error.code = "WHATSAPP_NOT_CONFIGURED";
    throw error;
  }

  if (!recipient || !messageBody) {
    const error = new Error("WhatsApp message recipient or body is missing.");
    error.status = 400;
    error.code = "WHATSAPP_MESSAGE_INVALID";
    throw error;
  }

  const response = await fetch(
    `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: recipient,
        type: "text",
        text: {
          body: messageBody
        }
      })
    }
  );

  const responseBody = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(
      responseBody?.error?.message || "WhatsApp Cloud API rejected the message."
    );
    error.status = 502;
    error.code = "WHATSAPP_SEND_FAILED";
    throw error;
  }

  return {
    waMessageId: normalizeText(responseBody?.messages?.[0]?.id),
    payload: responseBody
  };
};
