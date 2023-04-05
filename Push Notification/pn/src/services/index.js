export function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    console.log("ServiceWorker is not available");
    return;
  }

  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => {
      // console.log("SW registered", reg);

      if (!("PushManager" in window)) {
        // Push isn't supported on this browser, disable or hide UI.
        return;
      }

      reg.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            "BJXItXPHrAOEnsDsA_zBIpvcAkGSeRVEEMss_j4lv3ZhRbbbULai-e9IbWmvNO0ommkdnrbnZhaOzqDAa5NWkcQ"
          ),
        })
        .then((sub) => {
          console.log("Subscription object", JSON.stringify(sub));
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
}

function urlBase64ToUint8Array(base64String) {
  var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  var base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
