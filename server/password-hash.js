const encoder = new TextEncoder();

export const PASSWORD_HASH_ITERATIONS = 310000;
export const PASSWORD_HASH_BYTES = 32;

const bytesToHex = (value) =>
  Array.from(value, (byte) => byte.toString(16).padStart(2, "0")).join("");

const hexToBytes = (value) => {
  const normalized = String(value ?? "").trim().toLowerCase();

  if (!normalized || normalized.length % 2 !== 0 || /[^0-9a-f]/u.test(normalized)) {
    throw new Error("Password salt/hash must be a valid hex string.");
  }

  const bytes = new Uint8Array(normalized.length / 2);

  for (let index = 0; index < normalized.length; index += 2) {
    bytes[index / 2] = Number.parseInt(normalized.slice(index, index + 2), 16);
  }

  return bytes;
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

export const generateSaltHex = (size = 16) => {
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  return bytesToHex(bytes);
};

export const hashPassword = async (
  password,
  saltHex,
  {
    iterations = PASSWORD_HASH_ITERATIONS,
    bytes = PASSWORD_HASH_BYTES
  } = {}
) => {
  const importedKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(String(password ?? "")),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: hexToBytes(saltHex),
      iterations
    },
    importedKey,
    bytes * 8
  );

  return bytesToHex(new Uint8Array(derivedBits));
};

export const verifyPassword = async (password, saltHex, expectedHashHex) => {
  const derivedHashHex = await hashPassword(password, saltHex);
  return timingSafeEqual(derivedHashHex, expectedHashHex);
};
