import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBpMbGdqkxhhhQZyfhnxlubeNb7C9vH5Y",
  authDomain: "trello-clone-28d2c.firebaseapp.com",
  projectId: "trello-clone-28d2c",
  storageBucket: "trello-clone-28d2c.firebasestorage.app",
  messagingSenderId: "768659363405",
  appId: "1:768659363405:web:5c7d6573d41efceb66ee04",
  measurementId: "G-DYMB5DQEJN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const db = getFirestore(app);

export default app;