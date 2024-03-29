import Item from "../theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FavoriteProfileBox from "../components/Favoritenote/FavoriteProfileBox";
import React from "react";
import DatingSiteAPI from "../api/DatingSiteAPI";

/**
 * Dies ist eine Seite zur Darstellung mehrerer FavoriteProfileBoxen innerhalb eines weiteren Grids.
 */

class FavoriteProfileBoxList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            numProfiles: 0,
            profiles: [],
            otherProfileIndex: null
        }
    }


    getFavoriteProfiles() {
        /** Auslesen aller gemerkten Profile eines Users. */
        DatingSiteAPI.getAPI()
        .getFavoritenoteProfileURL(this.props.user.uid)
        .then(profilesvar => {
            this.setState({
                profiles: profilesvar,
            }, () => {
                const lengthProfiles = profilesvar.length;
                this.setState({ numProfiles: lengthProfiles })
            });
        })
        .catch(error => {
          console.error('Error fetching data from API:', error);
        });
    }

    componentDidMount() {
        /** Methode, die beim Aufrufen der Seite geladen wird.
         *  Sie lädt alle ProfileBoxen, dessen Profile gemerkt wurden. */
        this.getFavoriteProfiles();
    }

    handleRemoveProfile = (removedProfileId) => {
        /** Löschen von Profilen aus der Merkliste */
        const updatedProfiles = this.state.profiles.filter(profileId => profileId !== removedProfileId);
        const lengthupdatedProfiles = updatedProfiles.length;
        this.setState({
            profiles: updatedProfiles,
            numProfiles: lengthupdatedProfiles
        });
    };

    componentDidUpdate(prevProps) {
        /** Methode, die aufgerufen wird, sobald sich der State verändert.
         *  Dies passiert, wenn man das Profil auswählt, welches man zum Merkzettel hinzufügen möchte. */
        if (prevProps.other_profile !== this.props.other_profile) {
            this.setState({
                added_id: this.props.other_profile
            });
        }
    }

    handleProfileClick = (index) => {
        /** Setzt den Index je nach ausgewähltem Profil */
        this.setState({ otherProfileIndex: index});
    };

    render() {

        // const für die Anzahl der anzuzeigenden Profile innerhalb der Merkliste
        const count = this.state.numProfiles;
        const current_profile = this.props.user.uid;

        // Methode zur Darstellung einer FavoriteProfileBox
        const Listing = Array(count).fill(null).map((item, index) => (
            <Grid item xs={12} key={this.state.profiles[index]}>
                <Item>
                    <FavoriteProfileBox
                        key={this.state.profiles[index]}
                        current_profile={current_profile}
                        other_profile={this.state.profiles[index]}
                        onRemoveProfile={this.handleRemoveProfile}
                    />
                </Item>
            </Grid>
        ));


        return (
            <div>
                <h2>Dein Merkzettel:</h2>
                {/*Darstellung, wenn Einträge in der FavoriteNote vorhanden sind*/}
                {Listing.length > 0 ? (
                    <Box sx={{ width: {lg: '50%', md: '60%', sm: '80%'}, margin: '0 auto'}} >
                        <Grid item container spacing={2} justifyContent="center">
                            {Listing}
                        </Grid>
                    </Box>
                ) : (
                    <p>Du hast keine Profile gemerkt...</p>
                )}
            </div>
        )
    }

}

export default FavoriteProfileBoxList