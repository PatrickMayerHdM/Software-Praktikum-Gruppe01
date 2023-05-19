import Item from "../theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BlockProfileBox from "./BlockProfileBox";
import React from "react";

/**
 * Dies ist eine  Seite, zum darstellen mehrerer BlockProfileBox innerhalb eines weiteren Grids.
 * Damit dies dann nicht mehr innerhalb der App.js geschehen muss und die App.js dadurch übersichtlicher bleibt.
 */

class BlockProfileBoxList extends React.Component{

    render() {

        // const für die Anzahl der anzuzeigenden Profile innerhalb der Merkliste
        const count = 3;

        // Methode zur Darstellung einer FavoriteProfileBox
        const Listing = Array(count).fill(null).map((item, index) => (
            <Grid item xs={12} >
                <Item>
                    <BlockProfileBox/>
                </Item >
            </Grid >
        ));


        return (
            <div>
                <h2>Liste der Kontaktsperre:</h2>

                <Box sx={{ width: {lg: '50%', md: '60%', sm: '80%'},  margin: '0 auto'}} >
                  <Grid container spacing={2}
                    justifyContent="center">
                      {Listing}
                  </Grid >
                </Box >

            </div>


        )
    }

}

export default BlockProfileBoxList