import { useEffect, useState } from "react";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import OnBoarding from "./OnBoarding";
/** Definition der Login-Komponente */
function LogIn() {

  /** Verwendung der useState-Hook, um den anfänglichen Zustand
   des "value"-Staates auf eine leere Zeichenfolge zu setzen */
  const [value, setValue] = useState("");

  /** Definition der handleClick-Funktion, die aufgerufen wird,
   wenn der "Registrieren mit Google"-Button geklickt wird */
  const handleClick = () => {
    /** Aufrufen der signInWithPopup-Funktion mit dem "auth" und "provider" Objekten als Parameter,
     um eine Popup-Authentifizierung mit Google durchzuführen */
    signInWithPopup(auth, provider).then((data) => {
      /** Setzen des "value"-Staates auf die E-Mail-Adresse des angemeldeten Benutzers */
      setValue(data.user.email);
      /** Speichern der E-Mail-Adresse in localStorage,
       um den Benutzer bei zukünftigen Anmeldungen automatisch zu authentifizieren */
      localStorage.setItem("email", data.user.email);
    });
  };

  /** Verwendung der useEffect-Hook, um den "value"-Staates mit der E-Mail-Adresse
   des angemeldeten Benutzers aus localStorage zu initialisieren */
  useEffect(() => {
    setValue(localStorage.getItem("email"));
  }, []);

  /** Rückgabe des LogIn-Komponenten-Renderings */
  return (
    <div>
      {/** Überprüfung, ob der "value"-Staat gesetzt ist, um zu entscheiden,
      ob die OnBoarding-Komponente oder der "Registrieren mit Google"-Button gerendert wird */}
      {value ? (
        <OnBoarding />
      ) : (
        <button onClick={handleClick}> Registrieren mit Google </button>
      )}
    </div>
  );
}
/** Exportieren der LogIn-Komponente als Standard */
export default LogIn;
