# Deploying to Render

This project is a full-stack Node.js app with PostgreSQL, sessions, and file uploads.

## 1. Prepare the repo

- Commit your project to GitHub.
- Make sure `.env` is not pushed.
- Use `.env.example` as your reference for required variables.

If `.env` was already staged before `.gitignore` was updated, untrack it with:

```powershell
git rm --cached .env
```

## 2. Create the Render services

You can deploy in either of these ways:

- Easiest: push this repo and create a Blueprint in Render from `render.yaml`
- Manual: create one PostgreSQL database and one Node Web Service in the dashboard

### Manual service settings

- Runtime: `Node`
- Build Command: `npm install && npm run build`
- Start Command: `npm start`

## 3. Set environment variables

Set these on the web service:

- `DATABASE_URL`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `SESSION_SECRET`

Use strong production values. Do not reuse local development credentials.

## 4. Apply the database schema

After the database is created and `DATABASE_URL` is set, run:

```powershell
npm run db:push
```

You can run this from Render Shell or as a one-time local command against the Render database URL.

## 5. Verify the app

After deploy:

- open the Render URL
- confirm the home page loads
- confirm `/admin/login` works
- confirm contact form submission works
- confirm content reads from the database

## 6. Connect your GoDaddy domain

In Render:

- open your web service
- go to `Settings` -> `Custom Domains`
- add `yourdomain.com`
- add `www.yourdomain.com`

In GoDaddy DNS:

- create the records Render tells you to create
- usually `www` is a `CNAME`
- the root domain may use `A` records or forwarding depending on Render's instructions shown for your service

Wait for DNS propagation, then test both:

- `https://yourdomain.com`
- `https://www.yourdomain.com`

## Important limitation: uploads

This app currently stores uploaded files in the local `uploads/` folder. On Render, local disk is not durable across deploys/restarts unless you add persistent storage, and even then it needs extra setup.

That means admin-uploaded images may disappear later.

For a proper production setup, move uploads to cloud storage such as:

- Cloudinary
- Amazon S3
- Supabase Storage

## Useful sources

- Render deploy commands: https://render.com/docs/deploys
- Render Node/Express quickstart: https://render.com/docs/deploy-node-express-app
- Render Blueprint reference: https://render.com/docs/blueprint-spec
