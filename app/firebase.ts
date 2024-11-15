import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWBL1lTmRDsrXLMLdPth1cD4WIUFUYye8",
  authDomain: "autonetti-293f3.firebaseapp.com",
  projectId: "autonetti-293f3",
  storageBucket: "autonetti-293f3.firebasestorage.app",
  messagingSenderId: "635282987763",
  appId: "1:635282987763:web:27d6d489221a52c219b586"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Export the app and auth instances
export { app, auth };
