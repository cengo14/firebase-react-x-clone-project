import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyAlDWrp_IkclKPhYfPM4-xrbmh1JNJ000k",
  authDomain: "x-clone-142f5.firebaseapp.com",
  projectId: "x-clone-142f5",
  storageBucket: "x-clone-142f5.appspot.com",
  messagingSenderId: "1054302250711",
  appId: "1:1054302250711:web:10ed3d4ee5e62550243292",
};

const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
