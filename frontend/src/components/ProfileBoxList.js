import Item from "../theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import ProfileBox from "./ProfileBox";
import DatingSiteAPI from "../api/DatingSiteAPI";


/**
 * Dies ist eine Liste, welche Anpassbar ist und mit Profilboxen gefüllt werden kann.
 *
 * Zu Testzwecken, soll erstmal erreicht werden, dass eine vorher festgelegte Anzahl an Profilen angezeigt werden kann.
 */

class ProfileBoxList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            numProfiles: 0,
            profiles: [],
            otherProfileIndex: null
        }
    }

    componentDidMount() {
        DatingSiteAPI.getAPI()
        .getProfileByID(this.props.user.uid)
        .then(profilesvar => {
            const lengthProfiles = this.state.profiles.length;
            this.setState(prevState => ({
                profiles: [...prevState.profiles, ...profilesvar],
                numProfiles: lengthProfiles
            }));
        })
        .catch(error => {
          console.error('Error fetching data from API:', error);
        });
    }

    handleProfileClick = (index) => {
        this.setState({ otherProfileIndex: index});
    };

    render() {

        const count = this.state.numProfiles;

        const current_profile = this.props.user.uid;

        // Methode zum darstellen einer Profilbox
        const Listing = Array(count).fill(null).map((item, index) => (
            <Grid item xs={12} key={index}>
                <Item>
                    <ProfileBox current_profile={current_profile}
                                other_profile={this.state.profiles[index]}
                                onClick={() => this.handleProfileClick(index)}/>
                </Item >
            </Grid >
        ));

        return (
            <Box sx={{ width: "100%",  margin: '0 auto'}} >
              <Grid container spacing={2}
                justifyContent="center">
                  {Listing}
              </Grid >
            </Box >
        )
    }
}

export default ProfileBoxList