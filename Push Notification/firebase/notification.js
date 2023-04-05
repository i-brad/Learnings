import { getMessaging, onMessage } from "firebase/messaging";
import { toast } from "react-toastify";
import app, { firebaseCloudMessaging } from "../firebase";

export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    throw new Error("Notification not supported by browser");
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      registerServiceWorker();
      return permission;
    }
  } catch (err) {
    if (err) throw err;
  }
}

export function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    throw new Error("ServiceWorker is not available");
  }

  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((reg) => {
      //   console.log("SW registered", reg);
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.addEventListener("message", (event) => {
          console.log("event for the service worker", event);

          const notificationTitle = event.data.notification.title;
          const notificationOptions = {
            body: event.data.notification.body,
            data: event.data.data,
          };

          const notification = new Notification(
            notificationTitle,
            notificationOptions
          );

          notification.addEventListener("click", (event) => {
            console.log("event", event);
            event.preventDefault(); // prevent the browser from focusing the Notification's tab
            let url = event.currentTarget.data.url;
            window.open(url, "_blank");
          });
          return notification;
        });
      }
      setToken();
    })
    .catch((err) => console.error(err));
}

// Calls the getMessage() function if the token is there
async function setToken() {
  try {
    const token = await firebaseCloudMessaging.init();
    if (token) {
      console.log("token", token);
    }
  } catch (error) {
    console.log(error);
  }
}

async function unregisterServiceWorker() {
  if ("serviceWorker" in navigator) {
    const serviceWorker =
      await window.navigator.serviceWorker.getRegistration();
    if (serviceWorker) {
      return serviceWorker.unregister();
    }
  }
  throw new Error("The browser doesn`t support service worker.");
}
