# Cloud Deployment Guide

This project runs as three cloud-connected pieces:

- Vercel serves the React/Vite frontend.
- Render runs the Express API from `server/`.
- MongoDB Atlas hosts the database. MongoDB Compass is the desktop client used to inspect that Atlas database; it is not the database server.

## 1. Configure MongoDB Atlas

1. Create an Atlas project and cluster.
2. Create a database user with read/write access to `validation_engine`.
3. In **Network Access**, allow your computer's public IP for Compass and the Render service's outbound IP ranges for the API. Find those ranges in Render under the service's **Connect → Outbound** panel.
4. In Atlas **Connect → Drivers**, copy the application URI. It should start with `mongodb+srv://` and point to your actual cluster host. Include `/validation_engine` before the query options.

Keep the URI out of source code, GitHub, and Vercel. Store it only in Render's environment settings. Use the same Atlas cluster's Compass connection option to inspect cloud data.

## 2. Deploy the API to Render

Push this repository to GitHub. Then create a Render Blueprint from the repository root using `render.yaml`, or create a Web Service manually with:

- **Root Directory:** `server`
- **Build Command:** `npm ci`
- **Start Command:** `npm start`
- **Health Check Path:** `/api/health`

Set these environment variables in Render:

| Variable | Value |
| :--- | :--- |
| `NODE_ENV` | `production` |
| `MONGODB_URI` | The Atlas URI for `validation_engine` |
| `CLIENT_URL` | The exact Vercel origin, such as `https://your-app.vercel.app` |
| `CLIENT_URLS` | Optional comma-separated extra origins, such as a custom domain |

Render supplies `PORT`. The API binds to that port on `0.0.0.0`. Copy the deployed API URL, such as `https://your-api.onrender.com`.

## 3. Deploy the frontend to Vercel

Create a Vercel project from this repository and keep **Root Directory** at the repository root. The checked-in root `vercel.json` builds `client/` and publishes `client/dist/`.

In Vercel **Settings → Environment Variables**, set:

```text
VITE_API_URL=https://validation-engine1-11.onrender.com/api
```

Replace the example with your Render service URL, enable the variable for Production, and redeploy. Vercel environment changes apply to new deployments, and Vite includes this API URL in the frontend build.

## 4. Verify the cloud connection

1. Open `https://your-api.onrender.com/api/health`. It should report `healthy` and `database.state` as `connected`.
2. Open the Vercel site and submit a validation.
3. Connect Compass to the Atlas cluster and refresh the `validation_engine` database.

In production, the API requires a working `MONGODB_URI`; it will not fall back to a database on the developer's computer.
