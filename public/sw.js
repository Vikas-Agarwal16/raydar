// This runs in the browser's background thread, NOT on your Next.js server.
// It activates once registered (Step 5) and stays alive listening for push
// events even when the Raydar tab is closed — that's the whole point of
// "push" notifications vs. relying on the tab being open.

self.addEventListener("push", (event) => {
  // event.data is the payload sent from your server via web-push's
  // sendNotification() call — we control its shape in Step 7.
  const data = event.data ? event.data.json() : {};

  const title = data.title || "Raydar Alert";
  const options = {
    body: data.body || "Something changed on one of your watched sites.",
    icon: "/favicon.ico", // shown next to the notification
    badge: "/favicon.ico", // small icon, mainly used on Android
    data: {
      url: data.url || "/dashboard", // where to send the user on click
    },
  };

  // waitUntil keeps the service worker alive until showNotification
  // resolves — without this, the browser might kill the worker before
  // the notification actually renders.
  event.waitUntil(self.registration.showNotification(title, options));
});

// Handles the user clicking the notification itself
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((windowClients) => {
      const url = event.notification.data.url;

      // If a Raydar tab is already open, focus it instead of opening a duplicate
      for (const client of windowClients) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          return client.focus();
        }
      }

      // Otherwise open a new tab
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});