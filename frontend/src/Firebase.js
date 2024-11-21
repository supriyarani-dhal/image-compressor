import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDoc,
  addDoc,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1xoizIE1z_hnbJyvFB_qlWo7kENKXCCw",
  authDomain: "pix-compress.firebaseapp.com",
  projectId: "pix-compress",
  storageBucket: "pix-compress.firebasestorage.app",
  messagingSenderId: "283175463637",
  appId: "1:283175463637:web:21ac9a657db1cd2d98505c",
  measurementId: "G-7RF5LMXBF9",
};

//to initialize our firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//to connect our firebase database
const db = getFirestore(app);
//to set our google authentication provider
const googleProvider = new GoogleAuthProvider();

//to sign in with google
const signInWithGoogle = async () => {
  try {
    const response = await signInWithPopup(auth, googleProvider);
    const user = response.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDoc(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        authProvider: "google",
      });
    }
  } catch (error) {
    console.error(error.message);
    alert(error.message);
  }
};

export { auth, db, signInWithGoogle };
