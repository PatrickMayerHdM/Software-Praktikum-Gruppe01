import Item from "../theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import ProfileBox from "./ProfileBox";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {Link} from "react-router-dom";
import DatingSiteAPI from "../api/DatingSiteAPI";
import favoriteNoteBO from "../api/FavoriteNoteBO";

/**
 * Da in der konzeption die Profilbox nicht immer gleich aussieht, ist hier eine Anpassung.
 * Diese ist explizit für die Kontaktsperre ausgelegt und zeigt zusätzlich nochmal einen entfernen Knopf an.
 * Dies soll später ermöglichen andere Personen, wieder von der Kontaktsperre zu nehmen.
 */

class FavoriteProfileBox extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            adding_id: this.props.current_profile,
            added_id: this.props.other_profile
        }

        this.FavoriteDelClicked = this.FavoriteDelClicked.bind(this);

    }

        /** Funktion welche ausgeführt wird, wenn  "Von Merkzettel Entfernen" gedrückt wird. */

        FavoriteDelClicked(){

            const { favoritenote_id } = this.state

            DatingSiteAPI.getAPI()
            // Löschen des FavoriteNote-Eintrags
            .removeFavoritenoteProfileURL(favoritenote_id)
            .then(() => {
                console.log("Von Merkzettel entfernt");
    })
            .catch((e) =>
                this.setState({
                    error: e,
                })
            );

            console.log("Von Merkzettel entfernt")
        }

    render() {

        /**
         * Die Profilbox an sich speziell angepasst auf die gegebenheiten zur Darstellung auf dem Merkzettel
         */

        return(
            <Box sx={{ flexGrow: 1 }}>
              <Grid container
                direction="row" justifyContent="center" alignItems="strech" >
                <Grid item xs={8} spacing={2}>
                  <Item>
                      <ProfileBox other_profile={this.props.other_profile}/>
                  </Item >
                </Grid >
                <Grid item xs={2} spacing={2} >
                    <Link to={`/ChatWindow/${this.props.current_profile}/${this.props.other_profile}`}>
                        <button style={{ height: "100%", width: "100%" ,display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#587D71", color:"#fff", cursor: "pointer", border: "solid", borderColor: '#BDC2BF'}}>
                            <ChatBubbleIcon/>
                        </button>
                    </Link>
                </Grid>
                <Grid item xs={2} spacing={2}>
                    <button onClick={this.FavoriteDelClicked} style={{ height: "100%", width: "100%" ,display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#d00000", color:"#fff", cursor: "pointer", border: "solid", borderColor: '#BDC2BF'}}>
                        <PersonRemoveIcon/>
                    </button>

                </Grid>

              </Grid >
            </Box >
        )
    }
}

export default FavoriteProfileBox