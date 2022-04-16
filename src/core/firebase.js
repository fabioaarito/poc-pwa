import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAv4Mueagq0OFD91gLnYpJevHU9BU1hw1k",
  authDomain: "poc-pwa-35c7a.firebaseapp.com",
  projectId: "poc-pwa-35c7a",
  storageBucket: "poc-pwa-35c7a.appspot.com",
  messagingSenderId: "51015854415",
  appId: "1:51015854415:web:1ed32389f8f7f955963d3a",
  measurementId: "G-SYYLRMG2Q4",
};

// Initialize Firebase and Firestore
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Enable offline support
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === "failed-precondition") {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (err.code === "unimplemented") {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
});

export { db };

const messaging = getMessaging(firebaseApp);
export const getFirebaseMessagingToken = (setTokenFound) =>
  getToken(messaging, {
    vapidKey:
      "BPE-0UAqnxNngKu-8A3-p_1YihHY1iEShdM6g8csXR2sQ2OunOYwkuh6XwfAzJ8ixMYmtN2ZPyvPMU0ZFfs8nFs",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // ...
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // ...
    });

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
