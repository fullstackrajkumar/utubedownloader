# Utube Downloader API

Express REST API that exposes **YouTube video metadata and progressive stream URLs** for a given watch URL, plus **keyword search** backed by the official YouTube Data API. Interactive documentation is served with **Swagger UI**.

---

## What this project does

| Capability | How it works |
|------------|----------------|
| **Fetch** | Given a YouTube video URL, resolves title, thumbnail, and available progressive formats (by itag) using [`@distube/ytdl-core`](https://www.npmjs.com/package/@distube/ytdl-core). |
| **Search** | Given a query string, returns up to 10 video results via [`youtube-search`](https://www.npmjs.com/package/youtube-search) and your **YouTube Data API v3** key. |
| **Docs** | OpenAPI 3 spec at `docs/swagger.json`, browsable UI at **`/docs`**. |

Unmatched routes redirect to `/docs` so the API surface is easy to discover locally.

---

## Repository structure

```text
utubedownloader/
├── src/
│   └── app.js              # Express app: CORS, routes, Swagger, server listen
├── docs/
│   └── swagger.json        # OpenAPI definition (used by swagger-ui-express)
├── frontend/               # Optional React client (separate package; own README)
├── package.json            # Root API dependencies and npm scripts
├── .env.sample             # Example environment variables (copy to `.env`)
├── index.html              # Minimal root asset (optional / legacy)
└── README.md               # This file
```

The **primary runnable service** for the API is **`src/app.js`** (`npm start`).

---

## Requirements

- **Node.js** (LTS recommended)
- **YouTube Data API key** — required only for the **`/search`** endpoint ([Google Cloud Console](https://console.cloud.google.com/))

---

## Quick start (API)

1. **Clone and enter the project**

   ```bash
   git clone https://github.com/fullstackrajkumar/utubedownloader.git
   cd utubedownloader
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**

   ```bash
   cp .env.sample .env
   ```

   Edit `.env` and set at least:

   - `YOUTUBE_API_KEY` — for `/search`
   - `PORT` — optional; defaults to `3000`

   Optional: `YTDL_DEBUG_PATH` — where `@distube/ytdl-core` may write debug player-script dumps (defaults to the OS temp directory when unset in code).

4. **Run the server**

   ```bash
   npm start
   ```

   For development with auto-restart:

   ```bash
   npm run dev
   ```

5. **Try it**

   - Swagger UI: [http://localhost:3000/docs](http://localhost:3000/docs)
   - Example fetch: `GET http://localhost:3000/fetch?url=<encoded-youtube-watch-url>`
   - Example search: `GET http://localhost:3000/search?search_query=...`

---

## API overview

Base URL: `http://localhost:3000` (or your deployed host). See `docs/swagger.json` for full schemas and examples.

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/fetch` | Query: `url` (required). Returns JSON with `title`, `thumbnail`, and `videos[]` (`itag`, `quality`, `url`). |
| `GET` | `/search` | Query: `search_query` (required). Returns JSON with `data` (search results). Requires `YOUTUBE_API_KEY`. |
| `GET` | `/docs` | Swagger UI for this API. |

Errors generally return JSON: `{ "status": false, "code": 400, "message": "..." }`.

---

## Optional React frontend

The **`frontend/`** directory is a separate React application (Create React App style). To work on it:

```bash
cd frontend
npm install
npm start
```

Configure the UI to call your API base URL (e.g. `http://localhost:3000`). See `frontend/README.md` if present for UI-specific notes.

---

## Production notes

- Set secrets (`YOUTUBE_API_KEY`, etc.) in your host’s environment or secret manager — **do not commit `.env`**.
- Run behind a process manager (e.g. **PM2**, **systemd**) and terminate TLS at a reverse proxy (nginx, Caddy, or your PaaS).
- YouTube changes break pure-JS extractors periodically; keep **`@distube/ytdl-core`** updated and monitor failures.
- Consider **rate limiting** if the API is public to reduce abuse and `429` responses from Google/YouTube.

---

## Disclaimer

Downloading or redistributing content may be restricted by **YouTube’s Terms of Service** and copyright law. This software is provided as-is; you are responsible for compliant use.

---

## Author

**Rajkumar Yadav** — see `package.json` / Swagger `contact` for support email.
