# Diamond Banquet Hall

A static marketing site and full-featured admin portal designed exclusively for the Diamond Banquet Hall venue. Built to serve as a contact-first digital front door with seamless booking and gallery management.

## 🛠 Tech Stack & Services
- Static UI delivery via HTML/CSS/JS
- React/Vite AI concierge widget embedded into `booking.html`
- Hosted on **Vercel** with Serverless API Routes (`/api`)
- **Supabase** for database and storage
- **ImageKit** for optimized image handling
- **Resend** for transactional email handling
- **Gemini API** for concierge chat responses

## 🚀 Environment Variables setup

The project requires several environment variables for production functionality. See `.env.example` to get started locally.

> **Crucial Keys:**
> - `DIAMOND_SUPABASE_URL` / `DIAMOND_SUPABASE_ANON_KEY`
> - `IMAGEKIT_PUBLIC_KEY` / `IMAGEKIT_PRIVATE_KEY` 
> - `RESEND_API_KEY`
> - `GEMINI_API_KEY`
> - `DIAMOND_SITE_URL` (Defaults to `https://diamond-banquet-hall.vercel.app`)

Do not commit `.env` files. Keep secrets only in local `.env.local` and in Vercel project environment variables.

### Vercel Deployment Note
If encountering issues with the image upload authentication route (`GET /api/upload-auth`), ensure that **both** `IMAGEKIT_PUBLIC_KEY` and `IMAGEKIT_PRIVATE_KEY` are properly set in the Vercel Production/Preview environments and a redeployment has been triggered.

The booking page chatbot is bundled from `ai/diamond-banquet-hall-enhanced-booking` during `npm run build`, then mounted as a floating overlay on `booking.html`. Its Gemini requests are routed through `/api/concierge-chat`, so `GEMINI_API_KEY` (or `GOOGLE_API_KEY`) must be set on the Vercel project for live responses.

## 🗄 Supabase Setup (Gallery & Bookings)

The admin portal uses the Supabase Storage bucket `venue-images` to handle uploads, which the public homepage then reads from.

To establish the required permissions, run the provided SQL scripts located in `/supabase`:
- **`supabase/setup.sql`** (Full table schemas and RLS)
- **`supabase/gallery-storage-setup.sql`** (Storage buckets and RLS policies)

*Storage architecture ensures public reads for the site while restricting upload/delete permissions strictly to `super_admin` roles.*
