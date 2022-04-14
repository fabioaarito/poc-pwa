import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
