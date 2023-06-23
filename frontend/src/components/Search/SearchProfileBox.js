import Item from "../../theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import ProfileBox from "../Profile/ProfileBox";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import {Link} from "react-router-dom";
import ChatWindow from "../../pages/ChatWindow";
import DatingSiteAPI from "../../api/DatingSiteAPI";

class SearchProfileBox extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            profile: this.props.Profilematchmaking[0], // Die google_id des Users der dargestellt werden soll
            SimValue: Math.round(this.props.Profilematchmaking[1]), // Das Ähnlichkeitsmaß des Users gerundet

            error: '',
        }
    }

    componentDidMount() {
        //console.log("(SearchProfileBox) Das ist der durch props übergebene Teil: ", this.props.Profilematchmaking)
        //console.log("(SearchProfileBox) State des profile: ", this.state.profile)
        //console.log("(SearchProfileBox) State des SimValue: ", this.state.SimValue)
    }


    render() {


        return(
            // Darstellung einer Profilbox
            <Box sx={{ flexGrow: 1 }}>
              <Grid container
                direction="row" justifyContent="center" alignItems="stretch" container>
                  <Grid item xs={10} spacing={2} >
                  <Item>
                      {/*Profilbox des anderen Profils*/}
                      <ProfileBox other_profile={this.state.profile} ownprofile_id={this.props.current_profile} />
                  </Item >
                  </Grid >

                  <Grid item item xs={2} >
                    {/*  Ähnlichkeitsmaß  */}
                    <div style={{ height: "100%", width: "100%" ,display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#30638E", color:"#fff"}}>
                        {this.state.SimValue}%
                    </div>
                  </Grid>
              </Grid >
            </Box >
            )
    }
}

export default SearchProfileBox