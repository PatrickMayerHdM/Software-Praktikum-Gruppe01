import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import BlockIcon from '@mui/icons-material/Block';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import favoriteNoteBO from "../../api/FavoriteNoteBO";
import DatingSiteAPI from "../../api/DatingSiteAPI";
import blockNoteBO from "../../api/BlockNoteBO";
import "../App.css";

/** Da sich die Gestaltung der Profilkomponente nicht unterscheidet, ob es das eigene Profil oder ein Profil einer
 * anderen Person ist, werden die spezifischen Funktionen in einer extra Komponente behandelt.
 * Hier werden jetzt die Optionen dargestellt, welche ein User beim Anschauen eines anderen Profils hat.*/

class OptionsOtherProfile extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            adding_id: this.props.user.uid, // der blockierende User
            added_id: this.props.other_profile, // der geblockte User
            blocking_id: this.props.user.uid, // die eigene User-Id (Google-Id)
            blocked_id: this.props.other_profile, // die User-Id (Google-Id) des anderen Users
            lastPartURL: null, // die an der URL auszulesende Id
        }

        this.PersonSaved = this.PersonSaved.bind(this);
        this.PersonBlocked = this.PersonBlocked.bind(this);
    }

    componentDidMount() {
        const currentPath = window.location.pathname;
        // Letzte Teil der URL wird gepoppt, un in const lastPartURL gespeichert
        const lastPartURL = currentPath.split('/').pop();
        this.setState({lastPartURL: lastPartURL})
        this.setState({added_id: lastPartURL})
        this.setState({blocked_id: lastPartURL})
    }

    /** Die Funktionen die Ausgeführt werden, wenn auf einen Button gedrückt wird. */

    /** Funktion welche einen anderen User zu seinem eigenen Merkzettel hinzufügt. */
    PersonSaved(){

        const { adding_id, added_id } = this.state

        const newFavnote = new favoriteNoteBO(adding_id, added_id)
        console.log("die FavNote: ", newFavnote)
        console.log("IDs: ", added_id, adding_id)
        DatingSiteAPI.getAPI()
            // Hinzufügen des neuen FavoriteNote-Eintrags
            .addFavoritenoteProfileURL(newFavnote)
            .catch((e) =>
                this.setState({
                    error: e,
                })
            );
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
    }

    render() {

        return(
        <Box sx={{ flexGrow: 1 }}>
          <Grid container
            direction="row" justifyContent="center" alignItems="strech" >
            <Grid item md={4} xs={6} spacing={2} >
                <button className="button_container" onClick={this.PersonSaved} style={{ height: "100%", width: "100%" ,display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#6A7285", color:"#fff", cursor: "pointer", border: "solid", borderColor: '#BDC2BF'}}>
                    <BookmarkAddedIcon/>
                </button>
            </Grid>
            <Grid item md={4} xs={6} spacing={2}>
               <button className="button_container" onClick={this.PersonBlocked} style={{ height: "100%", width: "100%" ,display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#EE6457", color:"#fff", cursor: "pointer", border: "solid", borderColor: '#BDC2BF'}}>
                    <BlockIcon/>
               </button>
            </Grid>

          </Grid >
        </Box >
    )}
}

export default OptionsOtherProfile
