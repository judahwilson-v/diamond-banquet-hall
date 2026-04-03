import crypto from "node:crypto";

export default function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).json({ error: "Method not allowed" });
    }

    const privateKey = String(process.env.IMAGEKIT_PRIVATE_KEY ?? "").trim();
    const publicKey = String(process.env.IMAGEKIT_PUBLIC_KEY ?? "").trim();
    const missingEnvVars = ["IMAGEKIT_PRIVATE_KEY", "IMAGEKIT_PUBLIC_KEY"].filter((envVarName) => {
      if (envVarName === "IMAGEKIT_PRIVATE_KEY") {
        return !privateKey;
      }

      return !publicKey;
    });

    if (missingEnvVars.length) {
      console.error("[upload-auth] Missing required environment variables:", missingEnvVars.join(", "));
      return res.status(500).json({
        error: `Missing required environment variables: ${missingEnvVars.join(", ")}`
      });
    }

    const timestamp = Math.floor(Date.now() / 1000);

    const signature = crypto
      .createHmac("sha1", privateKey)
      .update(timestamp.toString())
      .digest("hex");

    return res.status(200).json({
      signature,
      timestamp,
      publicKey,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
