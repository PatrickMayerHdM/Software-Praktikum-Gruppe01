/** Die verschiedenen für Profile.js benötigten Imports*/
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Item from "../../theme";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import DatingSiteAPI from "../../api/DatingSiteAPI";
import OptionsOtherProfile from "./OptionsOtherProfile";

{/** Dies soll ein Profil darstellen. Einerseits das eigene und andererseits ein anderes mögliches Profil, welches
 sich ein User anschaut. Hierbei werden nur die Profildaten dargestellt und keine weiteren Daten, welche ein User
 zum Bearbeiten oder zur Interaktion mit anderen Usern eventuell benötigt. Diese Funktionen sind bereits in
 anderen Komponenten integriert (OptionsOtherProfile.js).
 ,dies sollte einem User später angezeigt werden, wenn er ein anderes */}

/** Definition der Profile-Komponente */
class Profile extends React.Component{
    /** alle Zustandsvariablen: */
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            lastPartURL: null,
            customProperties: [],
        }
    }

    /** Beim Laden der Seite wird der folgende Code ausgeführt: */
    componentDidMount() {
        const currentPath = window.location.pathname;
        const lastPartURL = currentPath.split('/').pop();
        /** Hier wird der letzte Teil der URL herauskopiert und in der Zustandsvariablen "lastPartURL" gespeichert. */
        this.setState({lastPartURL: lastPartURL}, () => {
            this.getSelectedProperties();
            /** Hier werden beim Laden der Seite die einzelnen InfoObjekte aufgerufen,
             * die mithilfe der LastPartURL abgefragt werden können. */
        })
    }

    /** Diese Funktion wird als "async" markiert, da wir auf den Abschluss des API-Aufrufs für die InfoObjekte warten müssen.
     * Zuerst wird ein leeres Objekt namens "customProperties" erstellt.
     * Jedes InfoObjekt, das eine CharID größer als 160 hat, wird zu diesem leeren Objekt hinzugefügt.
     * Die restlichen InfoObjekte werden mithilfe eines Zustands (State) gesetzt.
     * Dadurch können sie in der Funktion "render()" angezeigt und entsprechend ausgelesen werden.
     * Die Funktion "getCharNameByID" ermöglicht es uns,
     * anhand der entsprechenden GoogleID die richtigen InfoObjekte aus dem Backend zu erhalten.
     * Am Ende wird der Zustand des leeren "customProperties"-Objekts aktualisiert,
     * um daraus die individuellen Eigenschaften und InfoObjekte auslesen zu können. */
    async getSelectedProperties() {
        const customProperties = {};
        try {
            const responseInfoObjects = await DatingSiteAPI.getAPI().getInfoObjects(this.state.lastPartURL);
            for (const key in responseInfoObjects) {
                if (responseInfoObjects.hasOwnProperty(key)) {
                    const infoObject = responseInfoObjects[key];
                    const char_id = infoObject.char_id;
                    const charValue = infoObject.char_value;
                    if (char_id > 160) {
                        const char_name = await this.getCharNameByID(char_id);
                        customProperties[char_id] = {
                            char_id: char_id,
                            char_value: charValue,
                            char_name: char_name,
                        };
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
        } catch (error) {
            console.error("Fehler beim auslesen der InfoObjekte: ", error);
        }
    }
    /** Die Funktion "getCharNameByID" ruft den Namen einer Eigenschaft basierend auf der char_id ab.
     * Dabei wird die entsprechende API-Methode aufgerufen und der Name als Ergebnis zurückgegeben. */
    getCharNameByID(char_id) {
        return DatingSiteAPI.getAPI()
            .getCharName(char_id)
            .then((responseCharName) => {
                return responseCharName;
            })
    }
    /** render() sorgt für das Anzeigen im Webbrowser */
    render() {
        {/** Hier werden die States der InfoObjekte gesetzt */}
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
            customProperties,

        } = this.state;

        {/** Es wird eine Konstante erstellt, die den LastPartURL mit der eigenen UID vergleicht.
         Wenn es sich dabei um das eigene Profil handelt, werden die Buttons unten nicht angezeigt.*/}
        const isOwnProfile = this.state.lastPartURL === this.props.user.uid;

        return (
            <div>
            <p></p>
                <Box sx={{ width: {md: '50%', sm: '60%'} , margin: '0 auto'}}>
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} sx={{ alignItems: 'stretch' }}>
                        {/** Item zum Anzeigen des Vornamens */}
                        <Item>
                            <Grid container direction="row" justifyContent="center" alignItems="strech">
                                <Grid item md={4} xs={7}>
                                    Vorname:
                                </Grid>
                                <Grid item md={8} xs={7}>
                                    <p>{customProperties.firstName}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        {/** Item zum Anzeigen des Nachnamens */}
                         <Item >
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid item md={4} xs={7}>
                                    Nachname:
                                </Grid>
                                <Grid item md={8} xs={7}>
                                    <p>{customProperties.lastName}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        {/** Item zum Anzeigen des Alters */}
                        <Item >
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid item md={4} xs={7}>
                                    Alter:
                                </Grid>
                                <Grid item md={8} xs={7}>
                                    <p>{customProperties.age}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        {/** Item zum Anzeigen des Geschlechts */}
                        <Item >
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid item md={4} xs={7}>
                                    Geschlecht:
                                </Grid>
                                <Grid item md={8} xs={7}>
                                    <p>{customProperties.gender}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        {/** Item zum Anzeigen der Größe, wenn sie vorhanden ist */}
                        {customProperties.height &&(
                        <Item>
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid item md={4} xs={7}>
                                    Körpergröße:
                                </Grid>
                                <Grid item md={8} xs={7}>
                                    <p>{customProperties.height}cm</p>
                                </Grid>
                            </Grid >
                        </Item>
                        )}
                        {/** Item zum Anzeigen der religiösen Ansicht, wenn sie vorhanden ist */}
                        {customProperties.religion && (
                        <Item >
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid item md={4} xs={7}>
                                    Religion:
                                </Grid>
                                <Grid item md={8} xs={7}>
                                    <p>{customProperties.religion}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        )}
                        {/** Item zum Anzeigen der Haarfarbe, wenn sie vorhanden ist */}
                        {customProperties.hair && (
                        <Item>
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid item md={4} xs={7}>
                                    Haarfarbe:
                                </Grid>
                                <Grid item md={8} xs={7}>
                                    <p>{customProperties.hair}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        )}
                        {/** Item zum Anzeigen des Raucherstatus, wenn sie vorhanden ist */}
                        {customProperties.smoking &&(
                        <Item>
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid item md={4} xs={7}>
                                    Raucher:
                                </Grid>
                                <Grid item md={8} xs={7}>
                                    <p>{customProperties.smoking}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        )}
                        {/** Item zum Anzeigen des Einkommens, wenn sie vorhanden ist */}
                        {customProperties.income &&(
                        <Item>
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid item md={4} xs={7}>
                                    Gehalt:
                                </Grid>
                                <Grid item md={8} xs={7}>
                                    <p>{customProperties.income}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        )}
                        {/** Item zum Anzeigen des Lieblingsvereins, wenn sie vorhanden ist */}
                        {customProperties.favclub &&(
                        <Item>
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid item md={4} xs={7}>
                                    Lieblingsverein:
                                </Grid>
                                <Grid item md={8} xs={7}>
                                    <p>{customProperties.favclub}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        )}
                        {/** Item zum Anzeigen der Hobbys, wenn sie vorhanden ist */}
                        {customProperties.hobby &&(
                        <Item>
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid item md={4} xs={7}>
                                    Hobbys:
                                </Grid>
                                <Grid item md={8} xs={7}>
                                    <p>{customProperties.hobby}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        )}
                        {/** Item zum Anzeigen der politischen Ausrichtung, wenn sie vorhanden ist */}
                        {customProperties.politicaltendency &&(
                        <Item>
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid item md={4} xs={7}>
                                    Politische Ausrichtung:
                                </Grid>
                                <Grid item md={8} xs={7}>
                                    <p>{customProperties.politicaltendency}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        )}
                        {/** Item zum Anzeigen des Info-Textes, wenn sie vorhanden ist */}
                        {customProperties.aboutme &&(
                        <Item>
                            <Grid container direction="row" justifyContent="center" alignItems="strech" >
                                <Grid item md={4} xs={7}>
                                    Über mich:
                                </Grid>
                                <Grid item md={8} xs={7}>
                                    <p>{customProperties.aboutme}</p>
                                </Grid>
                            </Grid >
                        </Item>
                        )}
                        {/** Item zum Anzeigen der individuellen Eigenschaften eines Useres, wenn sie vorhanden sind. */}
                        {/** In diesem Code wird zunächst überprüft, ob das Objekt "customProperties" nicht den Wert "null" hat.
                             Wenn das der Fall ist, erfolgt eine Iteration durch dieses Objekt. Es wird geprüft,
                             ob die Bedingungen erfüllt sind, dass das Objekt sowohl einen "char_name" als auch eine "char_id" besitzt.
                             Wenn diese Bedingungen erfüllt sind, wird ein "Item" erstellt
                             und der Eigenschaftsname zusammen mit dem entsprechenden InfoObjekt angezeigt.
                             Falls keine passenden Objekte vorhanden sind, wird "null" zurückgegeben, was bedeutet,
                             dass kein Element oder Item gerendert wird. */}
                        {customProperties !== null && Object.entries(customProperties).map(([key, value], index) => {
                            if (value !== null && typeof value === 'object' && value.hasOwnProperty('char_id') && value.hasOwnProperty('char_name')) {
                                return (
                                    <Item key={index}>
                                        <Grid container direction="row" justifyContent="center" alignItems="stretch">
                                            <Grid item md={4} xs={7}>
                                                {value.char_name[0]}
                                            </Grid>
                                            <Grid item md={4} xs={7}>
                                                <p>{value.char_value}</p>
                                            </Grid>
                                        </Grid>
                                    </Item>
                                );
                            }
                            return null;
                        })}
                        {/** Item zum Anzeigen der Buttons, wenn es sich um ein anderes Profil handelt */}
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