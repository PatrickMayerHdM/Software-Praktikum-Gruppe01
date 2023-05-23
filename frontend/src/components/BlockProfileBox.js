import Item from "../theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import ProfileBox from "./ProfileBox";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';


/**
 * Da in der konzeption die Profilbox nicht immer gleich aussieht, ist hier eine Anpassung.
 * Diese ist explizit für die Kontaktsperre ausgelegt und zeigt zusätzlich nochmal einen entfernen Knopf an.
 * Dies soll später ermöglichen andere Personen, wieder von der Kontaktsperre zu nehmen.
 */

class BlockProfileBox extends React.Component{

    render() {
            /** Funktion welche ausgeführt wird, wenn der Button "Von Kontaktsperre Entfernen" gedrückt wird.
         * Bisher zu Testzwecken noch nicht weiter ausgeführt */
        function BlockDelClicked(){
            console.log("Von Kontaktsperre entfernt")
        }

        /** Die Profilbox an sich, speziell angepasst auf die gegebenheiten zur Darstellung der mit einer
         * Kontaktsperre belegten Profile */

        return(
            <Box sx={{ flexGrow: 1 }}>
              <Grid container
                direction="row" justifyContent="center" alignItems="stretch" container>
                <Grid  item xs={10} spacing={2} >
                  <Item>
                      <ProfileBox/>
                  </Item >
                </Grid >
                <Grid item xs={2} >
                    <button onClick={BlockDelClicked} style={{ height: "100%", width: "100%" ,display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#e63946", color:"#fff", cursor: "pointer", border: "solid", borderColor: '#BDC2BF'}}>
                        <PersonRemoveIcon/>
                    </button>
                </Grid>

              </Grid >
            </Box >
            )
    }
}

export default BlockProfileBox