import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile
} from "firebase/auth";
import { initializeApp } from 'firebase/app';
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYiuZaxArnAwPZzNCjFyirdTc2Zl0xyQs",
  authDomain: "bet-ml-f1c3b.firebaseapp.com",
  databaseURL: "https://bet-ml-f1c3b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bet-ml-f1c3b",
  storageBucket: "bet-ml-f1c3b.appspot.com",
  messagingSenderId: "268246168759",
  appId: "1:268246168759:web:631254c9c073c5192ac932",
  measurementId: "G-C31Y4YR6DB"
}

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const db = getFirestore();

export const logoutUser = () => {
  signOut(auth);
}

export const signUpUser = async ({ name, email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    return { user: userCredential.user };
  } catch (error) {
    return { error: error.message };
  }
}

export const loginUser = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user };
  } catch (error) {
    return { error: error.message };
  }
}

export const sendEmailWithPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {};
  } catch (error) {
    return { error: error.message };
  }
}
