// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyAv4Mueagq0OFD91gLnYpJevHU9BU1hw1k",
  authDomain: "poc-pwa-35c7a.firebaseapp.com",
  projectId: "poc-pwa-35c7a",
  storageBucket: "poc-pwa-35c7a.appspot.com",
  messagingSenderId: "51015854415",
  appId: "1:51015854415:web:1ed32389f8f7f955963d3a",
  measurementId: "G-SYYLRMG2Q4",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
