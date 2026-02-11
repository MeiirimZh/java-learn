import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyCIyBA8_qPRgzNW6J-5qngiea5VxPM_H0Q",

  authDomain: "javalearn-baf01.firebaseapp.com",

  projectId: "javalearn-baf01",

  storageBucket: "javalearn-baf01.firebasestorage.app",

  messagingSenderId: "55407109227",

  appId: "1:55407109227:web:c807f89790dec2932abd2e"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);