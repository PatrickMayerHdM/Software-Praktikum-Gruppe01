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
                <Grid item lg={3} md={3} xs={3} >
                  <Item>
                      20
                  </Item >
                </Grid >
                  {/** Ein Item für das Grid, hier das Geschlecht */}
                <Grid item lg={6} md={6} xs={5} >
                  <Item>
                      Nicht-binär
                  </Item >
                </Grid >
                  {/** Ein Item für das Grid, hier die Größe*/}
                <Grid item lg={3} md={3} xs={4} >
                  <Item>
                      182cm
                  </Item >
                </Grid >
              </Grid >
            </Box >
        )
    }
}

export default ProfileBox