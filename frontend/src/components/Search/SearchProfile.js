import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Item from "../../theme";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";
import {Button, Fab, TextField} from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import "../Profile/Profile.css";
import SaveIcon from '@mui/icons-material/Save';
import searchprofileBO from '../../api/SearchprofileBO';
import infoobjectBO from "../../api/InfoObjectBO";
import DatingSiteAPI from "../../api/DatingSiteAPI";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import NamedInfoObjectBO from "../../api/NamedInfoObjectBO";

/**
 * Damit dem User beim Suchen passende Personen angezeigt werden, kann dieser Suchprofile erstellen, diese in Verbindung
 * mit den Profilen der anderen User legen dann auch das Ähnlichkeitsmaß fest.
 * Auf dieser Seite hat der User dann die Optionen, dass dieser die Suchprofile erstellen bzw. bearbeiten kann.
 * */

class SearchProfile extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            maxAge: null, // Wert welcher bei dem Submit des Suchprofils übergeben wird.
            minAge: null, // Wert welcher bei dem Submit des Suchprofils übergeben wird.
            height: null, // Wert welcher bei dem Submit des Suchprofils übergeben wird.
            gender: null, // Wert welcher bei dem Submit des Suchprofils übergeben wird.
            religion: null, // Wert welcher bei dem Submit des Suchprofils übergeben wird.
            hair: null, // Wert welcher bei dem Submit des Suchprofils übergeben wird.
            smoking: null, // Wert welcher bei dem Submit des Suchprofils übergeben wird.
            income: null, // Wert welcher bei dem Submit des Suchprofils übergeben wird.
            favclub: null, // Wert welcher bei dem Submit des Suchprofils übergeben wird.
            educationalstatuts: null, // Wert welcher bei dem Submit des Suchprofils übergeben wird.
            hobby: null, // Wert welcher bei dem Submit des Suchprofils übergeben wird.
            politicaltendency: null, // Wert welcher bei dem Submit des Suchprofils übergeben wird.
            aboutme: null, // Wert welcher bei dem Submit des Suchprofils übergeben wird.

            lastPartURL: null, // Letzer Teil der URL, dies wird benötigt, um herauszufinden, ob es sich um ein neues Suchprofil oder das Bearbeiten eines Suchprofils handelt.
            char_fk: 0,
            searchprofile_id: null,
            error: null,

            selectedOption: null, // Dies ist die vom User ausgewählte Option im Dropdown

            openuserchar: false, // Wird für die Eigenschaftsvorschläge genutzt.
            selectedCharNames: [], // Leeres Array, das mit den Auswahlvorschlägen (für Eigenschaften) gefüllt wird.
            selectedCharTyp: null, // Char_Typ einer Eigenschaft ("text" oder "selected")
            selectedCharId: null, // Char_ID der ausgewählten Eigenschaft
            selectedCharName: null, // Char_Name der ausgewählten Eigenschaft
            UserSelectStartingSelections: [], // Bereits erstellte Auswahlen

            customProperties: [], // Liste der eigenen Eigenschaften
            UserSelectSelectedOption: null, // Die vom User ausgewählte Auswahl
            UserUpdate: false, // True wenn es ein Update ist, False wenn es erstmalig angelegt wird.
            UserSelectNumOptions: null, // Anzahl der ausgewählten Infoobjekte
            UserSelectAvSelections: [], // Vom User zusätzlich erstellte Auswahlen
        };

        // Binding der Funktionen
        this.handleChangeGen = this.handleChangeGen.bind(this);
        this.handleChangeRel = this.handleChangeRel.bind(this);
        this.handleChangeSmo = this.handleChangeSmo.bind(this);
        this.handleChangeHair = this.handleChangeHair.bind(this);
        this.handleChangeHeight = this.handleChangeHeight.bind(this);
        this.handleChangeSelectedOption = this.handleChangeSelectedOption.bind(this);
        this.handleChangeSalary = this.handleChangeSalary.bind(this);
        this.handleChangeClub = this.handleChangeClub.bind(this);
        this.handleChangeHobbys = this.handleChangeHobbys.bind(this);
        this.handleChangePolitical = this.handleChangePolitical.bind(this);
        this.handleChangeInterests = this.handleChangeInterests.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);

        this.handleInfoSelectCreate = this.handleInfoSelectCreate.bind(this);
        this.handleDeleteReligion = this.handleDeleteReligion.bind(this);
        this.handleDeleteHair = this.handleDeleteHair.bind(this);
        this.handleDeletesmoking = this.handleDeletesmoking.bind(this);
        this.handleDeleteSalary = this.handleDeleteSalary.bind(this);
        this.handleDeleteClub = this.handleDeleteClub.bind(this);
        this.handleDeleteHobbys = this.handleDeleteHobbys.bind(this);
        this.handleDeletePolitical = this.handleDeletePolitical.bind(this);
        this.handleDeleteInterests = this.handleDeleteInterests.bind(this);
        this.handleDeleteHeight = this.handleDeleteHeight.bind(this);
        this.handleUserSelectNumOptions = this.handleUserSelectNumOptions.bind(this);
        this.handleUserSelectSaveInputsSelections = this.handleUserSelectSaveInputsSelections.bind(this);
        this.getSelectedPropertiesForCharValuesAndNameTwo = this.getSelectedPropertiesForCharValuesAndNameTwo.bind(this);
    }

    /**
     * Funktionen für Veränderungen an den Werten, welche ein Nutzer Auswählen kann.
     */

    /** Event-Handler für die Änderung des Geschlechts der gesuchten Person */
    handleChangeGen = (val) => {
        const selectedGender = val.target.value;
        this.setState({ gender: selectedGender});
    }

    /** Event-Handler für die Änderung der Religion der gesuchten Person */
    handleChangeRel = (val) => {
        const selectedReligion = val.target.value;
        this.setState({ religion: selectedReligion});
    }

    handleDeleteReligion = () => {
        this.setState({ religion: null });
    };

    /** Event-Handler für die Änderung bei dem Raucherstatus der gesuchten Person */
    handleChangeSmo = (val) => {
        const selectedSmoker = val.target.value;
        this.setState({ smoking: selectedSmoker });
    }

    handleDeletesmoking = () => {
        this.setState({ smoking: null });
    };

    /** Event-Handler für die Änderung an den Haaren der gesuchten Person */
    handleChangeHair = (val) => {
       const selectedHair = val.target.value;
        this.setState({ hair: selectedHair });
    };

    handleDeleteHair = () => {
        this.setState({ hair: null });
    };

    /** Event-Handler für die Änderung an der Körpergröße der gesuchten Person */
    handleChangeHeight = (val) => {
        const selectedHeight = val.target.value;
        this.setState({ height: selectedHeight });
    };

    handleDeleteHeight = () => {
        this.setState({ height: null });
    };

    /** Event-Handler für die Änderung des Alters der gesuchten Person */
     handleChangeAge = (event, value) => {
      const [minAge, maxAge] = value;
      this.setState({ minAge: minAge, maxAge: maxAge });
    }

    /** Event-Handler für die Änderung der politischen Ausrichtung */
    handleChangePolitical(event) {
        const newPolitical = event.target.value;
        this.setState({politicaltendency: newPolitical})
    };
    handleDeletePolitical = () => {
        this.setState({ politicaltendency: null });
    };

    /** Event-Handler für das Löschen eines Tags */
    handleChangeCharValueDeleteTag = (value, searchid) => {
        DatingSiteAPI.getAPI()
            .removeNamedCharTag(value, searchid)
    };

    /** Event-Handler für die Änderung des Hobbys der gesuchten Person */
    handleChangeHobbys(event) {
      const newHobbys = event.target.value;
      this.setState({hobby: newHobbys})
    };

    handleDeleteHobbys = () => {
        this.setState({ hobby: null });
    };


    /** Event-Handler für die Änderung den Lieblingsverein der gesuchten Person */
    handleChangeClub(event) {
      const newClub = event.target.value;
      this.setState({favclub: newClub})
    };

    handleDeleteClub = () => {
        this.setState({ favclub: null });
    };

    /** Event-Handler für die Änderung des Einkommens der gesuchten Person */
    handleChangeSalary(event) {
        const newSalary = event.target.value;
        this.setState({income: newSalary})
    };

    handleDeleteSalary = () => {
        this.setState({ income: null });
    };

    /** Event-Handler für die Änderung der Interessen der gesuchten Person */
    handleChangeInterests(event) {
        const newinterests = event.target.value;
        this.setState({aboutme: newinterests})
    };

    handleDeleteInterests = () => {
        this.setState({ aboutme: null });
    };

    /**
     * Diese Funktion wird ausgeführt, wenn ein User auf dem submit/ speichern Button von dem User gedrückt wird.
     * Hier wird einmal unterschieden, zwischen dem Fall bei dem ein User ein bestehendes Profil updaten will und dem
     * Fall, dass ein User ein neues Profil erstellt.
     */

    submit = (event) => {
        // Ermitteln, ob es sich um ein erstmaliges Anlegen eines Suchprofils handelt.
         if (this.state.lastPartURL === "new") {
             // Erstmaliges Anlegen eines Suchprofils
             event.preventDefault();
             const newSearchprofile = new searchprofileBO( this.props.user.uid);
             const newInfoObject = new infoobjectBO(
                 null,
                 this.state.char_fk,
                 null,
                 null,
                 null,
                 null,
                 this.state.gender,
                 this.state.hair,
                 this.state.height,
                 null,
                 this.state.religion,
                 this.state.smoking,
                 this.state.minAge,
                 this.state.maxAge,
                 null, // Hier wird die searchprofile_fk übergeben, diese wird jedoch nicht im front-End gesetzt daher null
                 this.state.income,
                 this.state.favclub,
                 this.state.hobby,
                 this.state.politicaltendency,
                 this.state.aboutme,
             )

             DatingSiteAPI.getAPI()
                 .addSearchProfile(newSearchprofile)
                 .catch((e) =>
                     this.setState({error: e,})
                 )

             DatingSiteAPI.getAPI()
                 .addSearchInfoObject(newInfoObject)
                 .catch((e) =>
                     this.setState({
                         error: e,
                     })
                 );

         } else {
             // Der Code zum Update eines Suchprofils
             event.preventDefault();
             const newSearchInfoObject = new infoobjectBO(
                 this.props.user.uid,
                 this.state.char_fk,
                 null,
                 parseInt(this.state.lastPartURL),
                 null,
                 null,
                 this.state.gender,
                 this.state.hair,
                 this.state.height,
                 null,
                 this.state.religion,
                 this.state.smoking,
                 this.state.minAge,
                 this.state.maxAge,
                 parseInt(this.state.lastPartURL),
                 this.state.income,
                 this.state.favclub,
                 this.state.hobby,
                 this.state.politicaltendency,
                 this.state.aboutme,
             )

             DatingSiteAPI.getAPI()
                 .updateSearchInfoObject(newSearchInfoObject)
                 .catch((e) =>
                     this.setState({
                         error: e,
                     })
                 );
         }
    };

    /** Event-Handler für die Änderung des openuserchars. Der openuserchars wird für das auslesen und hinzufügen von
     * Eigenschaten genutzt, die nicht vom System vorgegeben sind.
     * */
    handleOpenUserChar = () => {
        this.setState({ openuserchar: true })
    };

        /** Die getAllInfoObjects liest alle Chars aus,
     * die eine CharID größer als 160 haben und fügt es zur "selectedCharNames" hinzu.
     * Diese wird anschließend mit dem neuen state überschrieben. */
    getAllInfoObjects() {
        return DatingSiteAPI.getAPI()
            .getAllCharNames()
            .then((responseCharNames) => {
                const selectedCharNames = [];
                for (const key in responseCharNames) {
                    if (responseCharNames.hasOwnProperty(key)) {
                        const char_id = responseCharNames[key].id;
                        const char_name = responseCharNames[key].char_name;
                        const char_typ = responseCharNames[key].char_typ;
                        if (char_id > 160) {
                            selectedCharNames.push({ char_id, char_name, char_typ });
                        }
                    }
                }
                this.setState({ selectedCharNames });
                console.log("Liste: ", selectedCharNames);
            });
    }

       /** Event-Handler für die Änderung einer selectedOption */
    handleChangeSelectedProperty = (event) => {
        const { selectedCharNames } = this.state
        const selectedProperty = event.target.value;
        const selectedChar = selectedCharNames.find((char)=> char.char_id === selectedProperty);
        this.setState({
            selectedOption: selectedProperty,
            selectedCharTyp: selectedChar?.char_typ,
            selectedCharId: selectedChar?.char_id,
            selectedCharName: selectedChar?.char_name
        }, () => {
            this.getInfoObjectsByCharID(selectedProperty);
        });
    };

    /** Auslesen von InfoObjects anhand einer Char-Id */
    getInfoObjectsByCharID(char_id) {
        return DatingSiteAPI.getAPI()
            // get der InfoObjekte einer CharID
            .getInfoObjectsCharID(char_id)
            .then((responseCharName) => {
                console.log("responseCharName zu Beginn", responseCharName)
                let updatedUserSelectNumOptions = 0;
                const updatedUserSelectStartingSelections = [ ]; // erstellt ein leeres Array, um es zu ersetzen
                const UserData = this.state.customProperties[char_id]?.char_value; // Wenn ein User bereits etwas zu dieser Eigenschaft ausgewählt hat, wird es hier gesetzt

                // hier wird die Länge der Antwort geprüft.
                if (responseCharName.length > 1){
                    responseCharName.forEach(element => {
                        // Jedes Element wird der Liste hinzugeüft.
                        updatedUserSelectStartingSelections.push(element.char_value)
                    });
                    // setzt die Länge der Antwort.
                    updatedUserSelectNumOptions = responseCharName.length;
                } else {
                    updatedUserSelectStartingSelections.push(responseCharName[0].char_value);
                    // Wenn es nicht länger als 1 ist, ist es automatisch eine Auswahl lang.
                    updatedUserSelectNumOptions = 1;
                }
                /**
                 * Setzt die aktuelle Auswahl des Users, direkt auf die tatsächliche Auswahl des Users.
                 * Setzt den Wert, dass ein User hier ein Update macht auf True
                 */
                console.log('UserData', UserData)
                if (UserData != undefined) { this.setState({ UserSelectSelectedOption:UserData, UserUpdate: true,})}
                /**
                 *  Setzt den State.
                 */
                this.setState((prevState) => {
                    return {
                        UserSelectStartingSelections: updatedUserSelectStartingSelections,
                        UserSelectNumOptions: updatedUserSelectNumOptions,
                    };
                },() => {
                    console.log("this.state.UserSelectAvSelections",this.state.UserSelectAvSelections)
                });
                return responseCharName;
            });
    }

    // Setzt die Auswahl des Users, bei den vom User erstellten InfoObjekten
    handleUserSelectSelection = (event) => {
        this.setState({
            UserSelectSelectedOption: event.target.value,
        });
    }

     /**
     * Handler für Änderungen an Text der InfoObjekte, bei einer von einem anderen User erstellten Auswahleigenschaft.
     */
    handleUserSelectTextFieldChange(event, index) {
        // setzt die const value
        const {value} = event.target;
        this.setState(prevState => {
            const updatedUserSelectAvSelections = [...prevState.UserSelectAvSelections];
            updatedUserSelectAvSelections[index] = value;
            // setzt den Wert der updatedUserSelections in userSelections
            return {UserSelectAvSelections: updatedUserSelectAvSelections};
        });
    }


    /**
     * Handling für, wenn ein User bei einer bereits erstellten Auswahleigenschaft, eine mögliche Auswahl wieder entfernen will.
     */
    handleDeleteUserSelection(index) {
        this.setState(prevState => {
            // Erstellt einen const mit dem Wert von userSelections
            const updatedUserSelectAvSelections = [...prevState.UserSelectAvSelections];
            // Entfernt ein Element basierend auf dem Index.
            updatedUserSelectAvSelections.splice(index, 1);
            return {
                // setzt die vom User erstellten Auswahlen, zu dem neuen Wert (ohne den gelöschten Wert)
                UserSelectAvSelections: updatedUserSelectAvSelections,
                // setzt die höhe der vom User erstellten Auswahlen auf -1 des aktuellen Werts.
                UserSelectNumOptions: (this.state.UserSelectNumOptions - 1)
            };
        });
    }

    /** Handler für die Anzahl an erstellen Auswahlen, bei einer bereits von einem User erstellten Auswahleigenschaft */
    handleUserSelectNumOptions() {
        this.setState((prevState) => {
            const updatedUserSelectAvSelections = [...prevState.UserSelectAvSelections, ''];
            return {
                UserEdit: true,
                UserSelectNumOptions: prevState.UserSelectNumOptions + 1,
                UserSelectAvSelections: updatedUserSelectAvSelections,
            };
        });
    }

    /**
     * Diese Funktion wird bei dem Laden einer der SearchProfile.js ausgeführt.
     * Hier wird einerseits der letzte Teil der URL erfasst, welcher bestimmt, ob es sich entweder um das Anlegen eines
     * SuchProfils handelt oder um das Ändern bzw. Updaten eines SuchProfils.
     */

    componentDidMount() {
        const currentPath = window.location.pathname;
        // Letzte Teil der URL wird gepoppt, un in const lastPartURL gespeichert
        const lastPartURL = currentPath.split('/').pop();
        this.getSelectedPropertiesForCharValuesAndNameTwo(lastPartURL);
        console.log('LastPartURL in DidMount', this.state.lastPartURL)
        this.setState({lastPartURL: lastPartURL})

        if (lastPartURL === "new") {

        } else {
            // Der Fall, wenn ein bereits existierendes Suchprofil bearbeitet wird
            DatingSiteAPI.getAPI()
                .getOneSearchprofile(lastPartURL)
                .then((responseInfoObjects) => {
                    const selectedProperties = {};

                    for (const key in responseInfoObjects) {
                        if (responseInfoObjects.hasOwnProperty(key)) {
                            const infoObject = responseInfoObjects[key];
                            const charId = infoObject.char_id;
                            const charValue = infoObject.char_value;

                            switch (charId) {
                                case 40:
                                    selectedProperties.gender = charValue;
                                    break;
                                case 70:
                                    selectedProperties.hair = charValue;
                                    break;
                                case 50:
                                    selectedProperties.height = charValue;
                                    break;
                                case 60:
                                    selectedProperties.religion = charValue;
                                    break;
                                case 80:
                                    selectedProperties.smoking = charValue;
                                    break;
                                case 100:
                                    selectedProperties.minAge = charValue;
                                    break;
                                case 110:
                                    selectedProperties.maxAge = charValue;
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
                });
        }
        ;
        this.getAllInfoObjects();

    }


    /**
     * Ein User hat die Möglichkeit aus einer Auswahl von angebbaren Eigenschaften eine auszuwählen, um hierfür dann
     * eine Information anzugeben.
     * Wenn ein User nun eine Möglichkeit auswählt, wird die ausgewählte Möglichkeit, in handleChangeSelectedOption als
     * State von selectedOption gesetzt.
     */

    handleChangeSelectedOption = event => {
        this.setState({ selectedOption: event.target.value });
    };

    /**
     * Ein User kann bei Eigenschaften entscheiden, ob er einen der schon vorgefertigten Werte eintragen will,
     * oder einen Freitext dazu schreiben will.
     * Hier wird der State von SelectCreate festgelegt, welche der Optionen ein User gerade ausgewählt hat.
     */

    handleInfoSelectCreate = (event, newSelectedValue) => {
        this.setState({ SelectCreate: newSelectedValue });
    };

    /** Submit von User erstellten Eigenschaften */
     handleUserSelectSaveInputsSelections= async () => {
        if (this.state.UserUpdate === false ){
            try {
                // Schleife über jedes Element der vom User erstellten Auswahlen
                for (let index = 0; index < this.state.UserSelectAvSelections.length; index++) {
                    // Der value ist der Wert des aktuellen Elements der vom User erstellten Auswahlen
                    const value = this.state.UserSelectAvSelections[index];


                    // Wenn der aktuelle value der erstellten Auswahlen, der vom User explizit ausgewählte value ist.
                    if (this.state.UserSelectSelectedOption === value) {

                        // Erstellen eines neuen NamedInfoObjectBO, hier mit einer GoogleID, da dieser value vom User ausgewählt wurde.
                        const newInfoBO = new NamedInfoObjectBO(
                            this.state.id,
                            null,
                            this.state.lastPartURL,
                            value,
                            this.state.selectedCharName,
                            this.state.selectedCharId,
                            "select",
                        );

                        // API-Aufruf zum Erstellen des NamedInfoObjectBO
                        await DatingSiteAPI.getAPI().createCharDescForProfile(newInfoBO);

                    } else {

                        // Erstellen eines neuen NamedInfoObjectBO, hier ohne GoogleID, da dieser value nicht vom User ausgewählt wurde.
                        const newInfoBO = new NamedInfoObjectBO(
                            this.state.id,
                            null,
                            null,
                            value,
                            this.state.selectedCharName,
                            this.state.selectedCharId,
                            "select",
                        );

                        await DatingSiteAPI.getAPI().createCharDescForProfile(newInfoBO);
                    }
                }

                // Wenn ein User ein nicht selbst erstellten Value ausgewählt hat
                if (this.state.UserSelectStartingSelections.includes(this.state.UserSelectSelectedOption)){

                    // Erstellen eines neuen NamedInfoObjectBO, hier mit einer GoogleID, da dieser value vom User ausgewählt wurde.
                    const newInfoBO = new NamedInfoObjectBO(
                        this.state.id,
                        null,
                        this.state.lastPartURL,
                        this.state.UserSelectSelectedOption,
                        this.state.selectedCharName,
                        this.state.selectedCharId,
                        "select",
                    );

                        // API-Aufruf zum Erstellen des NamedInfoObjectBO
                    await DatingSiteAPI.getAPI().createCharDescForProfile(newInfoBO);

                } if (this.state.selectedCharTyp === "text"){

                    // Erstellen eines neuen NamedInfoObjectBO, hier mit einer GoogleID, da dieser value vom User ausgewählt wurde.
                    const newInfoBO = new NamedInfoObjectBO(
                        this.state.id,
                        null,
                        this.state.lastPartURL,
                        this.state.char_desc,
                        this.state.selectedCharName,
                        this.state.selectedCharId,
                        "text",
                    );

                        // API-Aufruf zum Erstellen des NamedInfoObjectBO
                    await DatingSiteAPI.getAPI().createCharDescForProfile(newInfoBO);
                }

            } catch (e) {
                this.setState({
                    error: e,
                });
            }
        } else {
            {/** Hier handelt es sich dann um ein Update eines Users */}
            if (this.state.selectedCharTyp === "text"){
                const updatedNamedInfoBO = new NamedInfoObjectBO(
                    this.state.id,
                    null,
                    this.state.lastPartURL,
                    this.state.char_desc,
                    this.state.selectedCharName,
                    this.state.selectedCharId,
                    "text")

                DatingSiteAPI.getAPI()
                    .updateNamedCharByURL(updatedNamedInfoBO)
                    .catch((e) =>
                        this.setState({
                            error: e,
                        })
                    );
            } else {

                // Schleife über jedes Element der vom User erstellten Auswahlen
                for (let index = 0; index < this.state.UserSelectAvSelections.length; index++) {
                    // Der value ist der Wert des aktuellen Elements der vom User erstellten Auswahlen
                    const value = this.state.UserSelectAvSelections[index];


                    // Wenn der aktuelle value der erstellten Auswahlen, der vom User explizit ausgewählte value ist.
                    if (this.state.UserSelectSelectedOption === value) {

                        // Erstellen eines neuen NamedInfoObjectBO, hier mit einer GoogleID, da dieser value vom User ausgewählt wurde.
                        const newInfoBO = new NamedInfoObjectBO(
                            this.state.id,
                            null,
                            this.state.lastPartURL,
                            value,
                            this.state.selectedCharName,
                            this.state.selectedCharId,
                            "select",
                        );

                        // API-Aufruf zum Erstellen des NamedInfoObjectBO
                        await DatingSiteAPI.getAPI().updateNamedCharByURL(newInfoBO);

                    } else {

                        // Erstellen eines neuen NamedInfoObjectBO, hier ohne GoogleID, da dieser value nicht vom User ausgewählt wurde.
                        const newInfoBO = new NamedInfoObjectBO(
                            this.state.id,
                            null,
                            null,
                            value,
                            this.state.selectedCharName,
                            this.state.selectedCharId,
                            "select",
                        );

                        await DatingSiteAPI.getAPI().createCharDescForProfile(newInfoBO);
                    }
                }

                if (!this.state.UserSelectAvSelections.includes(this.state.UserSelectSelectedOption)) {
                    console.log("hi")
                    const updatedNamedInfoBO = new NamedInfoObjectBO(
                        this.state.id,
                        null,
                        this.state.lastPartURL,
                        this.state.UserSelectSelectedOption,
                        this.state.selectedCharName,
                        this.state.selectedCharId,
                        "select")

                    console.log('UpdatedNamedInfoBO Z. 695 Searprofile', updatedNamedInfoBO)

                    DatingSiteAPI.getAPI()
                        .updateNamedCharByURL(updatedNamedInfoBO)
                        .catch((e) =>
                            this.setState({
                                error: e,
                            })
                        );
                }
            }

        }
        await this.getSelectedPropertiesForCharValuesAndNameTwo(this.state.lastPartURL);
    }

     /** Diese Funktion wird als "async" markiert, da wir auf den Abschluss des API-Aufrufs für die InfoObjekte warten müssen.
     * Die const customProperties beinhaltet die benutzerdefinierten Eigenschaften.
     * Jedes InfoObjekt, das eine CharID größer als 160 hat, wird zu diesem leeren Objekt hinzugefügt.
     * Die restlichen InfoObjekte werden mithilfe eines Zustands (State) gesetzt.
     * Am Ende wird der Zustand des leeren "customProperties"-Objekts aktualisiert,
     * um daraus die individuellen Eigenschaften und InfoObjekte auslesen zu können. */
    async getSelectedPropertiesForCharValuesAndNameTwo(lastPartURL) {
        const customProperties = {};

        try {

            const responseInfoObjects = await DatingSiteAPI.getAPI().getSearchInfoObjects(lastPartURL);
            console.log('LastPartURL', lastPartURL)

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
                    }
                }
            }
            this.setState({ customProperties });
            console.log(this.state)
        } catch (error) {
            console.error("Fehler beim Auslesen der InfoObjekte: ", error);
        }
    }

     /** Die getCharNameByID liest den CharName einer gegebenen char_id aus. */
    getCharNameByID(char_id) {
        return DatingSiteAPI.getAPI()
            .getCharName(char_id)
            .then((responseCharName) => {
                console.log('GetCharNameByID in Search:', responseCharName)
                return responseCharName;
            })
    }

    /**
     * Diese Funktion besitzt die Darstellungen zu den ausgewählten Optionen eines Users in dem drop-down menu.
     */

    rederSelectedContent() {
        const { selectedOption } = this.state;

        // Wenn die Ausgewählte Option (selectedOption) hier zum Beispiel Religion ist, wird dies dann dem User dargestellt.
        if (selectedOption === "selectReligion") {
            return (
            <FormGroup row style={{ justifyContent: 'center' }}>
            <Box sx={{ width: 400, margin: '0 auto' }}>
                <FormLabel> Welche religiöse Ansicht sollte die gesuchte Person haben?</FormLabel>
                <div style={{ marginBottom: '1rem' }}>
                    {/** Hier wird der Button gemacht, ob ein User ein Text eingeben kann oder die Auswahlen sieht*/}
                    <ToggleButtonGroup exclusive value={this.state.SelectCreate} onChange={this.handleInfoSelectCreate} aria-label="InfoObject Select Create">
                        <ToggleButton value="select">
                            <RadioButtonUncheckedIcon/>
                        </ToggleButton>
                        <ToggleButton value="create">
                            <EditNoteIcon/>
                        </ToggleButton>
                        <ToggleButton value="delete" onClick={this.handleDeleteReligion}>
                            <DeleteOutlineIcon/>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
                {this.state.SelectCreate === 'create' ? (
                    <TextField label="Eigenes Label hinzufügen" name="Religion" value={this.state.religion} onChange={this.handleChangeRel} style={{ justifyContent: 'center' }}/>
                ) : (this.state.SelectCreate === 'delete' ? (
                    <div>...</div>
                ) : (
                    <RadioGroup row style={{justifyContent: 'center'}} value={this.state.religion} onChange={this.handleChangeRel} className={"checkbox_search"}>
                        <FormControlLabel sx={{ width: '12%' }} value="Atheist" control={<Radio />} label="Atheist" labelPlacement="bottom" />
                        <FormControlLabel sx={{ width: '12%' }} value="Christlich" control={<Radio />} label="Christlich" labelPlacement="bottom" />
                        <FormControlLabel sx={{ width: '12%' }} value="Muslimisch" control={<Radio />} label="Muslimisch" labelPlacement="bottom" />
                        <FormControlLabel sx={{ width: '12%' }} value="Andere" control={<Radio />} label="Andere" labelPlacement="bottom" />
                    </RadioGroup>
                ))}
            </Box>
          </FormGroup>
        );
        } else if (selectedOption === 'selectRaucherstatuts') {
            return (
                <FormGroup row style={{ justifyContent: 'center' }}>
                    <Box sx={{ width: 400, margin: '0 auto' }}>
                        <FormLabel>Sollte die Person rauchen?</FormLabel>
                        <div style={{ marginBottom: '1rem' }}>
                            {/** Hier wird der Button gemacht, ob ein User ein Text eingeben kann oder die Auswahlen sieht*/}
                            <ToggleButtonGroup exclusive value={this.state.SelectCreate} onChange={this.handleInfoSelectCreate} aria-label="InfoObject Select Create">
                                <ToggleButton value="select">
                                    <RadioButtonUncheckedIcon/>
                                </ToggleButton>
                                <ToggleButton value="create">
                                    <EditNoteIcon/>
                                </ToggleButton>
                                <ToggleButton value="delete" onClick={this.handleDeletesmoking}>
                                    <DeleteOutlineIcon/>
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        {this.state.SelectCreate === 'create' ? (
                            <TextField label="Eigenes Label hinzufügen" name="smoking" value={this.state.smoking} onChange={this.handleChangeSmo} style={{ justifyContent: 'center' }}/>
                        ) : (this.state.SelectCreate === 'delete' ? (
                            <div>...</div>
                        ) : (
                            <RadioGroup row style={{justifyContent: 'center'}} value={this.state.smoking} onChange={this.handleChangeSmo} className={"checkbox_search"}>
                                <FormControlLabel sx={{ width: '20%' }} value="Raucher" control={<Radio />} label="Ja" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '20%' }} value="Nicht-Raucher" control={<Radio />} label="Nein" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '20%' }} value="egal" control={<Radio />} label="nicht relevant" labelPlacement="bottom" />
                            </RadioGroup>
                        ))}
                    </Box>
                </FormGroup>
            );
        } else if (selectedOption === 'selectHaarfarbe'){
            return(
                <FormGroup row style={{ justifyContent: 'center' }}>
                    {/** Hier kann die gewünschte Haarfarbe der mit diesem Suchprofil gesuchten Person ausgewählt werden */}
                    <Box sx={{ width: 400, margin: '0 auto' }}>
                        <FormLabel> Welche Haarfarbe sollte die gesuchte Person haben?</FormLabel>
                        <div style={{ marginBottom: '1rem' }}>
                            {/** Hier wird der Button gemacht, ob ein User ein Text eingeben kann oder die Auswahlen sieht*/}
                            <ToggleButtonGroup exclusive value={this.state.SelectCreate} onChange={this.handleInfoSelectCreate} aria-label="InfoObject Select Create">
                                <ToggleButton value="select">
                                    <RadioButtonUncheckedIcon/>
                                </ToggleButton>
                                <ToggleButton value="create">
                                    <EditNoteIcon/>
                                </ToggleButton>
                                <ToggleButton value="delete" onClick={this.handleDeleteHair}>
                                    <DeleteOutlineIcon/>
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        {this.state.SelectCreate === 'create' ? (
                            <TextField label="Eigenes Label hinzufügen" name="Hair" value={this.state.hair} onChange={this.handleChangeHair} style={{ justifyContent: 'center' }}/>
                        ) : (this.state.SelectCreate === 'delete' ? (
                            <div>...</div>
                        ) : (
                            <RadioGroup row style={{justifyContent: 'center'}} value={this.state.hair} onChange={this.handleChangeHair} className={"checkbox_search"}>
                                <FormControlLabel sx={{ width: '10%' }} value="Schwarz" control={<Radio />} label="Schwarz" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '10%' }} value="Braun" control={<Radio />} label="Braun" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '10%' }} value="Blond" control={<Radio />} label="Blond" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '10%' }} value="Andere" control={<Radio />} label="Andere" labelPlacement="bottom" />
                            </RadioGroup>
                        ))}
                    </Box>
                </FormGroup>
            )
        } else if (selectedOption === 'selectGehalt'){
            return(
                <FormGroup row style={{ justifyContent: 'center' }}>
                <Box sx={{ width: 400, margin: '0 auto' }}>
                    {/** Hier kann das gewünschte Gehalt der Person die gesucht wird angegeben werden. */}
                    <FormLabel> Welches Gehalt sollte die Person mindestens haben?</FormLabel>
                    <div style={{ marginBottom: '1rem' }}>
                        {/** Hier wird der Button gemacht, ob ein User ein Text eingeben kann oder die Auswahlen sieht*/}
                        <ToggleButtonGroup exclusive value={this.state.SelectCreate} onChange={this.handleInfoSelectCreate} aria-label="InfoObject Select Create">
                            <ToggleButton value="select">
                                <RadioButtonUncheckedIcon/>
                            </ToggleButton>
                            <ToggleButton value="delete" onClick={this.handleDeleteSalary}>
                                <DeleteOutlineIcon/>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    {this.state.SelectCreate === 'delete' ? (
                        <div>...</div>
                    ) : (
                        <RadioGroup row style={{justifyContent: 'center'}} value={this.state.income} onChange={this.handleChangeSalary} className={"checkbox_search"}>
                            <FormControlLabel sx={{ width: '20%' }} value="1000" control={<Radio />} label="1000€" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '20%' }} value="1500" control={<Radio />} label="1500€" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '20%' }} value="2000" control={<Radio />} label="2000€" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '20%' }} value="3500" control={<Radio />} label="3500€" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '20%' }} value="5000" control={<Radio />} label="5000€" labelPlacement="bottom" />
                        </RadioGroup>
                      )
                    }
                  </Box>
                </FormGroup>
            );
        } else if (selectedOption === 'selectLieblingsverein'){
            return(
                <FormGroup row style={{ justifyContent: 'center' }}>
                    {/** Hier kann der gewünschte Lieblingsverein der Person die gesucht wird angegeben werden. */}
                    <Box sx={{ width: 400, margin: '0 auto' }}>
                        <FormLabel> Was ist der gewünschte Lieblingsverein?</FormLabel>
                        <div style={{ marginBottom: '1rem' }}>
                            <ToggleButtonGroup exclusive value={this.state.SelectCreate} onChange={this.handleInfoSelectCreate} aria-label="InfoObject Select Create">
                                <ToggleButton value="create">
                                    <EditNoteIcon/>
                                </ToggleButton>
                                <ToggleButton value="delete" onClick={this.handleDeleteClub}>
                                    <DeleteOutlineIcon/>
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        {this.state.SelectCreate === 'delete' ? (
                            <div>...</div>
                        ) : (
                            <TextField
                                type={"text"}
                                label={"Name des Vereins"}
                                value={this.state.favclub}
                                onChange={this.handleChangeClub}
                                inputProps={{
                                  maxLength: 17,
                                }}
                            />
                        )}
                    </Box>
                </FormGroup>
            )
        } else if (selectedOption === 'selectHobbys'){
            return(
                <FormGroup row style={{ justifyContent: 'center' }}>
                    <Box sx={{ width: 400, margin: '0 auto' }}>
                        {/** Textfeld für die eingabe der Hobbys der gesuchten Person*/}
                        <FormLabel>Welche Hobbys soll die gesuchte Person haben?</FormLabel>
                        <div style={{ marginBottom: '1rem' }}>
                            <ToggleButtonGroup exclusive value={this.state.SelectCreate} onChange={this.handleInfoSelectCreate} aria-label="InfoObject Select Create">
                                <ToggleButton value="create">
                                    <EditNoteIcon/>
                                </ToggleButton>
                                <ToggleButton value="delete" onClick={this.handleDeleteHobbys}>
                                    <DeleteOutlineIcon/>
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        {this.state.SelectCreate === 'delete' ? (
                            <div>...</div>
                        ) : (
                            <TextField
                                type={"text"}
                                label={"Hobbyname"}
                                value={this.state.hobby}
                                onChange={this.handleChangeHobbys}
                                inputProps={{
                                  maxLength: 17,
                                }}
                            />
                        )}
                    </Box>
                </FormGroup>
            )
        } else if (selectedOption === 'selectPolitischeAusrichtung'){
            return(
                <FormGroup row style={{ justifyContent: 'center' }}>
                    <Box sx={{ width: 400, margin: '0 auto' }}>
                        <FormLabel>Was für eine politische Ausrichtung sollte die gesuchte Person haben?</FormLabel>
                        <div style={{ marginBottom: '1rem' }}>
                            {/** Hier wird der Button gemacht, ob ein User ein Text eingeben kann oder die Auswahlen sieht*/}
                            <ToggleButtonGroup exclusive value={this.state.SelectCreate} onChange={this.handleInfoSelectCreate} aria-label="InfoObject Select Create">
                                <ToggleButton value="select">
                                    <RadioButtonUncheckedIcon/>
                                </ToggleButton>
                                <ToggleButton value="create">
                                    <EditNoteIcon/>
                                </ToggleButton>
                                <ToggleButton value="delete" onClick={this.handleDeletePolitical}>
                                    <DeleteOutlineIcon/>
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        {this.state.SelectCreate === 'create' ? (
                            <TextField label="Eigenes Label hinzufügen" name="politicaltendency" value={this.state.politicaltendency} onChange={this.handleChangePolitical} style={{ justifyContent: 'center' }}/>
                        ) : (this.state.SelectCreate === 'delete' ? (
                            <div>...</div>
                        ) : (
                            <RadioGroup row value={this.state.politicaltendency} onChange={this.handleChangePolitical}>
                                <FormControlLabel sx={{ width: '25%' }} value="Unpolitisch" control={<Radio />} label="Unpolitisch" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '25%' }} value="Politische Mitte" control={<Radio />} label="Politische Mitte" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '25%' }} value="Liberal" control={<Radio />} label="Liberal" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '25%' }} value="Links" control={<Radio />} label="Links" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '25%' }} value="Rechts" control={<Radio />} label="Rechts" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '25%' }} value="Keine Angabe" control={<Radio />} label="indifferent" labelPlacement="bottom" />
                            </RadioGroup>
                        ))}
                    </Box>
                </FormGroup>
            )
        } else if (selectedOption === 'selectKörpergröße'){
            return(
                <FormGroup row style={{ justifyContent: 'center' }}>
                <Box sx={{ width: 400, margin: '0 auto' }}>
                    <FormLabel> Wie groß soll die gesuchte Person sein?</FormLabel>
                    {/** Hier kann die gewünschte Körpergröße einer Person ausgewählt werden */}
                    <div style={{ marginBottom: '1rem' }}>
                        <ToggleButtonGroup exclusive value={this.state.SelectCreate} onChange={this.handleInfoSelectCreate} aria-label="InfoObject Select Create">
                            <ToggleButton value="create">
                                <EditNoteIcon/>
                            </ToggleButton>
                            <ToggleButton value="delete" onClick={this.handleDeleteHeight}>
                                <DeleteOutlineIcon/>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    {this.state.SelectCreate === 'delete' ? (
                        <div>...</div>
                    ) : (
                        <RadioGroup row style={{justifyContent: 'center'}} value={this.state.height} onChange={this.handleChangeHeight} className={"checkbox_search"}>
                            <FormControlLabel sx={{ width: '16%' }} value="small" control={<Radio />} label="Klein" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '16%' }} value="mean" control={<Radio />} label="Mittel" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '16%' }} value="large" control={<Radio />} label="Groß" labelPlacement="bottom" />
                        </RadioGroup>
                    )}
                  </Box>
                </FormGroup>
            )
        }
    }
    render() {
        const {
            minAge,
            maxAge,
            customProperties,
        } = this.state;

        const defaultValue = this.state.selectedOption || '';

        return(
            <div>
                <h2>Dein Suchprofil:</h2>

                <Box sx={{ width: {lg: '50%', md: '60%', sm: '80%'}, margin: '0 auto'}}>
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} sx={{ alignItems: 'stretch' }}>
                        <Item>
                            {/** Hier kann das Geschlecht der in diesem Suchprofil gesuchten Person ausgewählt werden */}
                            <FormLabel> Welches Geschlecht soll die gesuchte Person haben?</FormLabel>
                            <RadioGroup row style={{justifyContent: 'center'}} value={this.state.gender} onChange={this.handleChangeGen} className={"checkbox_search"}>
                                <FormControlLabel sx={{ width: '10%' }} value="männlich" control={<Radio />} label="Mann" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '10%' }} value="weiblich" control={<Radio />} label="Frau" labelPlacement="bottom" />
                            </RadioGroup>
                        </Item>

                        <Item >
                            {/** Hier kann die gewünschte Altersspanne in diesem Suchprofil gesuchten Person ausgewählt werden */}
                            <Box sx={{width: 400, margin: '0 auto'}}>
                                <FormLabel>Wie alt soll die Person sein?</FormLabel>
                                <Slider
                                    value={[minAge, maxAge]}
                                    onChange={this.handleChangeAge}
                                    valueLabelDisplay="auto"
                                    min={18}
                                    max={100}
                                    className="slider"
                                />
                            </Box>
                        </Item>

                        <Item>
                            <FormGroup row style={{ justifyContent: 'center' }}>
                                <Box sx={{ width: 400, margin: '0 auto' }}>
                                    <FormLabel>Welche Interessen sollte die Person haben?</FormLabel>
                                    {/** Textfeld für die Interessen der Person, diese werden dann in der Suche mit den
                                     Freitextfeldern der anderen Person verglichen*/}
                                    <TextField
                                        type={"text"}
                                        value={this.state.aboutme === null ? '': this.state.aboutme}
                                        onChange={this.handleChangeInterests}
                                        inputProps={{maxLength: 30,}}
                                    />
                                </Box>
                            </FormGroup>
                        </Item>

                        <Item>
                            <FormGroup row style={{justifyContent: 'center'}}>
                                <Box sx={{width: 450, margin: '0 auto'}}>
                                    <FormControl fullWidth>
                                        <InputLabel>Weitere mögliche Eigenschaften:</InputLabel>
                                        <Select
                                            value={defaultValue}
                                            label="Auswahleigenschaften"
                                            onChange={this.handleChangeSelectedOption}
                                        >
                                            <MenuItem value="selectReligion">Religion</MenuItem>
                                            <MenuItem value="selectRaucherstatuts">Rauchen</MenuItem>
                                            <MenuItem value="selectHaarfarbe">Haarfarbe</MenuItem>
                                            <MenuItem value="selectKörpergröße">Körpergröße</MenuItem>
                                            <MenuItem value="selectGehalt">Gehalt</MenuItem>
                                            <MenuItem value="selectLieblingsverein">Lieblingsverein</MenuItem>
                                            <MenuItem value="selectHobbys">Hobbys</MenuItem>
                                            <MenuItem value="selectPolitischeAusrichtung">Politische Ausrichtung</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {this.rederSelectedContent()}
                                </Box>
                            </FormGroup>
                        </Item>
                        {/** Compente für nicht vom system vorgefertigte Eigenschaften*/}
                        <Item>
                            <Box sx={{ width: 400, margin: '0 auto' }}>
                                <FormGroup row style={{ justifyContent: 'center' }}>
                                    <Button onClick={this.handleOpenUserChar} variant="contained"  startIcon={<AddIcon />}> Eigenschaftsvorschläge </Button>
                                    {this.state.openuserchar && (
                                        <Box sx={{ width: 400, margin: '0 auto', marginTop: '5%' }}>
                                            <FormGroup row style={{ justifyContent: 'center' }}>
                                                <FormControl fullWidth>
                                                    <InputLabel> Bereits erstellte Eigenschaften </InputLabel>
                                                    <Select
                                                        value={defaultValue}
                                                        lable="Vorschläge"
                                                        onChange={this.handleChangeSelectedProperty}
                                                    >
                                                        {this.state.selectedCharNames &&
                                                            this.state.selectedCharNames.map((char, index) => (
                                                                <MenuItem
                                                                    key={char.char_id}
                                                                    value={char.char_id}
                                                                >
                                                                    <div>
                                                                        {char.char_name}
                                                                    </div>
                                                                </MenuItem>
                                                            ))}
                                                    </Select>
                                                </FormControl>
                                                {this.state.selectedCharTyp === 'select' && (
                                                <Box sx={{ marginBottom: '10px', marginTop: '5%' }}>
                                                    <FormLabel sx={{ marginBottom: '10px', marginTop: '5%' }}>
                                                        Hier sind deine Auswahlmöglichkeiten
                                                    </FormLabel>
                                                    <RadioGroup row style={{ justifyContent: 'center' }} value={this.state.UserSelectSelectedOption} onChange={this.handleUserSelectSelection}>
                                                        {this.state.UserSelectStartingSelections.map((value, index) => (
                                                            <Box key={index} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', marginTop: '5%',}}>
                                                                <FormControlLabel sx={{ width: '35%' }} value={value} control={<Radio />} label={value} labelPlacement="right" />
                                                            </Box>
                                                        ))}
                                                        {this.state.UserSelectAvSelections.map((value, index) => (
                                                            <Box key={index} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', marginTop: '5%',}}>
                                                                <FormControlLabel sx={{ width: '35%' }} value={value} control={<Radio />} label={value} labelPlacement="right"/>
                                                                <TextField label="Auswahlname" size="small" value={this.state.UserSelectAvSelections[index] || ''} onChange={(event) => this.handleUserSelectTextFieldChange(event, index)} ></TextField>
                                                                <Fab color="error" aria-label="delete" size="small" onClick={() => this.handleDeleteUserSelection(index)}>
                                                                    <DeleteIcon></DeleteIcon>
                                                                </Fab>
                                                            </Box>
                                                        ))}
                                                    </RadioGroup>

                                                    <Box sx={{ marginBottom: '10px' }}>
                                                        <Fab onClick={this.handleUserSelectNumOptions} color="primary" aria-label="add" sx={{ marginLeft: '5px' }}>
                                                            <AddIcon />
                                                        </Fab>
                                                    </Box>
                                                    <Box sx={{ marginBottom: '10px' }}>
                                                        <Button onClick={this.handleUserSelectSaveInputsSelections} variant="contained" startIcon={<SaveIcon />}>
                                                            Speichern
                                                        </Button>
                                                    </Box>
                                                </Box>
                                                )}
                                                {this.state.selectedCharTyp === 'text' && (
                                                    <>
                                                        <Box sx={{ marginBottom: '10px', marginTop: '5%' }}>
                                                            <FormLabel sx={{ marginBottom: '10px', marginTop: '5%' }}> Gebe hier deine passende Beschreibung an: </FormLabel>
                                                        </Box>
                                                        <Box sx={{ marginBottom: '10px' }}>
                                                            <TextField label="Beschreibung" value={this.state.char_desc} fullWidth size="small" onChange={(event) => this.handleInputChange(event, 'char_desc')} />
                                                        </Box>
                                                        <Box sx={{ marginBottom: '10px', marginLeft: '10px' }}>
                                                            <Button onClick={this.handleUserSelectSaveInputsSelections} variant="contained" startIcon={<SaveIcon />}> Erstellen </Button>
                                                        </Box>
                                                    </>
                                                )}
                                            </FormGroup>
                                        </Box>
                                    )}
                                </FormGroup>
                            </Box>
                        </Item>
                        <Item>
                            {/** Das sind die Tag-Felder der bereits ausgewählten Eigenschaften eines Suchprofils. */}

                            <div>
                                {this.state.aboutme && (
                                <span
                                    className="tag">{this.state.aboutme}
                                    <button onClick={this.handleDeleteInterests} style={{ marginLeft: '5px', border: 'none', backgroundColor: '#e0e0e0'}}>
                                        <DeleteIcon style={{ fontSize: 'inherit' }} />
                                    </button>
                                </span>
                                    )}

                                {this.state.religion && (
                                <span
                                    className={"tag"}>{this.state.religion}
                                    <button onClick={this.handleDeleteReligion} style={{ marginLeft: '5px', border: 'none', backgroundColor: '#e0e0e0'}}>
                                        <DeleteIcon style={{ fontSize: 'inherit' }} />
                                    </button>
                                </span>
                                    )}

                                {this.state.smoking && (
                                <span
                                    className={"tag"}>{this.state.smoking}
                                    <button onClick={this.handleDeletesmoking} style={{ marginLeft: '5px', border: 'none', backgroundColor: '#e0e0e0'}}>
                                        <DeleteIcon style={{ fontSize: 'inherit' }} />
                                    </button>
                                </span>
                                    )}

                                {this.state.hair && (
                                <span
                                    className={"tag"}>{this.state.hair}
                                    <button onClick={this.handleDeleteHair} style={{ marginLeft: '5px', border: 'none', backgroundColor: '#e0e0e0'}}>
                                        <DeleteIcon style={{ fontSize: 'inherit' }} />
                                    </button>
                                </span>
                                    )}

                                {this.state.height && (
                                <span
                                    className={"tag"}>{this.state.height}
                                    <button onClick={this.handleDeleteHeight} style={{ marginLeft: '5px', border: 'none', backgroundColor: '#e0e0e0'}}>
                                        <DeleteIcon style={{ fontSize: 'inherit' }} />
                                    </button>
                                </span>
                                    )}

                                {this.state.income && (
                                <span
                                    className={"tag"}>{this.state.income}
                                    <button onClick={this.handleDeleteSalary} style={{ marginLeft: '5px', border: 'none', backgroundColor: '#e0e0e0'}}>
                                        <DeleteIcon style={{ fontSize: 'inherit' }} />
                                    </button>
                                </span>
                                    )}

                                {this.state.favclub && (
                                <span
                                    className={"tag"}>{this.state.favclub}
                                    <button onClick={this.handleDeleteClub} style={{ marginLeft: '5px', border: 'none', backgroundColor: '#e0e0e0'}}>
                                        <DeleteIcon style={{ fontSize: 'inherit' }} />
                                    </button>
                                </span>
                                    )}

                                {this.state.hobby && (
                                <span
                                    className={"tag"}>{this.state.hobby}
                                    <button onClick={this.handleDeleteHobbys} style={{ marginLeft: '5px', border: 'none', backgroundColor: '#e0e0e0'}}>
                                        <DeleteIcon style={{ fontSize: 'inherit' }} />
                                    </button>
                                </span>
                                   )}

                                {this.state.politicaltendency && (
                                <span
                                    className={"tag"}>{this.state.politicaltendency}
                                    <button onClick={this.handleDeletePolitical} style={{ marginLeft: '5px', border: 'none', backgroundColor: '#e0e0e0'}}>
                                        <DeleteIcon style={{ fontSize: 'inherit' }} />
                                    </button>
                                </span>
                                    )}
                            </div>

                        </Item>
                        {/** Dynamische Tag Erstellung */}
                        <Item>
                            {
                                customProperties &&
                                Object.entries(customProperties).map(([key, value], ) => {
                                    if (
                                        typeof value === 'object' &&
                                        value.hasOwnProperty('char_id') &&
                                        value.hasOwnProperty('char_name')
                                    ) {
                                        return (
                                            <div>
                                                <span
                                                    className={"tag"}>{value.char_value}
                                                    <button onClick={() => this.handleChangeCharValueDeleteTag(value.char_value, this.state.lastPartURL)} style={{ marginLeft: '5px', border: 'none', backgroundColor: '#e0e0e0'}}>
                                                        <DeleteIcon style={{ fontSize: 'inherit' }} />
                                                    </button>
                                                </span>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </Item>
                        <Item>
                            {/** Dies ist der submit button, dieser macht entweder ein Update oder ein Post, basierend
                             ob eine Person die Seite aufruft, um ein neues Profil zu erstellen oder um ein bereits
                             bestehendes Profil zu bearbeiten. Das handling hierfür wird innerhalb einer Funktion gemacht*/}
                            <Button onClick={this.submit} className={"iconcol"}>
                                <SaveIcon/>
                            </Button>
                        </Item>

                    </Stack>
                </Box>
            </div>
        )
    }
}

export default SearchProfile