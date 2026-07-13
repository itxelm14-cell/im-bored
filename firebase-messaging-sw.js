/* pause · self-contained push service worker.
   No importScripts / no external Firebase fetch — so corporate security agents,
   ad blockers, or flaky networks can't stop it from registering. Token
   registration (getToken) happens in the page, which loads Firebase normally.
   This worker's only job is to display an incoming push and handle taps. */

self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (event) { event.waitUntil(self.clients.claim()); });

self.addEventListener("push", function (event) {
  let payload = {};
  try { payload = event.data ? event.data.json() : {}; } catch (e) { payload = {}; }
  const n = payload.notification || payload.data || payload || {};
  const title = n.title || "pause";
  const body = n.body || "";
  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: "icon-192.png",
      badge: "icon-192.png"
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (list) {
      for (const c of list) {
        if (c.url.indexOf("/im-bored/") !== -1 && "focus" in c) return c.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow("/im-bored/");
    })
  );
});
