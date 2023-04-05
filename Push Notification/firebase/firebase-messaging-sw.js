// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyA1x3UM_PJbEnnl6QEEaxc6zXTw1lVVZB0",
  authDomain: "proclassics-store.firebaseapp.com",
  projectId: "proclassics-store",
  storageBucket: "proclassics-store.appspot.com",
  messagingSenderId: "944962008938",
  appId: "1:944962008938:web:ba34a2242f7f040b809713",
  measurementId: "G-VVP9YT9JDG",
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    data: payload.data,
  };

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener("notificationclick", async (event) => {
  if (event.action) return;

  const clickedNotification = event.notification;
  clickedNotification.close();

  const payload = event.notification.data;
  const baseUrl = self.location.origin;
  const orderId = payload.url;

  console.log(baseUrl);

  return event.waitUntil(clients.openWindow("/"));
});
