/** Die verschiedenen für Profile.js benötigten Imports*/
import * as React from 'react';
import Grid from '@mui/material/Grid'; // Grid version 1
import Item from "../theme";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
import {Button} from "@mui/material";


//** Dies soll ein Profil darstellen. Einerseits das eigene und andererseits ein anderes mögliches Profil, welches
// sich ein User anschaut. Hierbei werden nur die Profildaten dargestellt und keine weiteren Daten, welche ein User
// zum Bearbeiten oder zur Interaktion mit anderen Usern eventuell benötigt. Diese Funktionen sind bereits in
// anderen Komponenten integriert (OptionsOtherProfile.js bzw. OptionsOwnProfile.js).
// , dies sollte einem User später angezeigt werden, wenn er ein anderes */

class Profile extends React.Component{


    render() {
        return(
            <Box sx={{ width: {md: '50%', sm: '60%'} , margin: '0 auto'}}>
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} sx={{ alignItems: 'stretch' }}>
                    <Item >
                        <Grid container direction="row" justifyContent="center" alignItems="strech" >
                            <Grid md={4} xs={7} spacing={3}>
                                Patrick
                            </Grid>
                            <Grid md={4} xs={7} spacing={3}>
                                Mayer
                            </Grid>

                        </Grid >
                    </Item>
                    <Item >
                        <Grid container direction="row" justifyContent="center" alignItems="strech" >
                            <Grid md={4} xs={7} spacing={2}>
                                Alter:
                            </Grid>
                            <Grid md={4} xs={7} spacing={2}>
                                20
                            </Grid>
                        </Grid >
                    </Item>
                    <Item >
                        <Grid container direction="row" justifyContent="center" alignItems="strech" >
                            <Grid md={4} xs={7} spacing={2}>
                                Geschlecht:
                            </Grid>
                            <Grid md={4} xs={7} spacing={2}>
                                Männlich
                            </Grid>
                        </Grid >
                    </Item>
                    <Item>
                        <Grid container direction="row" justifyContent="center" alignItems="strech" >
                            <Grid md={4} xs={7} spacing={2}>
                                Körpergröße:
                            </Grid>
                            <Grid md={4} xs={7} spacing={2}>
                                181 cm
                            </Grid>
                        </Grid >
                    </Item>
                    <Item >
                        <Grid container direction="row" justifyContent="center" alignItems="strech" >
                            <Grid md={4} xs={7} spacing={2}>
                                Religion:
                            </Grid>
                            <Grid md={4} xs={7} spacing={2}>
                                Atheist
                            </Grid>
                        </Grid >
                    </Item>
                    <Item>
                        <Grid container direction="row" justifyContent="center" alignItems="strech" >
                            <Grid md={4} xs={7} spacing={2}>
                                Haarfarbe:
                            </Grid>
                            <Grid md={4} xs={7} spacing={2}>
                                Blond
                            </Grid>
                        </Grid >
                    </Item>
                    <Item>
                        <Grid container direction="row" justifyContent="center" alignItems="strech" >
                            <Grid md={4} xs={7} spacing={2}>
                                Raucher:
                            </Grid>
                            <Grid md={4} xs={7} spacing={2}>
                                Nein
                            </Grid>
                        </Grid >
                    </Item>
                    <Item>
                        <Grid container direction="row" justifyContent="center" alignItems="strech" >
                            <Grid md={4} xs={7} spacing={2}>
                                Freitext:
                            </Grid>
                            <Grid md={8} xs={12} spacing={2}>
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                                invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                                accusam et justo duo dolores
                            </Grid>
                        </Grid >
                    </Item>
                </Stack>
            </Box>
        )
    }
}


function Profilep() {


}

export default Profile