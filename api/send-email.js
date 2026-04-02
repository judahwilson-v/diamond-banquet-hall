const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_ADMIN_EMAIL = "judahvijai@gmail.com";
const DEFAULT_FROM_EMAIL = "Diamond Banquet Hall <onboarding@resend.dev>";

const normalizeText = (value) => String(value ?? "").trim();

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const readBody = (body) => {
  if (!body) {
    return {};
  }

  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch (_error) {
      return {};
    }
  }

  return typeof body === "object" ? body : {};
};

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const resendApiKey = normalizeText(process.env.RESEND_API_KEY);

  if (!resendApiKey) {
    console.error("RESEND_API_KEY is missing");
    return res.status(500).json({ success: false, error: "Email service is not configured" });
  }

  const body = readBody(req.body);
  const name = normalizeText(body.name);
  const phone = normalizeText(body.phone);
  const email = normalizeText(body.email);
  const eventDate = normalizeText(body.eventDate);
  const eventType = normalizeText(body.eventType) || "Other";
  const attendees = normalizeText(body.attendees);
  const notes = normalizeText(body.notes);

  if (!name || !phone || !eventDate) {
    return res.status(400).json({ success: false, error: "Missing required booking details" });
  }

  const to = normalizeText(process.env.BOOKING_ADMIN_EMAIL) || DEFAULT_ADMIN_EMAIL;
  const from = normalizeText(process.env.RESEND_FROM_EMAIL) || DEFAULT_FROM_EMAIL;
  const subject = `New booking request: ${name} - ${eventDate}`;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
      <h2 style="margin-bottom: 16px;">New Booking Request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email || "Not provided")}</p>
      <p><strong>Event Date:</strong> ${escapeHtml(eventDate)}</p>
      <p><strong>Event Type:</strong> ${escapeHtml(eventType)}</p>
      <p><strong>Attendees:</strong> ${escapeHtml(attendees || "Not provided")}</p>
      <p><strong>Notes:</strong><br />${escapeHtml(notes || "Not provided").replace(/\n/g, "<br />")}</p>
    </div>
  `;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
        reply_to: email || undefined
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resend email failed", errorText);
      return res.status(500).json({ success: false, error: "Email send failed" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Resend request failed", error);
    return res.status(500).json({ success: false, error: "Email send failed" });
  }
};
