self.addEventListener("push", (event) => {
    const data = event.data ? event.data.json() : {};
  
    // Default values in case the push data doesn't contain them
    const title = data.title || "New Notification";
    const body = data.body || "You have a new message!";
    const icon = data.icon || "/icons/notification-icon.png";
    const badge = data.badge || "/icons/notification-badge.png";
    const image = data.image || null; // Optional image in the notification
    const url = data.url || "/"; // URL to navigate to when clicked
    const timestamp = data.timestamp || Date.now(); // Timestamp for the notification
    const customData = data.data || {}; // Custom data passed with the notification
    const tag = data.tag || "default"; // Tag to group notifications
  
    // Notification options
    const options = {
      body: body,
      icon: icon,
      badge: badge,
      image: image,
      data: customData,
      tag: tag,
      timestamp: timestamp,
    };
  
    // Show the notification
    event.waitUntil(self.registration.showNotification(title, options));
  });
  
  // Handle notification click event
  self.addEventListener('notificationclick', (event) => {
    const notification = event.notification;
    const url = notification.data.url || '/';
  
    event.notification.close(); // Close the notification after click
  
    event.waitUntil(
      clients.openWindow(url) // Open the URL or take other actions
    );
  });
  