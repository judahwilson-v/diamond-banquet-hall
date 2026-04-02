import { requireSession } from "../../../server/auth.js";
import { ensureDatabase, nowIso } from "../../../server/database.js";
import { json, readJson, toErrorResponse } from "../../../server/http.js";

const VALID_STATUSES = new Set(["new", "contacted", "booked", "cancelled"]);

export const onRequestGet = async (context) => {
  try {
    await requireSession(context.request, context.env, { superAdminOnly: true });
    const db = await ensureDatabase(context.env);
    const { results } = await db
      .prepare(
        `
        SELECT id, booking_id, customer_name, customer_phone, event_date, message, status, created_at
        FROM enquiries
        ORDER BY created_at DESC, id DESC
        `
      )
      .all();

    return json(results ?? []);
  } catch (error) {
    return toErrorResponse(error, "Unable to load enquiries.");
  }
};

export const onRequestPatch = async (context) => {
  try {
    await requireSession(context.request, context.env, { superAdminOnly: true });
    const db = await ensureDatabase(context.env);
    const body = await readJson(context.request);
    const enquiryId = Number.parseInt(String(body.id ?? "").trim(), 10);
    const status = String(body.status ?? "").trim().toLowerCase();

    if (!Number.isInteger(enquiryId) || !VALID_STATUSES.has(status)) {
      const error = new Error("Enquiry update is invalid.");
      error.status = 400;
      error.code = "ENQUIRY_UPDATE_INVALID";
      throw error;
    }

    await db
      .prepare(
        `
        UPDATE enquiries
        SET status = ?1,
            updated_at = ?2
        WHERE id = ?3
        `
      )
      .bind(status, nowIso(), enquiryId)
      .run();

    const row = await db
      .prepare(
        `
        SELECT id, booking_id, customer_name, customer_phone, event_date, message, status, created_at
        FROM enquiries
        WHERE id = ?1
        LIMIT 1
        `
      )
      .bind(enquiryId)
      .first();

    return json(row ?? null);
  } catch (error) {
    return toErrorResponse(error, "Unable to update enquiry.");
  }
};

export const onRequestDelete = async (context) => {
  try {
    await requireSession(context.request, context.env, { superAdminOnly: true });
    const db = await ensureDatabase(context.env);
    const enquiryId = Number.parseInt(
      String(new URL(context.request.url).searchParams.get("id") || "").trim(),
      10
    );

    if (!Number.isInteger(enquiryId)) {
      const error = new Error("Enquiry id is required.");
      error.status = 400;
      error.code = "ENQUIRY_ID_REQUIRED";
      throw error;
    }

    await db.prepare("DELETE FROM enquiries WHERE id = ?1").bind(enquiryId).run();
    return json({ success: true });
  } catch (error) {
    return toErrorResponse(error, "Unable to delete enquiry.");
  }
};
