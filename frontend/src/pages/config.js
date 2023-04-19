import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBDCw5NLPJx0Xsi9CmUfrgDVtgAfZ7Ak3A",
  authDomain: "partnerboerse-soprass23-g01.firebaseapp.com",
  projectId: "partnerboerse-soprass23-g01",
  storageBucket: "partnerboerse-soprass23-g01.appspot.com",
  messagingSenderId: "867240219703",
  appId: "1:867240219703:web:06509e8c5ad5e6364fdbb2",
  measurementId: "G-BQGGB5ZPX8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth, provider};