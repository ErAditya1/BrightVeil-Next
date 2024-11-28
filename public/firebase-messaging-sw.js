importScripts('https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging.js');


// Initialize Firebase in the service worker
const firebaseConfig = {
    apiKey: "AIzaSyDI-jJJDJlqRcEW5w7h-zKhDZLA9Y9iR2k",
    authDomain: "bright-veil-1366b.firebaseapp.com",
    projectId: "bright-veil-1366b",
    storageBucket: "bright-veil-1366b.firebasestorage.app",
    messagingSenderId: "1055157103882",
    appId: "1:1055157103882:web:c46a6ce3173a5301401ef3",
    measurementId: "G-MHH7K53ZSP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function (payload) {
  console.log('Background message received', payload);

  // Customize how the message is displayed
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
