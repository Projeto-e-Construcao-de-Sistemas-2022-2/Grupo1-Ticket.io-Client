import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'AIzaSyAsYQq3aOmEZN-c72r0AH5UTTOdOq9RmYg',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'ticket-io-auth.firebaseapp.com',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'ticket-io-auth',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'ticket-io-auth.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "1033659714959",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || '1:1033659714959:web:05eeeb11ed3dcec2b78ffa'
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app);

export { db, app }