import Item from "./theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Profilebox from "./components/Profilebox";

function App() {
  return (
    <div className="App">
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

/*Die Firebase Authentifizierung ist bei Kunz in App.js */

/*Die Inhaltsstruktur findet sich auch in App.js (Siehe Bankprojekt)*/