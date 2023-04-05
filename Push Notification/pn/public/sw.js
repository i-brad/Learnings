self.addEventListener("install", (event) => {});

self.addEventListener("push", (event) => {
  const text = event.data.text() || "Hello";

  event.waitUntil(
    self.registration.showNotification(text, {
      icon: "https://abinci.ng/assets/logo-1.svg",
      badge: "https://abinci.ng/assets/logo-1.svg",
      image: "https://abinci.ng/assets/photo1672246110.jpeg",
      body: "Welcome to Abinci",
      tag: "abinci-notification",
      renotify: true,
      data: {
        orderId: 1,
      },
      vibrate: [100, 50, 100],
      actions: [
        {
          action: "process",
          title: "Process",
        },
        {
          action: "ignore",
          title: "Ignore",
        },
      ],
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  //   console.log(event);
  const { action, notification } = event;

  switch (action) {
    case "process":
      event.waitUntil(clients.openWindow("/"));
      break;
    case "ignore":
      notification.close();
      break;
    default:
      break;
  }
});
