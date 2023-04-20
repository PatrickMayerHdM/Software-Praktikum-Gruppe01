import Item from "../theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

/** Dies erstellt einen React Komponenten zur Profilvorschau.
 * Damit dieser dann später in verschiedenen Ansichten der App angezeit werden kann */

function Profilebox(){
    return(
        <Box sx={{ flexGrow: 1 }} >
          <Grid container spacing={2} >
            <Grid item xs={5} >
              <Item>
                  Vorname
              </Item >
            </Grid >
            <Grid item xs={5} >
              <Item>
                  Nachname
              </Item >
            </Grid >
            <Grid item xs={2} >
              <Item>
                  Alter
              </Item >
            </Grid >
            <Grid item xs={4} >
              <Item>Geschlecht</Item >
            </Grid >
            <Grid item xs={4} >
              <Item>Größe</Item >
            </Grid >
            <Grid item xs={4} >
              <Item >Ähnlichkeit</Item >
            </Grid >
          </Grid >
        </Box >

    )
}
