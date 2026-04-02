import { hashPassword } from "./password-hash.js";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const SESSION_COOKIE_NAME = "diamond_admin_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

const bytesToBase64Url = (bytes) =>
  btoa(String.fromCharCode(...bytes))
    .replace(/\+/gu, "-")
    .replace(/\//gu, "_")
    .replace(/=+$/u, "");

const base64UrlToBytes = (value) => {
  const normalized = String(value ?? "")
    .replace(/-/gu, "+")
    .replace(/_/gu, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  const binary = atob(`${normalized}${padding}`);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
};

const timingSafeEqual = (left, right) => {
  const leftValue = String(left ?? "");
  const rightValue = String(right ?? "");
  const maxLength = Math.max(leftValue.length, rightValue.length);
  let mismatch = leftValue.length ^ rightValue.length;

  for (let index = 0; index < maxLength; index += 1) {
    mismatch |=
      (leftValue.charCodeAt(index) || 0) ^ (rightValue.charCodeAt(index) || 0);
  }

  return mismatch === 0;
};

const getSessionSecret = (env) => String(env.DIAMOND_SESSION_SECRET ?? "").trim();

const importSigningKey = async (secret) =>
  crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    {
      name: "HMAC",
      hash: "SHA-256"
    },
    false,
    ["sign"]
  );

const signPayload = async (payloadEncoded, secret) => {
  const signingKey = await importSigningKey(secret);
  const signature = await crypto.subtle.sign("HMAC", signingKey, encoder.encode(payloadEncoded));
  return bytesToBase64Url(new Uint8Array(signature));
};

const parseCookies = (request) => {
  const header = request.headers.get("cookie") || "";
  const pairs = header
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean);

  return pairs.reduce((cookies, pair) => {
    const separatorIndex = pair.indexOf("=");

    if (separatorIndex === -1) {
      return cookies;
    }

    const key = pair.slice(0, separatorIndex).trim();
    const value = pair.slice(separatorIndex + 1).trim();
    cookies[key] = value;
    return cookies;
  }, {});
};

export const createSessionCookie = (token) =>
  `${SESSION_COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_TTL_SECONDS}`;

export const clearSessionCookie = () =>
  `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;

export const createSessionToken = async ({ email, role }, env) => {
  const secret = getSessionSecret(env);

  if (!secret) {
    const error = new Error(
      "DIAMOND_SESSION_SECRET is missing. Set it in your Cloudflare Pages environment."
    );
    error.status = 500;
    error.code = "SESSION_SECRET_MISSING";
    throw error;
  }

  const payload = {
    email: String(email ?? "").trim().toLowerCase(),
    role: String(role ?? "").trim().toLowerCase(),
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  };
  const payloadEncoded = bytesToBase64Url(encoder.encode(JSON.stringify(payload)));
  const signature = await signPayload(payloadEncoded, secret);
  return `${payloadEncoded}.${signature}`;
};

export const readSession = async (request, env) => {
  const token = parseCookies(request)[SESSION_COOKIE_NAME];
  const secret = getSessionSecret(env);

  if (!token || !secret) {
    return null;
  }

  const [payloadEncoded, signature] = token.split(".");

  if (!payloadEncoded || !signature) {
    return null;
  }

  const expectedSignature = await signPayload(payloadEncoded, secret);

  if (!timingSafeEqual(signature, expectedSignature)) {
    return null;
  }

  try {
    const payload = JSON.parse(decoder.decode(base64UrlToBytes(payloadEncoded)));

    if (!payload?.email || !payload?.role || !Number.isFinite(payload?.exp)) {
      return null;
    }

    if (payload.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    return {
      email: String(payload.email).trim().toLowerCase(),
      role: String(payload.role).trim().toLowerCase()
    };
  } catch (_error) {
    return null;
  }
};

export const requireSession = async (request, env, { superAdminOnly = false } = {}) => {
  const session = await readSession(request, env);

  if (!session) {
    const error = new Error("You need to sign in first.");
    error.status = 401;
    error.code = "AUTH_REQUIRED";
    throw error;
  }

  if (superAdminOnly && session.role !== "super_admin") {
    const error = new Error("Only a super admin can perform this action.");
    error.status = 403;
    error.code = "FORBIDDEN";
    throw error;
  }

  return session;
};

export const createSessionPayload = (session) =>
  session
    ? {
        user: {
          email: session.email,
          role: session.role
        }
      }
    : null;

export const normalizeAdminEmail = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

export const verifyAdminPassword = async (password, userRow) =>
  hashPassword(password, userRow.password_salt).then((value) =>
    timingSafeEqual(value, String(userRow.password_hash ?? ""))
  );
