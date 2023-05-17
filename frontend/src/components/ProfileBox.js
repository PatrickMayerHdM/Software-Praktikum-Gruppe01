import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Item from "../theme";

/**
 * Dies stellt einen React Klassenkomponenten dar, welcher eine Kurzansicht eines Profils einer anderen Person ist.
 * Diese Ansicht eines anderen Profils kann dann beispielsweise innerhalb der Suchergebnisse genutzt werden.
 */

class ProfileBox extends React.Component {

    render() {
        return(
            <Box sx={{width: '100%'}} >
                {/** Dies ist die Box, in welcher schlussendlich sich das Grid befindet */}
              <Grid container spacing={1}>
                  {/** Das Grid an sich */}
                <Grid item md={5} xs={6} >
                    {/** Ein Item für das Grid, hier der Vorname, bei einer Item größe 5 */}
                  <Item>
                      Vorname
                  </Item >
                </Grid >
                  {/** Ein Item für das Grid, hier der Nachname, bei einer Item größe 5 */}
                <Grid item md={5} xs={6} >
                  <Item>
                      Nachname
                  </Item >
                </Grid >
                  {/** Ein Item für das Grid, hier das Alter, bei einer Item größe 2 */}
                <Grid item md={2} xs={4} >
                  <Item>
                      Alter
                  </Item >
                </Grid >
                  {/** Ein Item für das Grid, hier das Geschlecht, bei einer Item größe 4 */}
                <Grid item md={4} xs={8} >
                  <Item>
                      Geschlecht
                  </Item >
                </Grid >
                  {/** Ein Item für das Grid, hier die Größe, bei einer Item größe 4 */}
                <Grid item md={4} xs={6} >
                  <Item>
                      Größe
                  </Item >
                </Grid >
                  {/** Ein Item für das Grid, hier das Ähnlichkeitsmaß zwischen dem Suchprofil und dem
                   in der Profilbox dargestellten Profil, bei einer Item größe 4 */}
                <Grid item md={4} xs={6} >
                  <Item >
                      Ähnlichkeit
                  </Item >
                </Grid >
              </Grid >
            </Box >
        )
    }
}

export default ProfileBox