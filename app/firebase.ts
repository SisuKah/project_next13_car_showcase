import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyDWBL1lTmRDsrXLMLdPth1cD4WIUFUYye8",
  authDomain: "autonetti-293f3.firebaseapp.com",
  projectId: "autonetti-293f3",
  storageBucket: "autonetti-293f3.firebasestorage.app",
  messagingSenderId: "635282987763",
  appId: "1:635282987763:web:27d6d489221a52c219b586",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firestore and get a reference to the database
const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the storage service
const storage = getStorage(app);

// Export the app, auth, db, and storage instances
export { app, auth, db, storage };
