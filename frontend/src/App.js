import Item from "./theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Profilebox from "./components/Profilebox";
import OnBoarding from "./pages/OnBoarding";
import LogIn from "./pages/LogIn";
import TestProfileList from "./components/TestProfileList";
function App() {
  return (
        /** Darstellung der Test-Funktionen (LogIn-Page und OnBoarding-Page) */
    <div className="App">
     <LogIn/>
        <OnBoarding/>
        <TestProfileList/>

    </div>
  );
}

export default App;

/** Die Firebase Authentifizierung ist bei Kunz in App.js */

/** Die Inhaltsstruktur findet sich auch in App.js (Siehe Bankprojekt)*/