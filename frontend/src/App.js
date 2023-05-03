import Item from "./theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import OnBoarding from "./pages/OnBoarding";
import LogIn from "./pages/LogIn";
import TestProfileList from "./components/TestProfileList";
import BlockProfileBox from "./components/BlockProfileBox";
import FavoriteProfileBox from "./components/FavoriteProfileBox";
import Navbar from "./components/header/Navbar";
import SearchProfile from "./components/SearchProfile";
import Chat from "./components/Chat";

function App() {
  return (
        /** Darstellung der Test-Funktionen (LogIn-Page und OnBoarding-Page) */
    <div className="App">
        <Navbar/>

    </div>
  );
}

export default App;

/** Die Firebase Authentifizierung ist bei Kunz in App.js */

/** Die Inhaltsstruktur findet sich auch in App.js (Siehe Bankprojekt)*/