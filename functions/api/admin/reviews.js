import { requireSession } from "../../../server/auth.js";
import { ensureDatabase, normalizeReviewRow } from "../../../server/database.js";
import { json, readJson, toErrorResponse } from "../../../server/http.js";

const normalizeText = (value) =>
  String(value ?? "")
    .replace(/\s+/gu, " ")
    .trim();

export const onRequestPost = async (context) => {
  try {
    await requireSession(context.request, context.env);
    const db = await ensureDatabase(context.env);
    const body = await readJson(context.request);
    const reviewerName = normalizeText(body.reviewer_name ?? body.name);
    const eventType = normalizeText(body.event_type);
    const dateLabel = normalizeText(body.date_label ?? body.event_date);
    const reviewText = normalizeText(body.review_text);
    const isVisible = body.is_visible === undefined ? true : Boolean(body.is_visible);

    if (!reviewerName || !eventType || !dateLabel || !reviewText) {
      const error = new Error("Name, event, date, and review text are required.");
      error.status = 400;
      error.code = "REVIEW_INVALID";
      throw error;
    }

    const result = await db
      .prepare(
        `
        INSERT INTO reviews (
          reviewer_name,
          event_type,
          date_label,
          review_text,
          is_visible
        )
        VALUES (?1, ?2, ?3, ?4, ?5)
        RETURNING *
        `
      )
      .bind(reviewerName, eventType, dateLabel, reviewText, isVisible ? 1 : 0)
      .first();

    return json(normalizeReviewRow(result), { status: 201 });
  } catch (error) {
    return toErrorResponse(error, "Unable to add review.");
  }
};

export const onRequestDelete = async (context) => {
  try {
    await requireSession(context.request, context.env);
    const db = await ensureDatabase(context.env);
    const reviewId = Number.parseInt(
      String(new URL(context.request.url).searchParams.get("id") || "").trim(),
      10
    );

    if (!Number.isInteger(reviewId)) {
      const error = new Error("Review id is required.");
      error.status = 400;
      error.code = "REVIEW_ID_REQUIRED";
      throw error;
    }

    await db.prepare("DELETE FROM reviews WHERE id = ?1").bind(reviewId).run();
    return json({ success: true });
  } catch (error) {
    return toErrorResponse(error, "Unable to delete review.");
  }
};
