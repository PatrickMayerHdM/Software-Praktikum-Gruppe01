import Item from "../theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FavoriteProfileBox from "../components/Favoritenote/FavoriteProfileBox";
import React from "react";
import DatingSiteAPI from "../api/DatingSiteAPI";

/**
 * Dies ist eine Seite, zum Darstellen mehrerer FavoriteProfileBoxen innerhalb eines weiteren Grids.
 * Damit dies dann nicht mehr innerhalb der App.js geschehen muss und die App.js dadurch übersichtlicher bleibt.
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
        DatingSiteAPI.getAPI()
        .getFavoritenoteProfileURL(this.props.user.uid)
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
      this.getFavoriteProfiles(() => {
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

        // const für die Anzahl der anzuzeigenden Profile innerhalb der Merkliste
        const count = this.state.numProfiles;
        const { profiles } = this.state;
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