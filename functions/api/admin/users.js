import { requireSession } from "../../../server/auth.js";
import { ensureDatabase } from "../../../server/database.js";
import { json, toErrorResponse } from "../../../server/http.js";

export const onRequestGet = async (context) => {
  try {
    const session = await requireSession(context.request, context.env);
    const db = await ensureDatabase(context.env);
    const email = String(new URL(context.request.url).searchParams.get("email") || session.email)
      .trim()
      .toLowerCase();

    const row = await db
      .prepare(
        `
        SELECT email, role
        FROM admin_users
        WHERE lower(email) = lower(?1)
          AND active = 1
        LIMIT 1
        `
      )
      .bind(email)
      .first();

    return json(row ?? null);
  } catch (error) {
    return toErrorResponse(error, "Unable to load admin access.");
  }
};
