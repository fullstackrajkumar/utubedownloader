/**
 * Only register in production. In dev, `/sw.js` is often missing; if something else
 * runs on port 3000 (e.g. the Express API), `/sw.js` returns HTML → wrong MIME type.
 */
export default function swDev() {
    if (process.env.NODE_ENV !== "production") {
        return;
    }
    if (!("serviceWorker" in navigator)) {
        return;
    }
    navigator.serviceWorker.register("/sw.js").catch(() => {
        /* optional: log registration failure */
    });
}