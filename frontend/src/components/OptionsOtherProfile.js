import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import BlockIcon from '@mui/icons-material/Block';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import favoriteNoteBO from "../api/FavoriteNoteBO";
import DatingSiteAPI from "../api/DatingSiteAPI";
import blockNoteBO from "../api/BlockNoteBO";

/** Da sich die gestaltung der Profil komponente nicht unterscheidet, ob es das eigene Profil oder ein Profil einer
 * anderen Person ist, werden die spezifischen Funktionen in einem extra Komponenten behandelt.
 * Hier werden jetzt die Optionen, welche ein User explizit beim anschauen eines anderen Profils hat.*/

class OptionsOtherProfile extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            adding_id: this.props.user.uid,
            added_id: this.props.other_profile,
            blocking_id: this.props.user.uid,
            blocked_id: this.props.other_profile
        }

        this.PersonSaved = this.PersonSaved.bind(this);
        this.PersonBlocked = this.PersonBlocked.bind(this);
    }

    /** Die Funktionen die Ausgeführt werden, wenn auf einen Button gedrückt wird. */

    /** Funktion welche einen anderen User zu seinem eigenen Merkzettel hinzufügt. */
    PersonSaved(){

        const { adding_id, added_id } = this.state

        const newFavnote = new favoriteNoteBO(adding_id, added_id)
        console.log("die FavNote: ", newFavnote)
        DatingSiteAPI.getAPI()
            // Hinzufügen des neuen FavoriteNote-Eintrags
            .addFavoritenoteProfileURL(newFavnote)
            .catch((e) =>
                this.setState({
                    error: e,
                })
            );
        console.log("Zum Merkzettel hinzugefügt")

    }


    /** Funktion welche einen anderen User mit einer Kontaktsperre belegt.
     * Zu Testzwecken noch nicht weiter ausgeführt, sondern nur mit einem console.log */
    PersonBlocked(){

        const { blocking_id, blocked_id } = this.state

        const newBlocknote = new blockNoteBO(blocking_id, blocked_id)
        console.log("die BlockNote: ", newBlocknote)
        DatingSiteAPI.getAPI()
            // Hinzufügen des neuen FavoriteNote-Eintrags
            .addBlocknoteProfileURL(newBlocknote)
            .catch((e) =>
                this.setState({
                    error: e,
                })
            );
        console.log("Zur Kontaktsperre hinzugefügt")
    }

    render() {

        return(
        <Box sx={{ flexGrow: 1 }}>
          <Grid container
            direction="row" justifyContent="center" alignItems="strech" >
            <Grid item md={2} xs={4} spacing={2} >
                <button onClick={this.PersonSaved} style={{ height: "200%", width: "100%" ,display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#2ec43d", color:"#fff", cursor: "pointer", border: "solid", borderColor: '#BDC2BF'}}>
                    <BookmarkAddedIcon/>
                </button>
            </Grid>
            <Grid item md={2} xs={4} spacing={2}>
               <button onClick={this.PersonBlocked} style={{ height: "200%", width: "100%" ,display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#e63946", color:"#fff", cursor: "pointer", border: "solid", borderColor: '#BDC2BF'}}>
                    <BlockIcon/>
               </button>
            </Grid>

          </Grid >
        </Box >
    )}
}

export default OptionsOtherProfile
