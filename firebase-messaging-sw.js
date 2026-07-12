importScripts("https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBwADa3_5tT-cUTDHEsWZnHsy3ZIjgZHmI",
  authDomain: "izzies-apps.firebaseapp.com",
  projectId: "izzies-apps",
  storageBucket: "izzies-apps.firebasestorage.app",
  messagingSenderId: "260909314881",
  appId: "1:260909314881:web:2080f2d3ea32537a6c27c0"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const n = payload.notification || {};
  self.registration.showNotification(n.title || "pause", {
    body: n.body || "",
    icon: "icon-192.png",
    badge: "icon-192.png"
  });
});
