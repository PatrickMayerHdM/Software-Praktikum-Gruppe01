import Item from "../theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ChatProfileBox from "./ChatProfileBox";
import React from "react";

/**
 * Dies ist eine  Seite, zum darstellen mehrerer ChatProfileBox innerhalb eines weiteren Grids.
 * Damit dies dann nicht mehr innerhalb der App.js geschehen muss und die App.js dadurch übersichtlicher bleibt.
 */

class ChatProfileBoxList extends React.Component{

    render() {

        // const für die Anzahl der anzuzeigenden Profile innerhalb der ChatListe
        const count = 3;

        // Methode zur Darstellung einer ChatProfileBox
        const Listing = Array(count).fill(null).map((item, index) => (
            <Grid item xs={12} >
                <Item>
                    <ChatProfileBox/>
                </Item >
            </Grid >
        ));


        return (
            <div>
                <h2>Liste der Chats:</h2>

                <Box sx={{ width: {lg: '50%', md: '60%', sm: '80%'},  margin: '0 auto'}} >
                  <Grid item container spacing={2}
                    justifyContent="center">
                      {Listing}
                  </Grid >
                </Box >

            </div>


        )
    }

}

export default ChatProfileBoxList