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
import DatingSiteAPI from "../api/DatingSiteAPI";


//** Dies soll ein Profil darstellen. Einerseits das eigene und andererseits ein anderes mögliches Profil, welches
// sich ein User anschaut. Hierbei werden nur die Profildaten dargestellt und keine weiteren Daten, welche ein User
// zum Bearbeiten oder zur Interaktion mit anderen Usern eventuell benötigt. Diese Funktionen sind bereits in
// anderen Komponenten integriert (OptionsOtherProfile.js bzw. OptionsOwnProfile.js).
// , dies sollte einem User später angezeigt werden, wenn er ein anderes */

class Profile extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            own_profil_id: this.props.user.uid,
            profil_info_list: [],
            error: '',
        }


    }

    componentDidMount() {
        this.getAllProfilInfoObjects();
    }

    getAllProfilInfoObjects() {
        const { own_profil_id } = this.state;
        DatingSiteAPI.getAPI()
            .getInfoObjects(own_profil_id)
            .then((infoobjectBOs) =>
                this.setState({
                    profil_info_list: infoobjectBOs,
                }, () => {
                    console.log(this.state.profil_info_list)
                }),
            )
            .catch((e) =>
                this.setState({
                    profil_info_list,
                    error: e,
                })
            );
    }


    render() {

        const { profil_info_list } = this.state

        return (
            <div>
             <p></p>
                {profil_info_list.map((infos) =>

                <Box sx={{ width: {md: '50%', sm: '60%'} , margin: '0 auto'}}>
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} sx={{ alignItems: 'stretch' }}>
                        <Item>
                            <Grid container direction="row" justifyContent="center" alignItems="strech">
                                <Grid md={4} xs={7} spacing={3}>
                                    Vorname:
                                </Grid>
                                <Grid md={8} xs={7} spacing={3}>
                                    <p>{infos.get_first_name()}</p>
                                </Grid>

                            </Grid >
                        </Item>
                         <Item >
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid md={4} xs={7} spacing={2}>
                                    Nachname:
                                </Grid>
                                <Grid md={8} xs={7} spacing={2}>
                                    <p>{infos.get_last_name()}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        <Item >
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid md={4} xs={7} spacing={2}>
                                    Alter:
                                </Grid>
                                <Grid md={8} xs={7} spacing={2}>
                                    <p>{infos.get_age()}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        <Item >
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid md={4} xs={7} spacing={2}>
                                    Geschlecht:
                                </Grid>
                                <Grid md={8} xs={7} spacing={2}>
                                    <p>{infos.get_gender()}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        <Item>
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid md={4} xs={7} spacing={2}>
                                    Körpergröße:
                                </Grid>
                                <Grid md={8} xs={7} spacing={2}>
                                    <p>{infos.get_height()}cm</p>
                                </Grid>
                            </Grid >
                        </Item>
                        <Item >
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid md={4} xs={7} spacing={2}>
                                    Religion:
                                </Grid>
                                <Grid md={8} xs={7} spacing={2}>
                                    <p>{infos.get_religion()}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        <Item>
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid md={4} xs={7} spacing={2}>
                                    Haarfarbe:
                                </Grid>
                                <Grid md={8} xs={7} spacing={2}>
                                    <p>{infos.get_hair()}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        <Item>
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid md={4} xs={7} spacing={2}>
                                    Raucher:
                                </Grid>
                                <Grid md={8} xs={7} spacing={2}>
                                    <p>{infos.get_smoking_status()}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        <Item>
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid md={4} xs={7} spacing={2}>
                                    Freitext:
                                </Grid>
                                <Grid md={8} xs={12} spacing={2}>
                                    {/** Hier kommen dann die dynamsichen Eigenschaften hinzu. */}
                                </Grid>
                            </Grid >
                        </Item>
                    </Stack>
                </Box>
                )}
            </div>
        )
    }
}



export default Profile