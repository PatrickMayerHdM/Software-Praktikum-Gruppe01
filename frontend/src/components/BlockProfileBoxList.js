import Item from "../theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BlockProfileBox from "./BlockProfileBox";
import React from "react";
import DatingSiteAPI from "../api/DatingSiteAPI";

/**
 * Dies ist eine  Seite, zum darstellen mehrerer BlockProfileBox innerhalb eines weiteren Grids.
 * Damit dies dann nicht mehr innerhalb der App.js geschehen muss und die App.js dadurch übersichtlicher bleibt.
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
        DatingSiteAPI.getAPI()
        .getBlocknoteProfileURL(this.props.user.uid)
        .then(profilesvar => {
            const lengthProfiles = this.state.profiles.length;
            this.setState(prevState => ({
                profiles: profilesvar,
                numProfiles: lengthProfiles
            }));
        })
        .catch(error => {
          console.error('Error fetching data from API:', error);
        });
    }


    componentDidMount() {
        this.getBlockProfiles(() => {
            console.log('profiles im componentDidMount:', this.state.profiles);
        });
    }

    handleRemoveProfile = (removedProfileId) => {
        console.log('handleRemoveProfile und profiles vor der Aktualisierung:', this.state.profiles);
        console.log('handleRemoveProfile und die removedProfileId:', removedProfileId);
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
        if (prevProps.other_profile !== this.props.other_profile) {
            this.setState({
                added_id: this.props.other_profile
            });
        }
    }

    handleProfileClick = (index) => {
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