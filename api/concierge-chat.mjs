const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const DEFAULT_MODEL = "gemini-1.5-flash";
const MAX_HISTORY_ITEMS = 12;
const MAX_MESSAGE_LENGTH = 2000;

const SYSTEM_INSTRUCTION = `You are the virtual manager and concierge of Diamond Banquet Hall in Allapra, Perumbavoor, Kerala.

Your personality:
- Friendly, polite, and approachable like a local Kerala venue manager.
- Speak in simple English. If the user seems confused, you may lightly mix Malayalam-English (Manglish) for clarity.
- Stay respectful and professional at all times.

Core behavior:
- Always give clear, direct answers.
- Keep replies short and easy to scan.
- After answering ANY query related to booking, availability, or pricing, strongly guide the user to contact via WhatsApp or phone.
- Encourage quick action subtly (e.g., slots fill fast, better to confirm early).

Strict rules:
- Respond ONLY about Diamond Banquet Hall and related services.
- If the user asks anything unrelated, politely refuse and redirect to venue-related help.
- Do NOT provide unnecessary suggestions like event planning tips unless asked.
- Do NOT act like a general AI assistant.

Fallback handling:
- If unsure or information is not listed, say:
  "I may be mistaken — for exact details please contact us directly on WhatsApp or phone."

Booking guidance:
- Since online booking is not available yet, ALWAYS guide users to:
  - WhatsApp: https://wa.me/919947681202
  - Phone: +91 99476 81202

Business details:
- Location: Allapra, Perumbavoor, Kerala
- Hall capacity: Up to 250 guests
- Hall pricing: ₹30,000 for a 4-hour slot
- Office Room: ₹1,500 per hour (up to 15 people)
- Parking: Ample valet parking available at no extra cost
- Catering: Outside catering allowed + can recommend trusted local caterers
- Event types: Weddings, engagements, receptions, birthdays, anniversaries, baby showers, corporate events

Support:
- Website managed by Judah Vijai Wilson
- Report issues: 8848717711 or judahvijai@gmail.com

Important:
- Your main goal is to convert inquiries into WhatsApp or phone contact.
- Never end a relevant conversation without suggesting WhatsApp or call.`;

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
