import { pbkdf2Sync, randomBytes } from "node:crypto";

const password = String(process.argv[2] ?? "");

if (!password) {
  console.error("Usage: node ./scripts/hash-admin-password.mjs <password> [email] [role]");
  process.exit(1);
}

const email = String(process.argv[3] ?? "admin@example.com")
  .trim()
  .toLowerCase();
const role =
  String(process.argv[4] ?? "super_admin").trim().toLowerCase() === "staff_admin"
    ? "staff_admin"
    : "super_admin";
const salt = randomBytes(16).toString("hex");
const hash = pbkdf2Sync(password, Buffer.from(salt, "hex"), 310000, 32, "sha256").toString("hex");

console.log(
  JSON.stringify(
    {
      email,
      role,
      salt,
      hash,
      env: {
        DIAMOND_ADMIN_EMAIL: email,
        DIAMOND_ADMIN_PASSWORD_SALT: salt,
        DIAMOND_ADMIN_PASSWORD_HASH: hash,
        DIAMOND_ADMIN_ROLE: role
      }
    },
    null,
    2
  )
);
