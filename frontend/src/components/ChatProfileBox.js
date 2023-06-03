import Item from "../theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import ProfileBox from "./ProfileBox";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import {Link} from "react-router-dom";
import chatBO from "../api/ChatBO";

class ChatProfileBox extends React.Component{

    render() {
        function newChat(){
                console.log("Neues Chat-Fenster von eigenem Profil XY mit dem Profil XY.")
        }

        const { eigeneID, andereID } = this.props;

        return(
            <Box sx={{ flexGrow: 1 }}>
              <Grid container
                direction="row" justifyContent="center" alignItems="stretch" container>
                <Grid item xs={10} spacing={2} >
                  <Item>
                      <ProfileBox/>
                  </Item >
                </Grid >
                    <Grid item item xs={2} >
                    {/*<Link to={`/ChatWindow/${eigeneID}/${andereID}`}>*/}
                        <button onClick={newChat} style={{ height: "100%", width: "100%" ,display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#2A9D8F", color:"#fff", cursor: "pointer", border: "solid", borderColor: '#BDC2BF'}}>
                            {/*Hier muss der Chat dargestellt werden zwischen Current User (Ich) und dem des angezeigten Profils*/}
                            <ChatBubbleIcon/>
                        </button>
                    {/*</Link>*/}
                    </Grid>
              </Grid >
            </Box >
            )
    }
}

export default ChatProfileBox