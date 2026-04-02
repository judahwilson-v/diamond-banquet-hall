const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_ADMIN_EMAIL = "judahvijai@gmail.com";
const DEFAULT_FROM_EMAIL = "Diamond Banquet Hall <onboarding@resend.dev>";

const normalizeText = (value) => String(value ?? "").trim();

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/gu, "&amp;")
    .replace(/</gu, "&lt;")
    .replace(/>/gu, "&gt;")
    .replace(/"/gu, "&quot;")
    .replace(/'/gu, "&#39;");

export const onRequestPost = async (context) => {
  const resendApiKey = normalizeText(context.env.RESEND_API_KEY);

  if (!resendApiKey) {
    return new Response(
      JSON.stringify({ success: false, error: "Email service is not configured" }),
      {
        status: 500,
        headers: {
          "content-type": "application/json; charset=UTF-8"
        }
      }
    );
  }

  let body = {};

  try {
    body = await context.request.json();
  } catch (_error) {
    body = {};
  }

  const name = normalizeText(body.name);
  const phone = normalizeText(body.phone);
  const email = normalizeText(body.email);
  const eventDate = normalizeText(body.eventDate);
  const eventType = normalizeText(body.eventType) || "Other";
  const attendees = normalizeText(body.attendees);
  const notes = normalizeText(body.notes);

  if (!name || !phone || !eventDate) {
    return new Response(
      JSON.stringify({ success: false, error: "Missing required booking details" }),
      {
        status: 400,
        headers: {
          "content-type": "application/json; charset=UTF-8"
        }
      }
    );
  }

  const to = normalizeText(context.env.BOOKING_ADMIN_EMAIL) || DEFAULT_ADMIN_EMAIL;
  const from = normalizeText(context.env.RESEND_FROM_EMAIL) || DEFAULT_FROM_EMAIL;
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
      <p><strong>Notes:</strong><br />${escapeHtml(notes || "Not provided").replace(/\n/gu, "<br />")}</p>
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
      return new Response(
        JSON.stringify({ success: false, error: errorText || "Email send failed" }),
        {
          status: 500,
          headers: {
            "content-type": "application/json; charset=UTF-8"
          }
        }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=UTF-8"
      }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error?.message || "Email send failed" }),
      {
        status: 500,
        headers: {
          "content-type": "application/json; charset=UTF-8"
        }
      }
    );
  }
};
