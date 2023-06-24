import Item from "../../theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import ProfileBox from "../Profile/ProfileBox";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {Link} from "react-router-dom";
import DatingSiteAPI from "../../api/DatingSiteAPI";
import PropTypes from 'prop-types';

/**
 * Da in der Konzeption die Profilbox nicht immer gleich aussieht, ist hier eine Anpassung.
 * Diese ist explizit für den Merkzettel ausgelegt und zeigt zusätzlich nochmal einen Chat und Entfernen-Button an.
 * Dies soll ermöglichen andere Personen anzuschreiben oder sie wieder von der Merkliste zu nehmen.
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

    static propTypes = {
        // Es wird eine Prop mit dem Namen onRemoveProfile erwartet.
        onRemoveProfile: PropTypes.func.isRequired,
    };

    /** Funktion welche ausgeführt wird, wenn "Von Merkzettel Entfernen" gedrückt wird. */

    FavoriteDelClicked(){

        DatingSiteAPI.getAPI()
        // Löschen des FavoriteNote-Eintrags
        .removeFavoritenoteProfileURL(this.state.adding_id, this.state.added_id)
        .then(() => {
            console.log("Von Merkzettel entfernt");
        })
        .catch((e) =>
            this.setState({
                error: e,
            })
        );
    }

    render() {

        /** Die Profilbox angepasst zur Darstellung von einer Merkliste mit Profilen. */

        return(
            <Box sx={{ flexGrow: 1 }}>
              <Grid container direction="row" justifyContent="center" alignItems="strech" >
                <Grid item xs={8} spacing={2}>
                  <Item>
                      <ProfileBox other_profile={this.props.other_profile} ownprofile_id={this.state.adding_id}/>
                  </Item >
                </Grid >
                <Grid item xs={2} spacing={2} >
                    <Link to={`/ChatWindow/${this.props.current_profile}/${this.props.other_profile}`}>
                        <button style={{ height: "100%", width: "100%" ,display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#6A7285", color:"#fff", cursor: "pointer", border: "solid", borderColor: '#BDC2BF'}}>
                            {/*Leitet zum Chat-Fenster weiter*/}
                            <ChatBubbleIcon/>
                        </button>
                    </Link>
                </Grid>
                <Grid item xs={2} spacing={2}>
                    <button onClick={() => {
                        this.FavoriteDelClicked();
                        this.props.onRemoveProfile(this.props.other_profile);
                    }} style={{ height: "100%", width: "100%" ,display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#EE6457", color:"#fff", cursor: "pointer", border: "solid", borderColor: '#BDC2BF'}}
                    >
                        <PersonRemoveIcon/>
                    </button>
                </Grid>

              </Grid >
            </Box >
        )
    }
}

export default FavoriteProfileBox