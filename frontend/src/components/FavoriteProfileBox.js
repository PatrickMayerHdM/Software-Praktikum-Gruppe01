import Item from "../theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import ProfileBox from "./ProfileBox";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

/**
 * Da in der konzeption die Profilbox nicht immer gleich aussieht, ist hier eine Anpassung.
 * Diese ist explizit für die Kontaktsperre ausgelegt und zeigt zusätzlich nochmal einen entfernen Knopf an.
 * Dies soll später ermöglichen andere Personen, wieder von der Kontaktsperre zu nehmen.
 */

class FavoriteProfileBox extends React.Component{

    render() {

        /**
         * Funktion welche ausgeführt wird, wenn  "Von Merkzettel Entfernen" gedrückt wird.
         * Zu Testzwecken noch nicht weiter ausgeführt, sondern nur mit einem console.log
         */
        function FavoriteDelClicked(){
            console.log("Von Merkzettel entfernt")
        }

        /**
         * Funktion welche zu einer Kontaktanfrage für ein anderes Profil führt.
         * Zu Testzwecken noch nicht weiter ausgeführt, sondern nur mit einem console.log
         */

        function FavoriteAskClicked(){
            console.log("Kontaktanfrage geschickt")
        }

        /**
         * Die Profilbox an sich speziell angepasst auf die gegebenheiten zur Darstellung auf dem Merkzettel
         */

        return(
            <Box sx={{ flexGrow: 1 }}>
              <Grid container
                direction="row" justifyContent="center" alignItems="strech" >
                <Grid item xs={8} spacing={2}>
                  <Item>
                      <ProfileBox/>
                  </Item >
                </Grid >
                <Grid item xs={2} spacing={2} >
                    <button onClick={FavoriteAskClicked} style={{ height: "100%", width: "100%" ,display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#2A9D8F", color:"#fff", cursor: "pointer", border: "solid", borderColor: '#BDC2BF'}}>
                        <ChatBubbleIcon/>
                    </button>
                </Grid>
                <Grid item xs={2} spacing={2}>
                    <button onClick={FavoriteDelClicked} style={{ height: "100%", width: "100%" ,display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#d00000", color:"#fff", cursor: "pointer", border: "solid", borderColor: '#BDC2BF'}}>
                        <PersonRemoveIcon/>
                    </button>

                </Grid>

              </Grid >
            </Box >
        )
    }
}

export default FavoriteProfileBox