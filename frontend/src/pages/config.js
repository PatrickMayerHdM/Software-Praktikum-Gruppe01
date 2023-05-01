import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

/** Konfiguration für die Firebase-App */
const firebaseConfig = {
  apiKey: "AIzaSyBDCw5NLPJx0Xsi9CmUfrgDVtgAfZ7Ak3A",
  authDomain: "partnerboerse-soprass23-g01.firebaseapp.com",
  projectId: "partnerboerse-soprass23-g01",
  storageBucket: "partnerboerse-soprass23-g01.appspot.com",
  messagingSenderId: "867240219703",
  appId: "1:867240219703:web:06509e8c5ad5e6364fdbb2",
  measurementId: "G-BQGGB5ZPX8"
};

/** Firebase-App initialisieren */
const app = initializeApp(firebaseConfig);

/** Firebase-Auth-Objekt aus der initialisierten Firebase-App holen */
const auth = getAuth(app);

/** Firebase-Auth-Provider für Google-Authentifizierung erstellen */
const provider = new GoogleAuthProvider();

/** Exportiere das Firebase-Auth-Objekt und den Provider */
export { auth, provider };
