import { requireSession } from "../../../../server/auth.js";
import { ensureDatabase } from "../../../../server/database.js";
import { json, toErrorResponse } from "../../../../server/http.js";
import { normalizeWhatsAppPhone } from "../../../../server/whatsapp.js";

const parsePayload = (value) => {
  try {
    return value ? JSON.parse(value) : null;
  } catch (_error) {
    return null;
  }
};

export const onRequestGet = async (context) => {
  try {
    await requireSession(context.request, context.env);

    const db = await ensureDatabase(context.env);
    const url = new URL(context.request.url);
    const phone = normalizeWhatsAppPhone(url.searchParams.get("phone"));

    const { results } = await db
      .prepare(
        `
        SELECT
          m.id,
          m.wa_message_id,
          m.contact_phone,
          c.profile_name,
          m.direction,
          m.message_type,
          m.text_body,
          m.payload_json,
          m.created_at
        FROM whatsapp_messages AS m
        LEFT JOIN whatsapp_contacts AS c
          ON c.phone = m.contact_phone
        WHERE (?1 IS NULL OR m.contact_phone = ?1)
        ORDER BY m.created_at DESC
        LIMIT 200
        `
      )
      .bind(phone || null)
      .all();

    return json({
      messages: (results || []).map((row) => ({
        id: row.id,
        wa_message_id: row.wa_message_id,
        contact_phone: row.contact_phone,
        profile_name: row.profile_name,
        direction: row.direction,
        message_type: row.message_type,
        text_body: row.text_body,
        payload: parsePayload(row.payload_json),
        created_at: row.created_at
      }))
    });
  } catch (error) {
    return toErrorResponse(error, "Unable to load WhatsApp messages.");
  }
};
