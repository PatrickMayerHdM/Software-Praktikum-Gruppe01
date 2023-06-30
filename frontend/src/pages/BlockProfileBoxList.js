import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BlockProfileBox from "../components/Blocknote/BlockProfileBox";
import React from "react";
import DatingSiteAPI from "../api/DatingSiteAPI";

/**
 * Dies ist eine Seite zur Darstellung mehrerer BlockProfileBoxen innerhalb eines weiteren Grids.
 */

class BlockProfileBoxList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            numProfiles: 0,
            profiles: [],
            otherProfileIndex: null
        }
    }

    getBlockProfiles() {
        /** Auslesen aller geblockten Profile eines Users. */
        DatingSiteAPI.getAPI()
        .getBlocknoteProfileURL(this.props.user.uid)
        .then(profilesvar => {
            this.setState({
                profiles: profilesvar,
            }, () => {
                const lengthProfiles = profilesvar.length;
                console.log("Dies ist lengthProfiles: ", lengthProfiles)
                this.setState({ numProfiles: lengthProfiles },
                    () => {console.log("Dies ist numProfiles: ", this.state.numProfiles)});
            });
        })
        .catch(error => {
            console.error('Error fetching data from API:', error);
        });
    }


    componentDidMount() {
        /** Methode, die beim Aufrufen der Seite geladen wird.
         *  Sie lädt alle ProfileBoxen, dessen Profile geblockt wurden. */

        this.getBlockProfiles();
    }

    handleRemoveProfile = (removedProfileId) => {
        /** Löschen von Profilen aus der Blockliste */
        const updatedProfiles = this.state.profiles.filter(profileId => profileId !== removedProfileId);
        const lengthupdatedProfiles = updatedProfiles.length;
        this.setState({
            profiles: updatedProfiles,
            numProfiles: lengthupdatedProfiles
        }, () => {
            console.log('handleRemoveProfile und profiles nach der Aktualisierung:', this.state.profiles);
        });
    };

    componentDidUpdate(prevProps) {
        /** Methode, die aufgerufen wird, sobald sich der State verändert.
         *  Dies passiert, wenn man das Profil auswählt, welches man zur Blockliste hinzufügen möchte. */
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

        // const für die Anzahl der anzuzeigenden Profile innerhalb der Sperrliste
        const count = this.state.numProfiles;
        const current_profile = this.props.user.uid;

        // Methode zur Darstellung einer FavoriteProfileBox
        const Listing = Array(count).fill(null).map((item, index) => (
            <Grid item xs={12} key={index} >
                <BlockProfileBox key={this.state.profiles[index]} current_profile={current_profile} other_profile={this.state.profiles[index]} onRemoveProfile={this.handleRemoveProfile} />
            </Grid>
        ));


        return (
            <div>
                <h2>Deine Sperrliste:</h2>
                {/*Darstellung, wenn Einträge in der BlockNote vorhanden sind*/}
                {Listing.length > 0 ? (
                    <Box sx={{ width: {lg: '50%', md: '60%', sm: '80%'}, margin: '0 auto'}} >
                        <Grid item container spacing={2} justifyContent="center">
                            {Listing}
                        </Grid>
                    </Box>
                ) : (
                    <p>Du hast keine Profile gesperrt...</p>
                )}
            </div>
        )
    }

}

export default BlockProfileBoxList