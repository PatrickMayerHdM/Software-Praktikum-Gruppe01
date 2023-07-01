import Item from "../../theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import ProfileBox from "./ProfileBox";
import DatingSiteAPI from "../../api/DatingSiteAPI";

/**
 * Dies ist eine Liste, welche Anpassbar ist und mit Profilboxen gefüllt werden kann.*
 * Zu Testzwecken, soll erstmal erreicht werden, dass eine vorher festgelegte Anzahl an Profilen angezeigt werden kann.
 */
/** Definition der ProfileBoxList-Komponente */
class ProfileBoxList extends React.Component {
    /** alle Zustandsvariablen: */
    constructor(props) {
        super(props);
        this.state = {
            numProfiles: 0,
            profiles: [],
            otherProfileIndex: null
        }
    }
    /** Diese Methode wird aufgerufen, wenn das Komponente montiert (gerendert) wird.
     * Sie ruft die DatingSiteAPI auf, um das Profil anhand der Benutzer-ID abzurufen.
     * Das erhaltene Profil wird der state-Variable 'profiles' hinzugefügt und die Anzahl der Profile aktualisiert.
     * Falls ein Fehler beim Abrufen der Daten auftritt, wird eine Fehlermeldung in der Konsole ausgegeben.
     */
    componentDidMount() {
        DatingSiteAPI.getAPI()
            .getProfileByID(this.props.user.uid)
            .then(profilesvar => {
                const lengthProfiles = this.state.profiles.length;
                this.setState(prevState => ({
                    profiles: [...prevState.profiles, ...profilesvar],
                    numProfiles: lengthProfiles
                }));
            })
            .catch(error => {
                console.error('Error fetching data from API:', error);
            });
    }
    /** Diese Methode wird aufgerufen, wenn auf ein Profil geklickt wird.
     * Sie aktualisiert den Zustand (state) der Komponente, um den Index des ausgewählten Profils zu speichern.
     * Dadurch wird die Darstellung des Profils auf der Benutzeroberfläche aktualisiert.
     */
    handleProfileClick = (index) => {
        this.setState({ otherProfileIndex: index});
    };
    /** render() sorgt für das Anzeigen im Webbrowser */
    render() {
        {/** Hier werden die aktuellen States gesetzt */}
        const count = this.state.numProfiles;
        const current_profile = this.props.user.uid;
        {/** Es wird eine Variable "Listing" erstellt, die eine Liste von ProfileBox-Komponenten repräsentiert.
            Die Anzahl der Profile wird durch die Variable "count" bestimmt.
            Jede ProfileBox-Komponente enthält ein aktuelles Profil,
            ein anderes Profil aus dem "profiles"-Array und eine Funktion für den Klick auf die ProfileBox.
         */}
        const Listing = Array(count).fill(null).map((item, index) => (
            <Grid item xs={12} key={index}>
                <Item>
                    <ProfileBox
                        current_profile={current_profile}
                        other_profile={this.state.profiles[index]}
                        onClick={() => this.handleProfileClick(index)}/>
                </Item >
            </Grid >
        ));
        {/** Diese Funktion gibt eine zentrierte Box zurück, die unterschiedlich viele ProfilBox-Komponenten enthält.
             Die ProfileBox-Komponenten werden durch die Variable "Listing" dargestellt. */}
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