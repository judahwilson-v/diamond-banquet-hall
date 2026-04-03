# diamond-banquet-hall

Static marketing site and admin portal for Diamond Banquet Hall.

## Required environment variables

The project uses a mix of build-time and runtime variables:

- `DIAMOND_SUPABASE_URL`
- `DIAMOND_SUPABASE_ANON_KEY`
- `IMAGEKIT_PUBLIC_KEY`
- `IMAGEKIT_PRIVATE_KEY`
- `RESEND_API_KEY`
- `BOOKING_ADMIN_EMAIL` (optional override)
- `RESEND_FROM_EMAIL` (optional override)

See [.env.example](/Users/judahvijaiwilson/Website/github /project ig/diamond-banquet-hall/.env.example) for the full list.

## Vercel status

As verified on 3 April 2026, the production Vercel deployment exposes the API routes:

- `GET /api/upload-auth`
- `POST /api/send-email`

That means the earlier `404` issue is no longer the active production problem. After the ImageKit environment variables were added and redeployed, `GET /api/upload-auth` returned `200` successfully.

## Fixing the current Vercel error

1. Open the Vercel project `diamond-banquet-hall`.
2. Go to `Settings` -> `Environment Variables`.
3. Add `IMAGEKIT_PRIVATE_KEY` for `Production`.
4. Verify `IMAGEKIT_PUBLIC_KEY` is also present for `Production`.
5. Redeploy the latest production build after saving the variables.

If the same features should work on preview deployments, add the same keys to `Preview` as well.

## Supabase gallery setup

The admin gallery manager uses the Supabase Storage bucket `venue-images`. The public homepage gallery also reads from that same bucket.

To enable uploads and deletes from the admin portal, either run the latest SQL in [supabase/setup.sql](/Users/judahvijaiwilson/Website/github /project ig/diamond-banquet-hall/supabase/setup.sql) or use the smaller [supabase/gallery-storage-setup.sql](/Users/judahvijaiwilson/Website/github /project ig/diamond-banquet-hall/supabase/gallery-storage-setup.sql) bootstrap inside the Supabase SQL Editor. The storage setup creates:

- creates the `venue-images` bucket if it does not exist
- allows public read access for homepage gallery rendering
- allows only `super_admin` users to upload, replace, or delete gallery images
