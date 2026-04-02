import { DEFAULT_REVIEW_ROWS, DEFAULT_SITE_SETTINGS_ROW } from "./defaults.js";

const compactSql = (value) => String(value ?? "").replace(/\s+/gu, " ").trim();

const SCHEMA_STATEMENTS = [
  compactSql(`
    CREATE TABLE IF NOT EXISTS site_settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      hall_name TEXT NOT NULL,
      contact_number TEXT NOT NULL,
      whatsapp_number TEXT,
      instagram_handle TEXT,
      google_maps_link TEXT,
      hall_price INTEGER NOT NULL DEFAULT 30000,
      room_price INTEGER NOT NULL DEFAULT 1500,
      hall_price_4hrs INTEGER NOT NULL DEFAULT 30000,
      room_price_night INTEGER NOT NULL DEFAULT 1500,
      room_count INTEGER NOT NULL DEFAULT 4,
      location_label TEXT,
      address_line_1 TEXT,
      address_line_2 TEXT,
      map_label TEXT,
      inquiry_hours TEXT,
      is_hall_open INTEGER NOT NULL DEFAULT 1
    )
  `),
  compactSql(`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      customer_name TEXT NOT NULL,
      customer_email TEXT,
      customer_phone TEXT NOT NULL,
      organisation TEXT,
      event_type TEXT NOT NULL DEFAULT 'Other',
      notes TEXT,
      event_date TEXT NOT NULL,
      guest_count INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `),
  compactSql(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      booking_id TEXT,
      customer_name TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      customer_email TEXT,
      event_date TEXT,
      message TEXT,
      status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'booked', 'cancelled')),
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
    )
  `),
  compactSql(`
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reviewer_name TEXT NOT NULL,
      event_type TEXT NOT NULL,
      date_label TEXT NOT NULL,
      review_text TEXT NOT NULL,
      is_visible INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `),
  compactSql(`
    CREATE TABLE IF NOT EXISTS admin_users (
      email TEXT PRIMARY KEY,
      password_hash TEXT NOT NULL,
      password_salt TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'staff_admin' CHECK (role IN ('super_admin', 'staff_admin')),
      active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `),
  compactSql(`
    CREATE TABLE IF NOT EXISTS whatsapp_contacts (
      phone TEXT PRIMARY KEY,
      profile_name TEXT,
      last_message_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `),
  compactSql(`
    CREATE TABLE IF NOT EXISTS whatsapp_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      wa_message_id TEXT UNIQUE,
      contact_phone TEXT NOT NULL,
      direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound', 'status')),
      message_type TEXT NOT NULL DEFAULT 'text',
      text_body TEXT,
      payload_json TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (contact_phone) REFERENCES whatsapp_contacts(phone) ON DELETE CASCADE
    )
  `),
  "CREATE INDEX IF NOT EXISTS bookings_event_date_idx ON bookings(event_date ASC)",
  "CREATE INDEX IF NOT EXISTS bookings_status_idx ON bookings(status ASC, event_date ASC)",
  "CREATE INDEX IF NOT EXISTS enquiries_status_idx ON enquiries(status ASC, created_at DESC)",
  "CREATE INDEX IF NOT EXISTS reviews_visible_idx ON reviews(is_visible ASC, created_at ASC)",
  "CREATE INDEX IF NOT EXISTS whatsapp_messages_contact_idx ON whatsapp_messages(contact_phone, created_at DESC)"
];

let initializationPromise = null;

const assertDatabase = (env) => {
  if (!env?.DB) {
    const error = new Error(
      "Cloudflare D1 binding `DB` is not configured. Add it in wrangler.jsonc or the Pages dashboard."
    );
    error.status = 500;
    error.code = "DB_NOT_CONFIGURED";
    throw error;
  }

  return env.DB;
};

const coerceBoolean = (value) =>
  value === true || value === 1 || value === "1" || String(value ?? "").toLowerCase() === "true";

const seedSiteSettings = async (db) => {
  await db
    .prepare(
      `
      INSERT OR IGNORE INTO site_settings (
        id,
        hall_name,
        contact_number,
        whatsapp_number,
        instagram_handle,
        google_maps_link,
        hall_price,
        room_price,
        hall_price_4hrs,
        room_price_night,
        room_count,
        location_label,
        address_line_1,
        address_line_2,
        map_label,
        inquiry_hours,
        is_hall_open
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `
    )
    .bind(
      DEFAULT_SITE_SETTINGS_ROW.id,
      DEFAULT_SITE_SETTINGS_ROW.hall_name,
      DEFAULT_SITE_SETTINGS_ROW.contact_number,
      DEFAULT_SITE_SETTINGS_ROW.whatsapp_number,
      DEFAULT_SITE_SETTINGS_ROW.instagram_handle,
      DEFAULT_SITE_SETTINGS_ROW.google_maps_link,
      DEFAULT_SITE_SETTINGS_ROW.hall_price,
      DEFAULT_SITE_SETTINGS_ROW.room_price,
      DEFAULT_SITE_SETTINGS_ROW.hall_price_4hrs,
      DEFAULT_SITE_SETTINGS_ROW.room_price_night,
      DEFAULT_SITE_SETTINGS_ROW.room_count,
      DEFAULT_SITE_SETTINGS_ROW.location_label,
      DEFAULT_SITE_SETTINGS_ROW.address_line_1,
      DEFAULT_SITE_SETTINGS_ROW.address_line_2,
      DEFAULT_SITE_SETTINGS_ROW.map_label,
      DEFAULT_SITE_SETTINGS_ROW.inquiry_hours,
      DEFAULT_SITE_SETTINGS_ROW.is_hall_open ? 1 : 0
    )
    .run();
};

const seedReviews = async (db) => {
  const reviewCountRow = await db.prepare("SELECT COUNT(*) AS count FROM reviews").first();

  if (Number(reviewCountRow?.count || 0) > 0) {
    return;
  }

  const statements = DEFAULT_REVIEW_ROWS.map((review) =>
    db
      .prepare(
        `
        INSERT INTO reviews (
          reviewer_name,
          event_type,
          date_label,
          review_text,
          is_visible
        )
        VALUES (?, ?, ?, ?, ?)
        `
      )
      .bind(
        review.reviewer_name,
        review.event_type,
        review.date_label,
        review.review_text,
        review.is_visible ? 1 : 0
      )
  );

  if (statements.length) {
    await db.batch(statements);
  }
};

const bootstrapAdminUser = async (db, env) => {
  const email = String(env.DIAMOND_ADMIN_EMAIL ?? "").trim().toLowerCase();
  const passwordHash = String(env.DIAMOND_ADMIN_PASSWORD_HASH ?? "").trim().toLowerCase();
  const passwordSalt = String(env.DIAMOND_ADMIN_PASSWORD_SALT ?? "").trim().toLowerCase();
  const role =
    String(env.DIAMOND_ADMIN_ROLE ?? "super_admin").trim().toLowerCase() === "staff_admin"
      ? "staff_admin"
      : "super_admin";

  if (!email || !passwordHash || !passwordSalt) {
    return;
  }

  await db
    .prepare(
      `
      INSERT INTO admin_users (email, password_hash, password_salt, role, active)
      VALUES (?, ?, ?, ?, 1)
      ON CONFLICT(email) DO UPDATE SET
        password_hash = excluded.password_hash,
        password_salt = excluded.password_salt,
        role = excluded.role,
        active = 1
      `
    )
    .bind(email, passwordHash, passwordSalt, role)
    .run();
};

export const ensureDatabase = async (env) => {
  const db = assertDatabase(env);

  if (!initializationPromise) {
    initializationPromise = (async () => {
      for (const statement of SCHEMA_STATEMENTS) {
        await db.exec(statement);
      }
      await seedSiteSettings(db);
      await seedReviews(db);
      await bootstrapAdminUser(db, env);
    })().catch((error) => {
      initializationPromise = null;
      throw error;
    });
  }

  await initializationPromise;
  return db;
};

export const normalizeSiteSettingsRow = (row) => {
  if (!row) {
    return null;
  }

  return {
    ...row,
    is_hall_open: coerceBoolean(row.is_hall_open)
  };
};

export const normalizeReviewRow = (row) => {
  if (!row) {
    return null;
  }

  return {
    ...row,
    is_visible: coerceBoolean(row.is_visible)
  };
};

export const normalizeReviewRows = (rows) =>
  (Array.isArray(rows) ? rows : []).map((row) => normalizeReviewRow(row));

export const nowIso = () => new Date().toISOString();
