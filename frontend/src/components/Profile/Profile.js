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
import {forEach} from "react-bootstrap/ElementChildren";


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
            customProperties: [],
        }
    }

    componentDidMount() {
        const currentPath = window.location.pathname;
        // Letzte Teil der URL wird gepoppt, un in const lastPartURL gespeichert
        const lastPartURL = currentPath.split('/').pop();
        this.setState({lastPartURL: lastPartURL}, () => {
            this.getSelectedProperties();
            this.getCustomPropertyNames();
        })
    }


    getSelectedProperties() {
        const idList = [];
        const customProperties = [];

        DatingSiteAPI.getAPI()
        .getInfoObjects(this.state.lastPartURL)
        .then((responseInfoObjects) => {
            console.log("InfoObjects: ", responseInfoObjects)

            for (const key in responseInfoObjects) {
                if (responseInfoObjects.hasOwnProperty(key)) {
                    const infoObject = responseInfoObjects[key];
                    const char_id = infoObject.char_id;
                    const charValue = infoObject.char_value;

                    if (char_id > 160) {
                        customProperties.push({
                            char_id: char_id,
                            char_value: charValue,
                        });
                        idList.push(char_id);
                    } else {
                        switch (char_id) {
                            case 30:
                                customProperties.age = charValue;
                                break;
                            case 10:
                                customProperties.firstName = charValue;
                                break;
                            case 40:
                                customProperties.gender = charValue;
                                break;
                            case 70:
                                customProperties.hair = charValue;
                                break;
                            case 50:
                                customProperties.height = charValue;
                                break;
                            case 20:
                                customProperties.lastName = charValue;
                                break;
                            case 60:
                                customProperties.religion = charValue;
                                break;
                            case 80:
                                customProperties.smoking = charValue;
                                break;
                            case 90:
                                customProperties.aboutme = charValue;
                                break;
                            case 120:
                                customProperties.income = charValue;
                                break;
                            case 140:
                                customProperties.favclub = charValue;
                                break;
                            case 150:
                                customProperties.hobby = charValue;
                                break;
                            case 160:
                                customProperties.politicaltendency = charValue;
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
            this.setState({ customProperties });
            console.log("Char ID Liste: ", idList)
            idList.forEach((char_id) => {
                console.log("CharBO: ", idList)
            })
        });
    }

    // getCharNameByID(char_id) {
    //     return DatingSiteAPI.getAPI()
    //         .getCharName(char_id)
    //         .then((responeCharNames) => {
    //             console.log("CharName GET: ", responeCharNames)
    //             return responeCharNames;
    //         })
    // }

    getCustomPropertyNames() {
      const { customProperties } = this.state;

      const charNamePromises = customProperties.map((property) =>
        DatingSiteAPI.getAPI().getCharName(property.char_id)
      );

      Promise.all(charNamePromises)
        .then((charNames) => {
          const updatedProperties = customProperties.map((property, index) => ({
            ...property,
            char_name: charNames[index],
          }));


          this.setState({ customProperties: updatedProperties });
          console.log("CharNames: ", customProperties)
        })
        .catch((error) => {
          console.error("Error getting custom property names:", error);
        });
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
            customProperties,

        } = this.state;

        const isOwnProfile = this.state.lastPartURL === this.props.user.uid;

         const customPropertyItems = customProperties.map((property) => (
                <Item>
                  <Grid container direction="row" justifyContent="center" alignItems="stretch">
                    <Grid item md={4} xs={7} spacing={2}>
                      {property.char_name}:
                    </Grid>
                    <Grid item md={4} xs={7} spacing={2}>
                      <p>{property.char_value}</p>
                    </Grid>
                  </Grid>
                </Item>
              ));

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
                                    <p>{customProperties.firstName}</p>
                                </Grid>
                            </Grid >
                        </Item>
                         <Item >
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid md={4} xs={7} spacing={2}>
                                    Nachname:
                                </Grid>
                                <Grid md={8} xs={7} spacing={2}>
                                    <p>{customProperties.lastName}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        <Item >
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid md={4} xs={7} spacing={2}>
                                    Alter:
                                </Grid>
                                <Grid md={8} xs={7} spacing={2}>
                                    <p>{customProperties.age}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        <Item >
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid md={4} xs={7} spacing={2}>
                                    Geschlecht:
                                </Grid>
                                <Grid md={8} xs={7} spacing={2}>
                                    <p>{customProperties.gender}</p>
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
                                    <p>{customProperties.height}cm</p>
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
                                    <p>{customProperties.religion}</p>
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
                                    <p>{customProperties.hair}</p>
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
                                    <p>{customProperties.smoking}</p>
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
                                    <p>{customProperties.income}</p>
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
                                    <p>{customProperties.favclub}</p>
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
                                    <p>{customProperties.hobby}</p>
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
                                    <p>{customProperties.politicaltendency}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        )}
                        {customPropertyItems}
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