import crypto from "node:crypto";

export default function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).json({ error: "Method not allowed" });
    }

    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

    if (!privateKey) {
      return res.status(500).json({ error: "Missing private key" });
    }

    const timestamp = Math.floor(Date.now() / 1000);

    const signature = crypto
      .createHmac("sha1", privateKey)
      .update(timestamp.toString())
      .digest("hex");

    return res.status(200).json({
      signature,
      timestamp,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
