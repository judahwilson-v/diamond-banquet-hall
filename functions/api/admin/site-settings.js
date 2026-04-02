import { requireSession } from "../../../server/auth.js";
import { ensureDatabase, normalizeSiteSettingsRow } from "../../../server/database.js";
import { json, readJson, toErrorResponse } from "../../../server/http.js";

const allowedFields = new Set([
  "hall_name",
  "contact_number",
  "whatsapp_number",
  "instagram_handle",
  "google_maps_link",
  "hall_price",
  "room_price",
  "hall_price_4hrs",
  "room_price_night",
  "room_count",
  "location_label",
  "address_line_1",
  "address_line_2",
  "map_label",
  "inquiry_hours",
  "is_hall_open"
]);

const coerceBoolean = (value) =>
  value === true || value === 1 || value === "1" || String(value ?? "").toLowerCase() === "true";

const buildUpdateParts = (body) => {
  const entries = Object.entries(body).filter(([key]) => allowedFields.has(key));

  return entries.map(([key, value]) => [
    key,
    key === "is_hall_open" ? (coerceBoolean(value) ? 1 : 0) : value
  ]);
};

export const onRequestPatch = async (context) => {
  try {
    await requireSession(context.request, context.env);
    const db = await ensureDatabase(context.env);
    const body = await readJson(context.request);
    const updates = buildUpdateParts(body);

    if (updates.length) {
      const assignments = updates.map(([key], index) => `${key} = ?${index + 1}`);
      const values = updates.map(([, value]) => value);

      await db
        .prepare(
          `
          UPDATE site_settings
          SET ${assignments.join(", ")}
          WHERE id = 1
          `
        )
        .bind(...values)
        .run();
    }

    const row = await db
      .prepare("SELECT * FROM site_settings WHERE id = 1 LIMIT 1")
      .first();

    return json(normalizeSiteSettingsRow(row));
  } catch (error) {
    return toErrorResponse(error, "Unable to update venue settings.");
  }
};
