import { ensureDatabase } from "../../server/database.js";
import { json, toErrorResponse } from "../../server/http.js";

const validDatePattern = /^\d{4}-\d{2}-\d{2}$/u;

export const onRequestGet = async (context) => {
  try {
    if (!context.env.DB) {
      return json([]);
    }

    const db = await ensureDatabase(context.env);
    const url = new URL(context.request.url);
    const startDate = validDatePattern.test(url.searchParams.get("startDate") || "")
      ? url.searchParams.get("startDate")
      : null;
    const endDate = validDatePattern.test(url.searchParams.get("endDate") || "")
      ? url.searchParams.get("endDate")
      : null;

    const { results } = await db
      .prepare(
        `
        SELECT event_date
        FROM bookings
        WHERE status = 'confirmed'
          AND (?1 IS NULL OR event_date >= ?1)
          AND (?2 IS NULL OR event_date <= ?2)
        ORDER BY event_date ASC
        `
      )
      .bind(startDate, endDate)
      .all();

    return json(results ?? []);
  } catch (error) {
    return toErrorResponse(error, "Unable to load booked dates.");
  }
};
