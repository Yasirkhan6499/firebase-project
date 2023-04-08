// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAWgD--FFkbnz0fRaEFc-wfTBElHSPX_aA",
  authDomain: "fir-project-2-6614b.firebaseapp.com",
  projectId: "fir-project-2-6614b",
  storageBucket: "fir-project-2-6614b.appspot.com",
  messagingSenderId: "975115814480",
  appId: "1:975115814480:web:68a89ad368e74027a9b355",
  measurementId: "G-QXP9V1JDKN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);