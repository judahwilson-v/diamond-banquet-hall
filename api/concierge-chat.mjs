const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const DEFAULT_MODEL = "gemini-2.5-flash";
const MAX_HISTORY_ITEMS = 12;
const MAX_MESSAGE_LENGTH = 2000;

const SYSTEM_INSTRUCTION = `You are the virtual manager and concierge of Diamond Banquet Hall in Allapra, Perumbavoor, Kerala.

Rules:
- Respond only in English.
- Keep replies concise, helpful, and easy to scan.
- Use markdown lists or bold text only when it improves clarity.
- If the user asks for booking help, guide them toward the booking form, phone call, or WhatsApp.
- If you are unsure about something not listed below, say so plainly and suggest contacting the venue directly.

Business details:
- Hall capacity: Up to 250 guests.
- Hall pricing: ₹30,000 for a 4-hour slot.
- Office Room: ₹1,500 per hour for up to 15 people.
- Parking: Ample valet parking is available on the premises at no extra charge.
- Catering: Outside catering is allowed, and the venue can recommend trusted local caterers.
- Event types: Weddings, engagements, receptions, birthday parties, anniversary celebrations, baby showers, and corporate events.
- Contact phone: +91 99476 81202.
- WhatsApp: https://wa.me/919947681202.`;

const normalizeText = (value) => String(value ?? "").trim();

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

const sanitizeMessages = (messages) => {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .flatMap((message) => {
      const role = message?.role === "model" ? "model" : message?.role === "user" ? "user" : "";
      const text = normalizeText(message?.text).slice(0, MAX_MESSAGE_LENGTH);

      if (!role || !text) {
        return [];
      }

      return [
        {
          role,
          parts: [{ text }]
        }
      ];
    })
    .slice(-MAX_HISTORY_ITEMS);
};

const extractReplyText = (payload) =>
  normalizeText(
    payload?.candidates?.[0]?.content?.parts
      ?.map((part) => normalizeText(part?.text))
      .filter(Boolean)
      .join("\n")
  );

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const apiKey = normalizeText(process.env.GEMINI_API_KEY);
  const model = normalizeText(process.env.GEMINI_MODEL) || DEFAULT_MODEL;

  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing");
    return res.status(500).json({ success: false, error: "Chat service is not configured" });
  }

  const body = readBody(req.body);
  const messages = sanitizeMessages(body.messages);

  if (!messages.length || messages.at(-1)?.role !== "user") {
    return res.status(400).json({ success: false, error: "A user message is required" });
  }

  try {
    const response = await fetch(`${GEMINI_API_BASE}/${model}:generateContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }]
        },
        contents: messages,
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.5,
          topP: 0.9
        }
      })
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("Gemini request failed", response.status, payload);
      return res.status(502).json({
        success: false,
        error: payload?.error?.message || payload?.error || "Chat service request failed",
        details: payload
      });
    }

    const reply = extractReplyText(payload);

    if (!reply) {
      console.error("Gemini response missing text", payload);
      return res.status(502).json({
        success: false,
        error: "Chat service returned no reply",
        details: payload
      });
    }

    return res.status(200).json({ success: true, reply });
  } catch (error) {
    console.error("Gemini request error", error);
    return res.status(500).json({ success: false, error: "Chat service request failed" });
  }
}
