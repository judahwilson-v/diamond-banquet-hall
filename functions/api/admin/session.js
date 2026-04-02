import {
  clearSessionCookie,
  createSessionCookie,
  createSessionPayload,
  createSessionToken,
  normalizeAdminEmail,
  readSession,
  verifyAdminPassword
} from "../../../server/auth.js";
import { ensureDatabase } from "../../../server/database.js";
import { json, readJson, toErrorResponse } from "../../../server/http.js";

const loadAdminRow = async (db, email) =>
  db
    .prepare(
      `
      SELECT email, password_hash, password_salt, role, active
      FROM admin_users
      WHERE lower(email) = lower(?1)
      LIMIT 1
      `
    )
    .bind(email)
    .first();

export const onRequestGet = async (context) => {
  try {
    const session = await readSession(context.request, context.env);

    if (!session) {
      return json({ session: null });
    }

    const db = await ensureDatabase(context.env);
    const adminRow = await loadAdminRow(db, session.email);

    if (!adminRow || Number(adminRow.active) !== 1) {
      return json(
        { session: null },
        {
          headers: {
            "set-cookie": clearSessionCookie()
          }
        }
      );
    }

    return json({
      session: createSessionPayload({
        email: normalizeAdminEmail(adminRow.email),
        role: String(adminRow.role ?? "").trim().toLowerCase()
      })
    });
  } catch (error) {
    return toErrorResponse(error, "Unable to read the admin session.");
  }
};

export const onRequestPost = async (context) => {
  try {
    const db = await ensureDatabase(context.env);
    const body = await readJson(context.request);
    const email = normalizeAdminEmail(body.email);
    const password = String(body.password ?? "");

    if (!email || !password) {
      const error = new Error("Enter both your admin email and password.");
      error.status = 400;
      error.code = "LOGIN_INCOMPLETE";
      throw error;
    }

    const adminRow = await loadAdminRow(db, email);

    if (!adminRow || Number(adminRow.active) !== 1) {
      const error = new Error("Incorrect email or password.");
      error.status = 401;
      error.code = "LOGIN_INVALID";
      throw error;
    }

    const isValid = await verifyAdminPassword(password, adminRow);

    if (!isValid) {
      const error = new Error("Incorrect email or password.");
      error.status = 401;
      error.code = "LOGIN_INVALID";
      throw error;
    }

    const normalizedSession = {
      email,
      role: String(adminRow.role ?? "").trim().toLowerCase()
    };
    const token = await createSessionToken(normalizedSession, context.env);

    return json(
      {
        session: createSessionPayload(normalizedSession)
      },
      {
        headers: {
          "set-cookie": createSessionCookie(token)
        }
      }
    );
  } catch (error) {
    return toErrorResponse(error, "Unable to sign in.");
  }
};

export const onRequestDelete = async () =>
  json(
    { success: true },
    {
      headers: {
        "set-cookie": clearSessionCookie()
      }
    }
  );
