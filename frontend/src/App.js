import Item from "./theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Profilebox from "./components/Profilebox";
import OnBoarding from "./pages/OnBoarding";
import LogIn from "./pages/LogIn";
function App() {
  return (
        /** Darstellung der Test-Funktionen (LogIn-Page und OnBoarding-Page) */
    <div className="App">
     <LogIn/>
        <OnBoarding/>
        {/** Beispiel, um die Möglichkeit zur Darstellung von mehreren Profileboxen zu gewährleisten. */}
      <Box sx={{ flexGrow: 1 }} >
          <Grid container spacing={2} >
            <Grid item xs={7} >
              <Item>
                  <Profilebox/>
              </Item >
            </Grid >
            <Grid item xs={7} >
              <Item>
                  <Profilebox/>
              </Item >
            </Grid >
          </Grid >
        </Box >
    </div>
  );
}

export default App;

/** Die Firebase Authentifizierung ist bei Kunz in App.js */

/** Die Inhaltsstruktur findet sich auch in App.js (Siehe Bankprojekt)*/