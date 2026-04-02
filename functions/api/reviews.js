import { ensureDatabase, normalizeReviewRows } from "../../server/database.js";
import { DEFAULT_REVIEW_ROWS } from "../../server/defaults.js";
import { json, toErrorResponse } from "../../server/http.js";

export const onRequestGet = async (context) => {
  try {
    if (!context.env.DB) {
      return json(normalizeReviewRows(DEFAULT_REVIEW_ROWS));
    }

    const db = await ensureDatabase(context.env);
    const { results } = await db
      .prepare(
        `
        SELECT *
        FROM reviews
        WHERE is_visible = 1
        ORDER BY created_at ASC, id ASC
        `
      )
      .all();

    return json(normalizeReviewRows(results ?? []));
  } catch (error) {
    return toErrorResponse(error, "Unable to load reviews.");
  }
};
