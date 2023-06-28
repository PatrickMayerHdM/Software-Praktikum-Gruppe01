import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Item from "../../theme";
import {Link} from "react-router-dom";
import DatingSiteAPI from "../../api/DatingSiteAPI";
import {Button} from "@mui/material";
import profilevisitsBO from "../../api/ProfilevisitsBO";

/**
 * Dies stellt einen React Klassenkomponenten dar, welcher eine Kurzansicht eines Profils einer anderen Person ist.
 * Diese Ansicht eines anderen Profils kann dann beispielsweise innerhalb der Suchergebnisse genutzt werden.
 */

/** Definition der ProfileBox-Komponente */

class ProfileBox extends React.Component {

    /** alle Zustandsvariablen: */
    constructor(props) {
        super(props);
        this.state = {
            profileBox_id: this.props.other_profile,
            ownprofile_id: this.props.ownprofile_id,
        }
        this.onProfileClick = this.onProfileClick.bind(this)
    }

    /** Diese Funktion wird aufgerufen, wenn auf ein Profil geklickt wird.
     * Sie fügt einen neuen Profilbesuch hinzu, indem sie die entsprechende API-Methode aufruft.
     * Wenn dabei ein Fehler auftritt, wird dieser im Zustand der Komponente gespeichert.*/
    onProfileClick(){
        const newvisit = new profilevisitsBO(null, this.state.ownprofile_id , this.state.profileBox_id)
        DatingSiteAPI.getAPI()
            .addprofilevisits(newvisit)
            .catch((e) =>
                this.setState({
                    error: e,
                })
            )
    }

    /** Wenn diese Box geladen wird, werden mithilfe eines API-Aufrufs die InfoObjekte des jeweiligen Profils abgerufen.
     * Dabei sind nur der vollständige Name, das Alter, die Größe und das Geschlecht erforderlich.
     * Es wird ein leeres Objekt namens "selectedProperties" erstellt. Anschließend wird mithilfe einer for-Schleife durch die "responseInfoObjects"
     * iteriert und dabei werden die entsprechenden Zustände gesetzt, um die Daten zu speichern. */
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

    /** render() sorgt für das Anzeigen im Webbrowser */
    render() {

        {/** Hier werden die States der InfoObjekte gesetzt */}
        const {
            age,
            lastName,
            firstName,
            gender,
            height,
        } = this.state;

        return(
            <Box sx={{width: '100%'}} >
                {/** Dies ist die Box, in welcher sich das Grid befindet */}
                <Button onClick={this.onProfileClick} >
                    <Link to={`/Profile/${this.state.profileBox_id}`} style={{ textDecoration: 'none', fontFamily: 'Arial, sans-serif' }}>
                        <Grid container spacing={1}>
                            {/** Das Grid an sich */}
                            <Grid item lg={12} md={12} xs={12} >
                                {/** Ein Item für das Grid, hier der Vorname*/}
                                <Item >
                                    Name: {firstName}
                                </Item>
                            </Grid >
                            {/** Ein Item für das Grid, hier der Nachname */}
                            <Grid item lg={12} md={12} xs={12} >
                                <Item>
                                    Nachname: {lastName}
                                </Item >
                            </Grid >
                            {/** Ein Item für das Grid, hier das Alter*/}
                            <Grid item lg={3} md={3} xs={3} >
                                <Item>
                                    Alter: {age}
                                </Item >
                            </Grid >
                            {/** Ein Item für das Grid, hier das Geschlecht */}
                            <Grid item lg={6} md={6} xs={5} >
                                <Item>
                                    Geschlecht: {gender}
                                </Item >
                            </Grid >
                            {/** Ein Item für das Grid, hier die Größe*/}
                            <Grid item lg={3} md={3} xs={4} >
                                <Item>
                                    Größe: {height}
                                </Item >
                            </Grid >
                        </Grid >
                    </Link>
                </Button>
            </Box >
        )
    }
}

export default ProfileBox