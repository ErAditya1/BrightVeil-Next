import { initializeApp, getApp, getApps } from "firebase/app";
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";

// Firebase configuration (Replace with your actual Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyDI-jJJDJlqRcEW5w7h-zKhDZLA9Y9iR2k",
  authDomain: "bright-veil-1366b.firebaseapp.com",
  projectId: "bright-veil-1366b",
  storageBucket: "bright-veil-1366b.firebasestorage.app",
  messagingSenderId: "1055157103882",
  appId: "1:1055157103882:web:c46a6ce3173a5301401ef3",
  measurementId: "G-MHH7K53ZSP",
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const messagingInstance = getMessaging(app);

// Register the service worker for Firebase Messaging
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      // Register the service worker
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      console.log('Service Worker registered successfully:', registration);
      // Messaging automatically uses the service worker registered above.
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

// Check if messaging is supported in the browser
const initializeMessaging = async () => {
  const supported = await isSupported();
  console.log(supported)
  if (!supported) {
    console.log("Firebase Messaging is not supported in this browser.");
    return null;
  }
  await registerServiceWorker(); // Ensure service worker is registered
  return messagingInstance;
};

// Request Notification Permission and Get FCM Token
const requestPermissionAndGetToken = async () => {
  try {
    if (Notification.permission === "denied") {
      console.log("Permission has been denied by the user");
      return;
    }

    const permission = await Notification.requestPermission();
    console.log("Permission granted:", permission);

    if (permission === "granted") {
      console.log("Getting FCM Token...");
      const fcmToken = await getToken(messagingInstance, {
        vapidKey: "BN8mixC4XH1wPY3Jb23p0vzTi0wNNZeM92Q-3Xo5NQG3J0O7wpq1l9eHWb0ueJ6k-DakO3oXpGNj5hKFvp5xsIQ", // Replace with your VAPID key
      });

      if (fcmToken) {
        console.log("FCM Token:", fcmToken);
        // Send token to backend for storage
        await sendTokenToBackend(fcmToken);
      } else {
        console.log("No FCM token received.");
      }
    }
  } catch (error) {
    console.error("Error requesting permission or fetching token:", error);
  }
};

// Send FCM Token to Backend
const sendTokenToBackend = async (fcmToken:any) => {
  try {
    const response = await fetch("/api/save-fcm-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: fcmToken }),
    });

    if (response.ok) {
      console.log("FCM token saved to backend successfully.");
    } else {
      console.error("Failed to save FCM token to backend.");
    }
  } catch (error) {
    console.error("Error saving FCM token to backend:", error);
  }
};

// Handle Foreground Messages
const listenForForegroundMessages = () => {
  onMessage(messagingInstance, (payload) => {
    console.log("Foreground message received:", payload);
    const { title, body, icon } = payload?.notification || {};

    // Display a browser notification with the message
    new Notification(title || "New Message", {
      body: body || "You have a new message.",
      icon: icon || "/default-icon.png", // Default icon if none is provided
    });
  });
};

// Initialize Messaging Setup
const setupMessaging = async () => {
  const messaging = await initializeMessaging();
  if (messaging) {
    // Request permission and get FCM token
    await requestPermissionAndGetToken();

    // Listen for foreground messages
    listenForForegroundMessages();
  }
};

// Start the Messaging Setup
setupMessaging();

// Export functions for reuse in other parts of the application
export { messagingInstance, getToken, onMessage, requestPermissionAndGetToken };
