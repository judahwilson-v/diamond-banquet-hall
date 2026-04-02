import { ensureDatabase, normalizeSiteSettingsRow } from "../../server/database.js";
import { json, readJson, toErrorResponse } from "../../server/http.js";

const validDatePattern = /^\d{4}-\d{2}-\d{2}$/u;

const normalizeText = (value) =>
  String(value ?? "")
    .replace(/\s+/gu, " ")
    .trim();

const normalizeEmail = (value) => normalizeText(value).toLowerCase();

const normalizePhone = (value) => String(value ?? "").replace(/\D/g, "");

export const onRequestPost = async (context) => {
  try {
    const db = await ensureDatabase(context.env);
    const body = await readJson(context.request);
    const bookingId = normalizeText(body.p_booking_id || crypto.randomUUID());
    const customerName = normalizeText(body.p_customer_name);
    const customerEmail = normalizeEmail(body.p_customer_email);
    const customerPhone = normalizePhone(body.p_customer_phone);
    const organisation = normalizeText(body.p_organisation);
    const eventType = normalizeText(body.p_event_type || "Other") || "Other";
    const notes = normalizeText(body.p_notes);
    const enquiryMessage = normalizeText(body.p_enquiry_message);
    const eventDate = normalizeText(body.p_event_date);
    const guestCount = Number.parseInt(String(body.p_guest_count ?? "").trim(), 10);

    if (!customerName) {
      const error = new Error("Please enter your name.");
      error.status = 400;
      error.code = "BOOKING_NAME_REQUIRED";
      throw error;
    }

    if (!validDatePattern.test(eventDate)) {
      const error = new Error("Please choose a valid booking date.");
      error.status = 400;
      error.code = "BOOKING_DATE_INVALID";
      throw error;
    }

    if (!customerPhone || (customerPhone.length !== 10 && customerPhone.length !== 12)) {
      const error = new Error("Please enter a valid phone number.");
      error.status = 400;
      error.code = "BOOKING_PHONE_INVALID";
      throw error;
    }

    if (!Number.isInteger(guestCount) || guestCount < 1) {
      const error = new Error("Attendee count must be at least 1.");
      error.status = 400;
      error.code = "BOOKING_GUESTS_INVALID";
      throw error;
    }

    if (customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(customerEmail)) {
      const error = new Error("Please enter a valid email address.");
      error.status = 400;
      error.code = "BOOKING_EMAIL_INVALID";
      throw error;
    }

    const settingsRow = await db
      .prepare("SELECT * FROM site_settings WHERE id = 1 LIMIT 1")
      .first();
    const settings = normalizeSiteSettingsRow(settingsRow);

    if (settings?.is_hall_open === false) {
      const error = new Error(
        "Hall bookings are temporarily paused. Please contact Diamond Banquet Hall directly."
      );
      error.status = 409;
      error.code = "BOOKING_PAUSED";
      throw error;
    }

    const existingConfirmed = await db
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

    if (existingConfirmed?.id) {
      const error = new Error("This date is no longer available.");
      error.status = 409;
      error.code = "DATE_ALREADY_BOOKED";
      throw error;
    }

    await db
      .prepare(
        `
        INSERT INTO bookings (
          id,
          customer_name,
          customer_email,
          customer_phone,
          organisation,
          event_type,
          notes,
          event_date,
          guest_count,
          status
        )
        VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, 'pending')
        `
      )
      .bind(
        bookingId,
        customerName,
        customerEmail || null,
        customerPhone,
        organisation || null,
        eventType,
        notes || null,
        eventDate,
        guestCount
      )
      .run();

    if (enquiryMessage) {
      await db
        .prepare(
          `
          INSERT INTO enquiries (
            booking_id,
            customer_name,
            customer_phone,
            customer_email,
            event_date,
            message,
            status
          )
          VALUES (?1, ?2, ?3, ?4, ?5, ?6, 'new')
          `
        )
        .bind(
          bookingId,
          customerName,
          customerPhone,
          customerEmail || null,
          eventDate,
          enquiryMessage
        )
        .run();
    }

    const bookingRow = await db
      .prepare(
        `
        SELECT id, event_date, status
        FROM bookings
        WHERE id = ?1
        LIMIT 1
        `
      )
      .bind(bookingId)
      .first();

    return json(bookingRow ?? { id: bookingId, event_date: eventDate, status: "pending" }, {
      status: 201
    });
  } catch (error) {
    return toErrorResponse(error, "Unable to save the booking request.");
  }
};
