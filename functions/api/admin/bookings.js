import { requireSession } from "../../../server/auth.js";
import { ensureDatabase, nowIso } from "../../../server/database.js";
import { json, readJson, toErrorResponse } from "../../../server/http.js";

const VALID_STATUSES = new Set(["pending", "confirmed", "cancelled"]);
const validDatePattern = /^\d{4}-\d{2}-\d{2}$/u;

const normalizeText = (value) =>
  String(value ?? "")
    .replace(/\s+/gu, " ")
    .trim();

const normalizeEmail = (value) => normalizeText(value).toLowerCase();

const parseGuestCount = (value) => {
  const parsed = Number.parseInt(String(value ?? "").trim(), 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
};

export const onRequestGet = async (context) => {
  try {
    await requireSession(context.request, context.env);
    const db = await ensureDatabase(context.env);
    const { results } = await db
      .prepare(
        `
        SELECT id, customer_name, customer_email, event_date, guest_count, status, created_at
        FROM bookings
        ORDER BY event_date ASC, created_at DESC
        `
      )
      .all();

    return json(results ?? []);
  } catch (error) {
    return toErrorResponse(error, "Unable to load bookings.");
  }
};

export const onRequestPatch = async (context) => {
  try {
    const session = await requireSession(context.request, context.env);
    const db = await ensureDatabase(context.env);
    const body = await readJson(context.request);
    const bookingId = normalizeText(body.p_booking_id || body.id);
    const customerName = normalizeText(body.p_customer_name || body.customer_name);
    const customerEmail = normalizeEmail(body.p_customer_email || body.customer_email);
    const eventDate = normalizeText(body.p_event_date || body.event_date);
    const guestCount = parseGuestCount(body.p_guest_count ?? body.guest_count);
    const status = normalizeText(body.p_status || body.status).toLowerCase();
    const overrideConflict = body.p_override_conflict === true || body.overrideConflict === true;

    if (!bookingId) {
      const error = new Error("Booking id is required.");
      error.status = 400;
      error.code = "BOOKING_ID_REQUIRED";
      throw error;
    }

    if (!customerName || !validDatePattern.test(eventDate) || !guestCount || !VALID_STATUSES.has(status)) {
      const error = new Error("Booking details are incomplete.");
      error.status = 400;
      error.code = "BOOKING_UPDATE_INVALID";
      throw error;
    }

    const existingBooking = await db
      .prepare("SELECT id FROM bookings WHERE id = ?1 LIMIT 1")
      .bind(bookingId)
      .first();

    if (!existingBooking?.id) {
      const error = new Error("Booking not found.");
      error.status = 404;
      error.code = "BOOKING_NOT_FOUND";
      throw error;
    }

    const conflictingBooking = await db
      .prepare(
        `
        SELECT id
        FROM bookings
        WHERE event_date = ?1
          AND status = 'confirmed'
          AND id <> ?2
        LIMIT 1
        `
      )
      .bind(eventDate, bookingId)
      .first();

    if (status === "confirmed" && conflictingBooking?.id) {
      if (!overrideConflict || session.role !== "super_admin") {
        const error = new Error("A confirmed booking already exists for this date.");
        error.status = 409;
        error.code = "BOOKING_CONFLICT";
        throw error;
      }

      await db
        .prepare(
          `
          UPDATE bookings
          SET status = 'cancelled',
              updated_at = ?1
          WHERE event_date = ?2
            AND status = 'confirmed'
            AND id <> ?3
          `
        )
        .bind(nowIso(), eventDate, bookingId)
        .run();
    }

    await db
      .prepare(
        `
        UPDATE bookings
        SET customer_name = ?1,
            customer_email = ?2,
            event_date = ?3,
            guest_count = ?4,
            status = ?5,
            updated_at = ?6
        WHERE id = ?7
        `
      )
      .bind(
        customerName,
        customerEmail || null,
        eventDate,
        guestCount,
        status,
        nowIso(),
        bookingId
      )
      .run();

    const updatedRow = await db
      .prepare(
        `
        SELECT id, customer_name, customer_email, event_date, guest_count, status, created_at
        FROM bookings
        WHERE id = ?1
        LIMIT 1
        `
      )
      .bind(bookingId)
      .first();

    return json(updatedRow ?? null);
  } catch (error) {
    return toErrorResponse(error, "Unable to update booking.");
  }
};

export const onRequestDelete = async (context) => {
  try {
    await requireSession(context.request, context.env, { superAdminOnly: true });
    const db = await ensureDatabase(context.env);
    const url = new URL(context.request.url);
    const bookingId = String(url.searchParams.get("id") || "").trim();

    if (!bookingId) {
      const error = new Error("Booking id is required.");
      error.status = 400;
      error.code = "BOOKING_ID_REQUIRED";
      throw error;
    }

    await db.prepare("DELETE FROM enquiries WHERE booking_id = ?1").bind(bookingId).run();
    await db.prepare("DELETE FROM bookings WHERE id = ?1").bind(bookingId).run();
    return json({ success: true });
  } catch (error) {
    return toErrorResponse(error, "Unable to delete booking.");
  }
};
