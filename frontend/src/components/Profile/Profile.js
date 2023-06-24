/** Die verschiedenen für Profile.js benötigten Imports*/
import * as React from 'react';
import Grid from '@mui/material/Grid'; // Grid version 1
import Item from "../../theme";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
import {Button} from "@mui/material";
import DatingSiteAPI from "../../api/DatingSiteAPI";
import OptionsOtherProfile from "./OptionsOtherProfile";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BlockIcon from "@mui/icons-material/Block";
import CharacteristicBO from "../../api/CharacteristicBO";


//** Dies soll ein Profil darstellen. Einerseits das eigene und andererseits ein anderes mögliches Profil, welches
// sich ein User anschaut. Hierbei werden nur die Profildaten dargestellt und keine weiteren Daten, welche ein User
// zum Bearbeiten oder zur Interaktion mit anderen Usern eventuell benötigt. Diese Funktionen sind bereits in
// anderen Komponenten integriert (OptionsOtherProfile.js bzw. OptionsOwnProfile.js).
// , dies sollte einem User später angezeigt werden, wenn er ein anderes */

class Profile extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            lastPartURL: null,
        }
    }

    componentDidMount() {
        const currentPath = window.location.pathname;
        // Letzte Teil der URL wird gepoppt, un in const lastPartURL gespeichert
        const lastPartURL = currentPath.split('/').pop();
        this.setState({lastPartURL: lastPartURL}, () => {
            this.getSelectedProperties();
        })
    }


    getSelectedProperties() {
        const idList = [];
        DatingSiteAPI.getAPI()
        .getInfoObjects(this.state.lastPartURL)
        .then((responseInfoObjects) => {
          console.log("InfoObjects: ", responseInfoObjects)
          const selectedProperties = {};

          for (const key in responseInfoObjects) {
            if (responseInfoObjects.hasOwnProperty(key)) {
              const infoObject = responseInfoObjects[key];
              const char_id = infoObject.char_id;
              const charValue = infoObject.char_value;

              if (char_id > 160) {
                  idList.push(char_id);
              } switch (char_id) {
                  case 30:
                  selectedProperties.age = charValue;
                  break;
                case 10:
                  selectedProperties.firstName = charValue;
                  break;
                case 40:
                  selectedProperties.gender = charValue;
                  break;
                case 70:
                  selectedProperties.hair = charValue;
                  break;
                case 50:
                  selectedProperties.height = charValue;
                  break;
                case 20:
                  selectedProperties.lastName = charValue;
                  break;
                case 60:
                  selectedProperties.religion = charValue;
                  break;
                case 80:
                  selectedProperties.smoking = charValue;
                  break;
                case 90:
                  selectedProperties.aboutme = charValue;
                  break;
                case 120:
                  selectedProperties.income = charValue;
                  break;
                case 130:
                  selectedProperties.educationalstatuts = charValue;
                  break;
                case 140:
                  selectedProperties.favclub = charValue;
                  break;
                case 150:
                  selectedProperties.hobby = charValue;
                  break;
                case 160:
                  selectedProperties.politicaltendency = charValue;
                  break;

                default:
                  break;
              }
            }
          }
          this.setState(selectedProperties);
          console.log("Char ID Liste: ", idList)
          idList.forEach((char_id) => {
            const char = this.getCharNameByID(char_id)
            console.log("CharBO: ", char)
          })
        });
    }

    getCharNameByID(char_id) {
        DatingSiteAPI.getAPI()
            .getCharName(char_id)
            .then((responeCharNames) => {
                console.log("CharName Test: ", responeCharNames)
            })
    }




    render() {

        const {
            age,
            lastName,
            firstName,
            gender,
            hair,
            height,
            religion,
            smoking,
            income,
            favclub,
            hobby,
            politicaltendency,
            educationalstatus,
            aboutme,
        } = this.state;

        const isOwnProfile = this.state.lastPartURL === this.props.user.uid;

        return (
            <div>
             <p></p>
                <Box sx={{ width: {md: '50%', sm: '60%'} , margin: '0 auto'}}>
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} sx={{ alignItems: 'stretch' }}>
                        <Item>
                            <Grid container direction="row" justifyContent="center" alignItems="strech">
                                <Grid md={4} xs={7} spacing={3}>
                                    Vorname:
                                </Grid>
                                <Grid md={8} xs={7} spacing={3}>
                                    <p>{firstName}</p>
                                </Grid>
                            </Grid >
                        </Item>
                         <Item >
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid md={4} xs={7} spacing={2}>
                                    Nachname:
                                </Grid>
                                <Grid md={8} xs={7} spacing={2}>
                                    <p>{lastName}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        <Item >
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid md={4} xs={7} spacing={2}>
                                    Alter:
                                </Grid>
                                <Grid md={8} xs={7} spacing={2}>
                                    <p>{age}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        <Item >
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid md={4} xs={7} spacing={2}>
                                    Geschlecht:
                                </Grid>
                                <Grid md={8} xs={7} spacing={2}>
                                    <p>{gender}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        {height &&(
                        <Item>
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid md={4} xs={7} spacing={2}>
                                    Körpergröße:
                                </Grid>
                                <Grid md={8} xs={7} spacing={2}>
                                    <p>{height}cm</p>
                                </Grid>
                            </Grid >
                        </Item>
                        )}
                        {religion && (
                        <Item >
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid md={4} xs={7} spacing={2}>
                                    Religion:
                                </Grid>
                                <Grid md={8} xs={7} spacing={2}>
                                    <p>{religion}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        )}
                        {hair && (
                        <Item>
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid md={4} xs={7} spacing={2}>
                                    Haarfarbe:
                                </Grid>
                                <Grid md={8} xs={7} spacing={2}>
                                    <p>{hair}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        )}
                        {smoking &&(
                        <Item>
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid md={4} xs={7} spacing={2}>
                                    Raucher:
                                </Grid>
                                <Grid md={8} xs={7} spacing={2}>
                                    <p>{smoking}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        )}
                        {income &&(
                        <Item>
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid md={4} xs={7} spacing={2}>
                                    Gehalt:
                                </Grid>
                                <Grid md={8} xs={7} spacing={2}>
                                    <p>{income}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        )}
                        {educationalstatus &&(
                        <Item>
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid md={4} xs={7} spacing={2}>
                                    Bildungsstatus:
                                </Grid>
                                <Grid md={8} xs={7} spacing={2}>
                                    <p>{educationalstatus}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        )}
                        {favclub &&(
                        <Item>
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid md={4} xs={7} spacing={2}>
                                    Lieblingsverein:
                                </Grid>
                                <Grid md={8} xs={7} spacing={2}>
                                    <p>{favclub}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        )}
                        {hobby &&(
                        <Item>
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid md={4} xs={7} spacing={2}>
                                    Hobbys:
                                </Grid>
                                <Grid md={8} xs={7} spacing={2}>
                                    <p>{hobby}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        )}
                        {politicaltendency &&(
                        <Item>
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid md={4} xs={7} spacing={2}>
                                    Politische Ausrichtung:
                                </Grid>
                                <Grid md={8} xs={7} spacing={2}>
                                    <p>{politicaltendency}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        )}
                        {aboutme &&(
                        <Item>
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid md={4} xs={7} spacing={2}>
                                    Das macht mich aus:
                                </Grid>
                                <Grid md={8} xs={7} spacing={2}>
                                    <p>{aboutme}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        )}
                        {!isOwnProfile && (
                        <OptionsOtherProfile other_profile={this.state.lastPartURL} user={this.props.user}/>
                        )}
                    </Stack>
                </Box>
            </div>
        )
    }
}



export default Profile