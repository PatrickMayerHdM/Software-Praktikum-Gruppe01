import Item from "../../theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import ProfileBox from "../Profile/ProfileBox";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import DatingSiteAPI from "../../api/DatingSiteAPI";
import PropTypes from 'prop-types';

/**
 * Da in der Konzeption die Profilbox nicht immer gleich aussieht, ist hier eine Anpassung.
 * Diese ist explizit für die Kontaktsperre ausgelegt und zeigt zusätzlich nochmal einen Entfernen-Button an.
 * Dies soll ermöglichen andere Personen wieder von der Kontaktsperre zu nehmen.
 */

class BlockProfileBox extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            blocking_id: this.props.current_profile,
            blocked_id: this.props.other_profile
        }
        this.BlockDelClicked = this.BlockDelClicked.bind(this);
    }

    static propTypes = {
        // Es wird eine Prop mit dem Namen onRemoveProfile erwartet.
        onRemoveProfile: PropTypes.func.isRequired,
    };

    /** Funktion welche ausgeführt wird, wenn der Button "Von Kontaktsperre Entfernen" gedrückt wird. */
    BlockDelClicked(){
        DatingSiteAPI.getAPI()
            // Löschen des BlockNote-Eintrags
            .removeBlocknoteProfile(this.state.blocking_id, this.state.blocked_id)
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

        /** Die Profilbox angepasst zur Darstellung von einer Kontaktsperre mit Profilen. */

        return(
            <Box sx={{ flexGrow: 1 }}>
              <Grid container direction="row" justifyContent="center" alignItems="stretch" container>
                <Grid item xs={10} spacing={2} >
                  <Item>
                      <ProfileBox other_profile={this.props.other_profile} ownprofile_id={this.state.blocking_id}/>
                  </Item >
                </Grid >
                <Grid item xs={2} >
                    <button onClick={() => {
                        this.BlockDelClicked();
                        this.props.onRemoveProfile(this.props.other_profile);
                    }} style={{ height: "100%", width: "100%" ,display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#EE6457", color:"#fff", cursor: "pointer", border: "solid", borderColor: '#BDC2BF'}}
                    >
                        <PersonRemoveIcon/>
                    </button>
                </Grid>
              </Grid>
            </Box>
        )
    }
}

export default BlockProfileBox