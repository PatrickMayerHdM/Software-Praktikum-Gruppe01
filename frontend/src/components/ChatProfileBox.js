import Item from "../theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import ProfileBox from "./ProfileBox";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

class ChatProfileBox extends React.Component{

    render() {
            /** Funktion welche ausgeführt wird, wenn der Button "Von ChatListe Entfernen" gedrückt wird.
         * Bisher zu Testzwecken noch nicht weiter ausgeführt */
        function ChatDelClicked(){
            console.log("Hier führt es später zum Chat Fenster mit einer Person")
        }

        /** Die Profilbox an sich, speziell angepasst auf die Gegebenheiten zur Darstellung der ChatListe **/

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
                    <button onClick={ChatDelClicked} style={{ height: "100%", width: "100%" ,display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#2A9D8F", color:"#fff", cursor: "pointer", border: "solid", borderColor: '#BDC2BF'}}>
                        {/*<Link to="/ChatWindow/${ChatId}">*/}
                        {/*Hier muss der Chat dargestellt werden zwischen Current User (Ich) und dem des angezeigten Profils*/}
                            <ChatBubbleIcon/>
                        {/*</Link>*/}
                    </button>
                </Grid>

              </Grid >
            </Box >
            )
    }
}

export default ChatProfileBox