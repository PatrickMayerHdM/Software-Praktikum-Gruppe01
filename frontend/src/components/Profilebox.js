import Item from "../theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

/** Dies erstellt einen React Komponenten zur Profilvorschau.
 * Damit dieser dann später in verschiedenen Ansichten der App angezeigt werden kann */

function Profilebox(){
    return(
        <Box sx={{ flexGrow: 1 }} >
            {/** Dies ist die Box, in welcher schlussendlich sich das Grid befindet */}
          <Grid container spacing={1}>
              {/** Das Grid an sich */}
            <Grid item xs={5} >
                {/** Ein Item für das Grid, hier der Vorname, bei einer Item größe 5 */}
              <Item>
                  Vorname
              </Item >
            </Grid >
              {/** Ein Item für das Grid, hier der Nachname, bei einer Item größe 5 */}
            <Grid item xs={5} >
              <Item>
                  Nachname
              </Item >
            </Grid >
              {/** Ein Item für das Grid, hier das Alter, bei einer Item größe 2 */}
            <Grid item xs={2} >
              <Item>
                  Alter
              </Item >
            </Grid >
              {/** Ein Item für das Grid, hier das Geschlecht, bei einer Item größe 4 */}
            <Grid item xs={4} >
              <Item>
                  Geschlecht
              </Item >
            </Grid >
              {/** Ein Item für das Grid, hier die Größe, bei einer Item größe 4 */}
            <Grid item xs={4} >
              <Item>
                  Größe
              </Item >
            </Grid >
              {/** Ein Item für das Grid, hier das Ähnlichkeitsmaß zwischen dem Suchprofil und dem
               in der Profilbox dargestellten Profil, bei einer Item größe 4 */}
            <Grid item xs={4} >
              <Item >
                  Ähnlichkeit
              </Item >
            </Grid >
          </Grid >
        </Box >

    )
}
export default Profilebox /** Der Export damit Profilebox auch an anderen Stellen verwendet werden kann */