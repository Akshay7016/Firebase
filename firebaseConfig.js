import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyABkAxRAOJ1hAUMaGpJks3CEm_9yGFtl2g",
  authDomain: "fir-frontend-c7ecf.firebaseapp.com",
  projectId: "fir-frontend-c7ecf",
  storageBucket: "fir-frontend-c7ecf.appspot.com",
  messagingSenderId: "383640267837",
  appId: "1:383640267837:web:0024af45a184621c330e54"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
export const storage = getStorage(app); 
