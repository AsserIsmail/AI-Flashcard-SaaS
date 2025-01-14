import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0ExSzNmf-yQt8Cl7f6X7u5kmWSrM__5I",
  authDomain: "flashcard-saas-f7334.firebaseapp.com",
  projectId: "flashcard-saas-f7334",
  storageBucket: "flashcard-saas-f7334.firebasestorage.app",
  messagingSenderId: "1092555766933",
  appId: "1:1092555766933:web:882708ad391ce037b62f9c",
  measurementId: "G-5FE6XKB38V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}
// Initialize Firestore
const db = getFirestore(app)
export default {db, analytics}

