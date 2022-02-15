import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBJ6pit-F13EJlKqoF7lsiOTwx9PNPWSlE",
  authDomain: "cryptocup-uf.firebaseapp.com",
  projectId: "cryptocup-uf",
  storageBucket: "cryptocup-uf.appspot.com",
  messagingSenderId: "643811367282",
  appId: "1:643811367282:web:4ffe0c2729fa2e7a72a5eb",
  measurementId: "G-MX3DHEL6E4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
