<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/72968c00-d2d6-4b14-b7b4-445988038ee2

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Optionally set `VITE_CONCIERGE_API_ENDPOINT` in `.env.local` if you want the standalone widget to call a non-default backend during local development.
3. Run the app:
   `npm run dev`

For the production site, the widget is bundled with `npm run build:widget` and mounted from the main booking page. Gemini requests are handled server-side by `/api/concierge-chat`, so the API key stays out of the browser bundle.
