# diamond-banquet-hall

Diamond Banquet Hall is a static marketing site plus an admin portal deployed on Cloudflare Pages. The project originally used Supabase, but the live data layer now runs on Cloudflare Pages Functions + Cloudflare D1, with a frontend compatibility shim so the existing UI code keeps working.

## Current architecture

- Public site pages: `index.html` and `booking.html`
- Admin pages: `login.html` and `admin.html`
- Static assets: `css/`, `js/`, `images/`
- Server code for Cloudflare Pages Functions: `functions/`
- Shared server helpers: `server/`
- Build output: `dist/`

## Important files

- `index.html`: public marketing homepage
- `booking.html`: booking request page
- `login.html`: admin sign-in page
- `admin.html`: admin dashboard shell
- `css/style.css`: public-site styles
- `css/admin.css`: admin styles
- `js/main.js`: homepage UI behavior and rendering
- `js/booking.js`: booking page UI and submission flow
- `js/login.js`: admin login flow
- `js/admin.js`: admin dashboard behavior
- `js/site-data.js`: shared frontend data layer
- `js/supabase-config.js`: browser compatibility shim that mimics Supabase-style calls but actually talks to Cloudflare API routes
- `js/supabase-client.js`: re-export wrapper for the compatibility shim
- `functions/api/site-settings.js`: public site settings API
- `functions/api/booked-dates.js`: confirmed booking dates API
- `functions/api/bookings.js`: public booking request API
- `functions/api/reviews.js`: public reviews API
- `functions/api/send-email.js`: Cloudflare email notification endpoint
- `functions/api/admin/`: admin-only CRUD endpoints
- `functions/api/whatsapp/webhook.js`: WhatsApp Cloud API webhook
- `functions/api/admin/whatsapp/messages.js`: authenticated WhatsApp message log API
- `server/database.js`: D1 schema creation and bootstrap seeding
- `server/auth.js`: signed admin session cookies
- `server/whatsapp.js`: WhatsApp reply logic, signature checks, and Cloud API send helper
- `scripts/build.mjs`: copies deployable static files into `dist/`
- `scripts/hash-admin-password.mjs`: creates the admin password hash and salt for Cloudflare env vars
- `wrangler.jsonc`: Cloudflare Pages + D1 config
- `README.md`: project setup and architecture notes

## Frontend data flow

1. The browser opens the public site, booking page, login page, or admin page.
2. Page scripts import helpers from `js/site-data.js`.
3. `js/site-data.js` talks to `js/supabase-config.js`.
4. The compatibility shim translates those browser calls into fetches against Cloudflare endpoints under `/api/...`.
5. Pages Functions in `functions/api/` read and write data in Cloudflare D1.
6. Results are normalized back into frontend-friendly shapes and rendered by `main.js`, `booking.js`, `login.js`, or `admin.js`.
7. The admin UI uses session cookies from `functions/api/admin/session.js` instead of Supabase auth.
8. The admin dashboard refreshes with polling rather than Supabase realtime subscriptions.

## Database tables

These tables are created automatically by `server/database.js` when the first Function runs:

- `site_settings`: editable business profile, pricing, contact details, address, and venue status
- `bookings`: booking requests and confirmed/cancelled dates
- `enquiries`: enquiry records connected to bookings
- `reviews`: customer reviews shown on the site
- `admin_users`: admin accounts for the portal
- `whatsapp_contacts`: known WhatsApp senders
- `whatsapp_messages`: inbound, outbound, and delivery/status log entries

## Admin authentication flow

1. Admin visits `login.html`.
2. `js/login.js` submits credentials through the compatibility client.
3. `functions/api/admin/session.js` verifies the password against `admin_users`.
4. A signed `diamond_admin_session` cookie is issued by `server/auth.js`.
5. The browser sends that cookie on later admin requests.
6. Protected admin endpoints validate the session before reading or changing data.

## WhatsApp bot flow

1. Meta sends webhook events to `/api/whatsapp/webhook`.
2. `functions/api/whatsapp/webhook.js` optionally verifies the `x-hub-signature-256` header if `WHATSAPP_APP_SECRET` is configured.
3. Incoming messages are stored in D1.
4. `server/whatsapp.js` builds a rules-based reply using live venue settings and booking availability.
5. The bot sends the reply through the WhatsApp Cloud API.
6. Outbound replies and delivery statuses are also stored in D1.
7. Signed-in admins can read recent messages from `/api/admin/whatsapp/messages`.

The bot currently handles:

- greetings like `hi`, `hello`, `menu`
- `price` or `pricing`
- `location`, `address`, or `map`
- `contact`, `call`, or `hours`
- `booking` or `book`
- `availability YYYY-MM-DD`

## Setup

1. Create a Cloudflare D1 database.
2. Open `wrangler.jsonc` and replace:
   - `REPLACE_WITH_YOUR_D1_DATABASE_ID`
   - `REPLACE_WITH_YOUR_D1_PREVIEW_DATABASE_ID`
3. Create an admin password hash:

```bash
npm run hash:admin -- "your-password" admin@example.com super_admin
```

4. Add these required Cloudflare Pages environment variables:
   - `DIAMOND_SESSION_SECRET`
   - `DIAMOND_ADMIN_EMAIL`
   - `DIAMOND_ADMIN_PASSWORD_SALT`
   - `DIAMOND_ADMIN_PASSWORD_HASH`
   - `DIAMOND_ADMIN_ROLE`
5. Optional email vars for booking notifications:
   - `RESEND_API_KEY`
   - `BOOKING_ADMIN_EMAIL`
   - `RESEND_FROM_EMAIL`
6. Optional WhatsApp Cloud API vars:
   - `WHATSAPP_VERIFY_TOKEN`
   - `WHATSAPP_ACCESS_TOKEN`
   - `WHATSAPP_PHONE_NUMBER_ID`
   - `WHATSAPP_APP_SECRET`
   - `WHATSAPP_API_VERSION`

## Local development

```bash
npm install
npm run build
npm run dev
```

## Legacy files and notes

- `supabase/setup.sql` is now legacy reference material from the old Supabase version.
- `api/send-email.js` is an older endpoint path from the pre-Cloudflare setup and is not the main deployed email route anymore.
- `dist/` is generated output and should be treated as build artifacts.
- Static gallery images still come from `/images`.
- If D1 is missing, the public site falls back to bundled content where possible.
- The admin user can also be managed directly in the `admin_users` table if you do not want to bootstrap it from env vars.
- WhatsApp webhook URL: `/api/whatsapp/webhook`
- In Meta, set the callback URL to `https://your-domain.com/api/whatsapp/webhook` and use the same `WHATSAPP_VERIFY_TOKEN`.
- The repo still contains an `image ` folder name with a trailing space in git history, which causes checkout problems on Windows.
