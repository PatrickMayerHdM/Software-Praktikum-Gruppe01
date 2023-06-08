import Item from "../theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ChatProfileBox from "./ChatProfileBox";
import React from "react";
import DatingSiteAPI from "../api/DatingSiteAPI";

/**
 * Dies ist eine Seite, zum Darstellen mehrerer ChatProfileBox innerhalb eines weiteren Grids.
 * Damit dies dann nicht mehr innerhalb der App.js geschehen muss und die App.js dadurch übersichtlicher bleibt.
 */

class ChatProfileBoxList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            numProfiles: 0,
            profiles: [],
            otherProfileIndex: null
        }
    }

    // Funktion, welche man in der componentDidMount() aufrufen sollte, wenn man DummyDaten und das Fake Back-End verwenden will.
    MountFakeBackEnd() {
        const dummyChatProfiles = [13, 42, 51]; // Dummy Daten die später ersetzt werden durch einen GET

        this.setState({profiles: dummyChatProfiles}, () => {
            const lengthProfiles = this.state.profiles.length;
            this.setState({numProfiles: lengthProfiles})
            console.log(this.state.profiles, this.state.numProfiles)
        });
    }

    // Funktion, welche man in der componentDidMount() aufrufen sollte, wenn man das richtige Back-End verwenden will.
    MountBackEnd() {
        DatingSiteAPI.getAPI()
        .getChats()
        .then(profilesvar => {
          this.setState(prevState => ({
            profiles: [...prevState.profiles, ...profilesvar]
          }));

          const lengthSearchprofiles = this.state.Searchprofiles.length;
          this.setState({ numSearchProfiles: lengthSearchprofiles });

        })
        .catch(error => {
          console.error('Error fetching data from API:', error);
        });
    }

    // componentDidMount() welche Ausgeführt wird, wenn der Komponent gelanden wird.
    componentDidMount() {
        this.MountFakeBackEnd();
    }

    handleProfileClick = (index) => {
        this.setState({ otherProfileIndex: index});
    };

    render() {

        // const für die Anzahl der anzuzeigenden Profile innerhalb der ChatListe
        const count = this.state.numProfiles;

        const current_profile = this.props.user.uid;

        // Methode zur Darstellung einer ChatProfileBox
        const Listing = Array(count).fill(null).map((item, index) => (
            <Grid item xs={12} >
                <Item>
                    <ChatProfileBox current_profile={current_profile}
                                    other_profile={this.state.profiles[index]}
                                    onClick={() => this.handleProfileClick(index)}/>
                </Item >
            </Grid >
        ));

        return (
            <div>
                <h2>Liste der Chats:</h2>

                {Listing.length > 0 ? (
                    <Box sx={{ width: {lg: '50%', md: '60%', sm: '80%'}, margin: '0 auto'}} >
                        <Grid item container spacing={2} justifyContent="center">
                            {Listing}
                        </Grid>
                    </Box>
                ) : (
                    <p>Du hast keine offenen Chats...</p>
                )}
            </div>
        )
    }

}

export default ChatProfileBoxList