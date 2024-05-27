import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Verifica que las variables de entorno estén correctamente definidas
console.log("Firebase API Key:", import.meta.env.VITE_API_KEY);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-61bab.firebaseapp.com",
  projectId: "reactchat-61bab",
  storageBucket: "reactchat-61bab.appspot.com",
  messagingSenderId: "1030326430710",
  appId: "1:1030326430710:web:055ff65ea4753d5bb9f5d7"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar los módulos de Firebase que necesitas
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
