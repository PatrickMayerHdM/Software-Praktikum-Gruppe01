import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import BlockIcon from '@mui/icons-material/Block';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';


/** Da sich die gestaltung der Profil komponente nicht unterscheidet, ob es das eigene Profil oder ein Profil einer
 * anderen Person ist, werden die spezifischen Funktionen in einem extra Komponenten behandelt.
 * Hier werden jetzt die Optionen, welche ein User explizit beim anschauen eines anderen Profils hat.*/

class OptionsOtherProfile extends React.Component{

    /** Die Funktionen die Ausgeführt werden, wenn auf einen Button gedrückt wird. */

    /** Funktion welche einen anderen User zu seinem eigenen Merkzettel hinzufügt.
     * Zu Testzwecken noch nicht weiter ausgeführt, sondern nur mit einem console.log */
    PersonSaved(){
        console.log("Zum Merkzettel hinzugefügt")
    }

    /** Funktion welche zu einer Kontaktanfrage für ein anderes Profil führt.
     * Zu Testzwecken noch nicht weiter ausgeführt, sondern nur mit einem console.log
     * Klären, ob mit Kontaktanfrage in FavoriteProfileBox vereinen!*/
    PersonAsked(){
        console.log("Kontaktanfrage geschickt")
    }

    /** Funktion welche einen anderen User mit einer Kontaktsperre belegt.
     * Zu Testzwecken noch nicht weiter ausgeführt, sondern nur mit einem console.log */
    PersonBlocked(){
        console.log("Kontaktsperre")
    }

    render() {

        return(
        <Box sx={{ flexGrow: 1 }}>
          <Grid container
            direction="row" justifyContent="center" alignItems="strech" >
            <Grid item md={2} xs={4} spacing={2}>
              <button onClick={this.PersonAsked} style={{ height: "200%", width: "100%" ,display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#8158fa", color:"#fff", cursor: "pointer", border: "solid", borderColor: '#BDC2BF'}}>
                    <ChatBubbleIcon/>
              </button>
            </Grid >
            <Grid item md={2} xs={4} spacing={2} >
                <button onClick={this.PersonSaved} style={{ height: "200%", width: "100%" ,display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#2ec43d", color:"#fff", cursor: "pointer", border: "solid", borderColor: '#BDC2BF'}}>
                    <BookmarkAddedIcon/>
                </button>
            </Grid>
            <Grid md={2} xs={4} spacing={2}>
               <button onClick={this.PersonBlocked} style={{ height: "200%", width: "100%" ,display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#e63946", color:"#fff", cursor: "pointer", border: "solid", borderColor: '#BDC2BF'}}>
                    <BlockIcon/>
               </button>
            </Grid>

          </Grid >
        </Box >
    )}
}

export default OptionsOtherProfile
