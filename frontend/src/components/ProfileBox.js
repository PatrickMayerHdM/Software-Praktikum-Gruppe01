import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Item from "../theme";
import {Link} from "react-router-dom";
import Profile from "./Profile";
import DatingSiteAPI from "../api/DatingSiteAPI";

/**
 * Dies stellt einen React Klassenkomponenten dar, welcher eine Kurzansicht eines Profils einer anderen Person ist.
 * Diese Ansicht eines anderen Profils kann dann beispielsweise innerhalb der Suchergebnisse genutzt werden.
 */

class ProfileBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profileBox_id: this.props.other_profile,
        }
    }

    componentDidMount() {
        DatingSiteAPI.getAPI()
            .getInfoObjects(this.state.profileBox_id)
            .then((responseInfoObjects) => {
          const selectedProperties = {};

          for (const key in responseInfoObjects) {
            if (responseInfoObjects.hasOwnProperty(key)) {
              const infoObject = responseInfoObjects[key];
              const charId = infoObject.char_id;
              const charValue = infoObject.char_value;

              switch (charId) {
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

                default:
                  break;
              }
            }
          }
          this.setState(selectedProperties);
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
        } = this.state;

        return(
            <Box sx={{width: '100%'}} >
                {/** Dies ist die Box, in welcher schlussendlich sich das Grid befindet */}
              <Link to={`/Profile/${this.state.profileBox_id}`}>
                  <Grid container spacing={1}>
                      {/** Das Grid an sich */}
                    <Grid item lg={12} md={12} xs={12} >
                        {/** Ein Item für das Grid, hier der Vorname*/}
                      <Item style={{ textDecoration: 'none' }}>
                          Name: {firstName}
                      </Item>
                    </Grid >
                      {/** Ein Item für das Grid, hier der Nachname */}
                    <Grid item lg={12} md={12} xs={12} >
                      <Item style={{ textDecoration: 'none' }}>
                          Nachname: {lastName}
                      </Item >
                    </Grid >
                      {/** Ein Item für das Grid, hier das Alter*/}
                    <Grid item lg={3} md={3} xs={3} >
                      <Item style={{ textDecoration: 'none' }}>
                          Alter: {age}
                      </Item >
                    </Grid >
                      {/** Ein Item für das Grid, hier das Geschlecht */}
                    <Grid item lg={6} md={6} xs={5} >
                      <Item style={{ textDecoration: 'none' }}>
                          Geschlecht: {gender}
                      </Item >
                    </Grid >
                      {/** Ein Item für das Grid, hier die Größe*/}
                    <Grid item lg={3} md={3} xs={4} >
                      <Item style={{ textDecoration: 'none' }}>
                          Größe: {height}
                      </Item >
                    </Grid >
                  </Grid >
              </Link>
            </Box >
        )
    }
}

export default ProfileBox