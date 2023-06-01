import Item from "../theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import ProfileBox from "./ProfileBox";


/**
 * Dies ist eine Liste, welche Anpassbar ist und mit Profilboxen gefüllt werden kann.
 *
 * Zu Testzwecken, soll erstmal erreicht werden, dass eine vorher festgelegte Anzahl an Profilen angezeigt werden kann.
 */

class ProfileBoxList extends React.Component {

    render() {

        // const für die Anzahl der anzuzeigenden Profile
        const count = 4;

        // Methode zum darstellen einer Profilbox
        const Listing = Array(count).fill(null).map((item, index) => (
            <Grid item xs={12} key={index}>
                <Item>
                    <ProfileBox/>
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