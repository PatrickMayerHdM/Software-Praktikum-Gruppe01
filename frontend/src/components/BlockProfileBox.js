import Item from "../theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Profilebox from "./Profilebox";
import React from "react";

/** Da in der konzeption die Profilbox nicht immer gleich aussieht, ist hier eine Anpassung.
 * Diese ist explizit für die Kontaktsperre ausgelegt und zeigt zusätzlich nochmal einen entfernen Knopf an.
 * Dies soll später ermöglichen andere Personen, wieder von der Kontaktsperre zu nehmen.*/

function BlockProfileBox(){

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
            <Grid item xs={6} >
              <Item>
                  <Profilebox/>
              </Item >
            </Grid >
            <Grid item xs={1} >
                <Item style={{ height: "100%", width: "100%" ,display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#BDC2BF", color:"#fff", border: "solid", borderColor: '#BDC2BF'}}>
                    <button onClick={BlockDelClicked}  style={{height: "100%", width: "100%" ,cursor: "pointer", backgroundColor: "#e63946", border: "none", color:"#fff"}}>
                        Von Sperrliste
                        Entfernen
                    </button>
                </Item>
            </Grid>

          </Grid >
        </Box >
        )

}


export default BlockProfileBox