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
                <Grid item lg={12} md={12} xs={12} >
                    {/** Ein Item für das Grid, hier der Vorname*/}
                  <Item>
                      VVVVVVVVVVVVVVVV
                  </Item >
                </Grid >
                  {/** Ein Item für das Grid, hier der Nachname */}
                <Grid item lg={12} md={12} xs={12} >
                  <Item>
                      MMMMMMMMMMMMMMMMMM
                  </Item >
                </Grid >
                  {/** Ein Item für das Grid, hier das Alter*/}
                <Grid item lg={2} md={2} xs={4} >
                  <Item>
                      20
                  </Item >
                </Grid >
                  {/** Ein Item für das Grid, hier das Geschlecht */}
                <Grid item lg={5} md={5} xs={8} >
                  <Item>
                      Nicht-binär
                  </Item >
                </Grid >
                  {/** Ein Item für das Grid, hier die Größe*/}
                <Grid item lg={3} md={3} xs={6} >
                  <Item>
                      182cm
                  </Item >
                </Grid >
                  {/** Ein Item für das Grid, hier das Ähnlichkeitsmaß zwischen dem Suchprofil und dem
                   in der Profilbox dargestellten Profil*/}
                <Grid item lg={2} md={2} xs={6} >
                  <Item >
                      72%
                  </Item >
                </Grid >
              </Grid >
            </Box >
        )
    }
}

export default ProfileBox