import { Component } from "react";
import Stack from "@mui/material/Stack";
import Item from "../theme";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import {Button, ButtonGroup, Fab, TextField} from "@mui/material";
import * as React from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DatingSiteAPI from '../api/DatingSiteAPI';
import profileBO from "../api/ProfileBO";
import infoobjectBO from "../api/InfoObjectBO";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NamedInfoObjectBO from "../api/NamedInfoObjectBO";
import EditNoteIcon from '@mui/icons-material/EditNote';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArticleIcon from '@mui/icons-material/Article';
import RemoveIcon from '@mui/icons-material/Remove';
import {forEach} from "react-bootstrap/ElementChildren";

/** Dies stellt das Erstellen eines Profils dar */


/** Definition der CreateProfile-Komponente */
class CreateProfil extends Component {
    constructor(props) {
        super(props);
        /** Initalisierung der Zustände der CreateProfil Komponente */
        this.state = {
            profile_id: this.props.user.uid,
            favoriteNote_id: 0,
            blockNote_id: 0,
            char_fk: 0,
            char_id: 0,
            profile_fk: 0,
            firstName: null,
            lastName: null,
            age: null,
            gender: null,
            height: null,
            religion: null,
            hair: null,
            smoking: null,
            char_name: null,
            char_desc: null,
            showTextFields: false,
            profileExists: false,
            selectedOption: null,
            minAge: null,
            maxAge: null,
            searchprofile_fk: null,
            income: null,
            favclub: null,
            hobby: null,
            politicaltendency: null,
            aboutme: null,
            SelectCreate: "select",
            customProperties: [],
            editProperty: null,
            updatedCharName: null,
            updatedCharValue: null,
            char_typ: "",
            numOptions: 1,
            userSelections: ['', ],
            selectedOptionIndex: null,
            selections: [],
            openuserchar: false,
            selectedCharNames: [],
            UserSelectNumOptions: 0,
            UserSelectAvSelections: [],
            UserSelectStartingSelections: [],
            UserSelectSelectedOption: null,
            UserEdit: false,
            selectedCharTyp: null,
            selectedCharId: null,
            selectedCharName: null,
            UserUpdate: false,
        };

        /** Bindung der Handler an die Komponente */
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeGender = this.handleChangeGender.bind(this);
        this.handleChangeHeight = this.handleChangeHeight.bind(this);
        this.handleChangeReligion = this.handleChangeReligion.bind(this);
        this.handleChangeSmoking = this.handleChangeSmoking.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.handleChangeSelectedOption = this.handleChangeSelectedOption.bind(this);
        this.handleChangeSalary = this.handleChangeSalary.bind(this);
        this.handleChangeClub = this.handleChangeClub.bind(this);
        this.handleChangeHobbys = this.handleChangeHobbys.bind(this);
        this.handleChangePolitical = this.handleChangePolitical.bind(this);
        this.handleChangeAboutMe = this.handleChangeAboutMe.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);

        this.handleCreateChar = this.handleCreateChar.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSaveInputs = this.handleSaveInputs.bind(this);
        this.handleChangeCharDelete = this.handleChangeCharDelete.bind(this)
        this.handleChangeOpenCharEdit = this.handleChangeOpenCharEdit.bind(this);
        this.handleSaveCharChange = this.handleSaveCharChange.bind(this);
        this.handleNumOptions = this.handleNumOptions.bind(this);
        this.handleSaveInputsSelections = this.handleSaveInputsSelections.bind(this);
        this.handleUserSelectNumOptions = this.handleUserSelectNumOptions.bind(this);
        this.handleChangeCharName = this.handleChangeCharName.bind(this);
        this.handleChangeCharValue = this.handleChangeCharValue.bind(this);
        this.handleUserSelectSaveInputsSelections = this.handleUserSelectSaveInputsSelections.bind(this);

        this.handleInfoSelectCreate = this.handleInfoSelectCreate.bind(this);
        this.handleDeleteReligion = this.handleDeleteReligion.bind(this);
        this.handleDeleteHair = this.handleDeleteHair.bind(this);
        this.handleDeletesmoking = this.handleDeletesmoking.bind(this);
        this.handleDeleteSalary = this.handleDeleteSalary.bind(this);
        this.handleDeleteClub = this.handleDeleteClub.bind(this);
        this.handleDeleteHobbys = this.handleDeleteHobbys.bind(this);
        this.handleDeletePolitical = this.handleDeletePolitical.bind(this);
    };

    /** Abfrage ob ein Profil bereits vorhanden ist oder nicht*/
    componentDidMount() {
        this.checkProfilExc();
        this.getSelectedProperties();
        this.getSelectedPropertiesForCharValuesAndNames();
        this.getAllInfoObjects();
    };

    /**
     * Wenn sich der Wert der numOptions verändert, d.h. der User will eine weitere Auswahl hinzufügen.
     * Es wird der userSelections über das const updatedUserSelections ein weiterer leerer String Übergeben.
     * Dies erstellt ein weiteres Textfeld für den User.
     */

    componentDidUpdate(prevProps, prevState) {
        if (prevState.UserSelectAvSelections !== this.state.UserSelectAvSelections) {
            console.log("Der Zustand UserSelectAvSelections hat sich geändert!", this.state.UserSelectAvSelections);
            console.log("Der prevState.UserSelectAvSelections Zustand UserSelectAvSelections hat sich geändert!", prevState.UserSelectAvSelections);
        }
    }


    /** Handler und API für "checkProfilExc" */
    checkProfilExc() {
        DatingSiteAPI.getAPI()
            .getProfileByID(this.props.user.uid)
            .then((profileBO) => {
                if (profileBO.length === 0) {
                    this.setState({ profileExists: false });
                } else {
                    this.setState({ profileExists: true });
                }
            }).catch((e) =>
                this.setState({
                    error: e,
                })
        );
    };

    /** Abfrage der InfoObjekte für das Profil
     * Es wird ein leeres Objekt namens "selectedProperties" erstellt.
     * Dann wird auf jede erhaltene Eigenschaft aus responseInfoObjects zugegriffen.
     * Die const infoObject ist die Eigenschaft an dem jeweiligen Key.
     * Die const charId entspricht der CharId der vorigen const InfoObject.
     * Der charValue entspricht dem Eigenschaftsnamen der vorigen const InfoObject.
     * In dem Switch-Statement wird zuerst die CharId geprüft und dann dementsprechend ein Wert zugewiesen.
     * Für den Fall, dass die CharId 10 ist, wird bspw. "selectedProperties.firstName = charValue;" gesetzt.
     * Somit können die Eigenschaften eines Profils beim Erstellen gesetzt werden. */
    getSelectedProperties() {
        DatingSiteAPI.getAPI()
            .getInfoObjects(this.props.user.uid)
            .then((responseInfoObjects) => {
                const selectedProperties = {};
                for (const key in responseInfoObjects) {
                    if (responseInfoObjects.hasOwnProperty(key)) {
                        const infoObject = responseInfoObjects[key];
                        const charId = infoObject.char_id;
                        const charValue = infoObject.char_value;
                        switch (charId) {
                            case 30:
                                selectedProperties.apiage = charValue;
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

    /** Diese Funktion wird als "async" markiert, da wir auf den Abschluss des API-Aufrufs für die InfoObjekte warten müssen.
     * Die const customProperties beinhaltet die benutzerdefinierten Eigenschaften.
     * Jedes InfoObjekt, das eine CharID größer als 160 hat, wird zu diesem leeren Objekt hinzugefügt.
     * Die restlichen InfoObjekte werden mithilfe eines Zustands (State) gesetzt.
     * Am Ende wird der Zustand des leeren "customProperties"-Objekts aktualisiert,
     * um daraus die individuellen Eigenschaften und InfoObjekte auslesen zu können. */
    async getSelectedPropertiesForCharValuesAndNames() {
        const customProperties = {};

        try {

            const responseInfoObjects = await DatingSiteAPI.getAPI().getInfoObjects(this.props.user.uid);

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
        } catch (error) {
            console.error("Fehler beim Auslesen der InfoObjekte: ", error);
        }
    }

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

    /** Die getCharNameByID liest den CharName einer gegebenen char_id aus. */
    getCharNameByID(char_id) {
        return DatingSiteAPI.getAPI()
            .getCharName(char_id)
            .then((responseCharName) => {
                return responseCharName;
            })
    }

    /** Event-Handler für die Änderung des Vornamens */
    handleChangeFirstName(event) {
        const newName = event.target.value;
        this.setState({firstName: newName});
    };
    /** Event-Handler für die Änderung des Nachnamens */
    handleChangeLastName(event) {
        const newName = event.target.value;
        this.setState({lastName: newName});
    };
    /** Event-Handler für die Änderung der politischen Ausrichtung */
    handleChangePolitical(event) {
        const newPolitical = event.target.value;
        this.setState({politicaltendency: newPolitical})
    };

    /** Event-Handler für die Löschung der politicaltendency */
    handleDeletePolitical = () => {
        this.setState({ politicaltendency: null });
    };

    /** Event-Handler für die Änderung des Hobbys */
    handleChangeHobbys(event) {
        const newHobbys = event.target.value;
        this.setState({hobby: newHobbys})
    };

    /** Event-Handler für die Löschung der Hobbies */
    handleDeleteHobbys = () => {
        this.setState({ hobby: null });
    };

    /** Event-Handler für die Änderung den Lieblingsverein */
    handleChangeClub(event) {
        const newClub = event.target.value;
        this.setState({favclub: newClub})
    };

    /** Event-Handler für die Löschung des favClubs */
    handleDeleteClub = () => {
        this.setState({ favclub: null });
    };


    /** Event-Handler für die Änderung des Einkommens */
    handleChangeSalary(event) {
        const newSalary = event.target.value;
        this.setState({income: newSalary})
    };

    /** Event-Handler für die Löschung des income */
    handleDeleteSalary = () => {
        this.setState({ income: null });
    };

    /** Event-Handler für die Änderung des Geschlechts */
    handleChangeGender = (event) => {
        const selectedGender = event.target.value;
        this.setState({ gender: selectedGender});
    };

    /** Event-Handler für die Änderung der Größe */
    handleChangeHeight = (event) => {
        const newHeight = event.target.value;
        this.setState({height: newHeight});
    };

    /** Event-Handler für die Änderung der Religion */
    handleChangeReligion = (event) => {
        const selectedReligion = event.target.value;
        this.setState({ religion: selectedReligion});
    };

    /** Event-Handler für die Löschung der religion */
    handleDeleteReligion = () => {
        this.setState({ religion: null });
    };
    /** Event-Handler für die Änderung als Raucher/Nicht-Raucher */
    handleChangeSmoking = (event) => {
        const selectedSmoker = event.target.value;
        this.setState({ smoking: selectedSmoker });
    };

    /** Event-Handler für die Löschung des Raucher-Status */
    handleDeletesmoking = () => {
        this.setState({ smoking: null });
    };

    /** Event-Handler für die Änderung der Haarfarbe */
    handleChangeHair = (event) => {
        const selectedHair = event.target.value;
        this.setState({ hair: selectedHair });
    };

    /** Event-Handler für die Löschung der Haarfarbe */
    handleDeleteHair = () => {
        this.setState({ hair: null });
    };
    /** Event-Handler für die Änderung des Alters */
    handleChangeAge = (date) => {
        const newAge = date.toISOString();
        this.setState({ age: newAge });
    };

    /** Event-Handler für die Änderung des AboutMe */
    handleChangeAboutMe = (event) => {
        const newAboutMe = event.target.value;
        this.setState({ aboutme: newAboutMe})
    };

    /** Event-Handler für die Löschung eines namedChars */
    handleChangeCharDelete = (value) => {
        DatingSiteAPI.getAPI()
            .removeNamedChar(value)
    }

    /** Event-Handler für die Änderung des editProperty */
    handleChangeOpenCharEdit = (charID) => {
        this.setState({ editProperty: charID })
    }

    /** Event-Handler für die Änderung des CharNames */
    handleChangeCharName = (event) => {
        this.setState({ updatedCharName: event.target.value });
    };

    /** Event-Handler für die Änderung des CharValues */
    handleChangeCharValue = (event) => {
        this.setState({ updatedCharValue: event.target.value });
    };

    /** Event-Handler für die Änderung des NamedInfoBO's */
    handleSaveCharChange = (char_id) => {
        const newchar_id = char_id;

        const updatedNamedInfoBO = new NamedInfoObjectBO(
            this.state.id,
            this.props.user.uid,
            this.state.searchprofile_id,
            this.state.char_desc,
            this.state.char_name,
            newchar_id,
            this.state.char_typ)
        DatingSiteAPI.getAPI()
             .updateNamedCharByURL(updatedNamedInfoBO)
             .catch((e) =>
                 this.setState({
                     error: e,
                 })
             );
    };

    /** Event-Handler für das Drücken des Buttons "Profil erstellen" und der API Aufruf */
    handleSubmit(event) {
        event.preventDefault();

        const newProfile = new profileBO(
            this.state.profile_id,
            this.state.favoriteNote_id,
            this.state.blockNote_id,
            this.props.user.uid);

        const newInfoObject = new infoobjectBO(
            this.props.user.uid,
            this.state.char_fk,
            this.state.value,
            this.state.searchprofile_id,
            this.state.age,
            this.state.firstName,
            this.state.gender,
            this.state.hair,
            this.state.height,
            this.state.lastName,
            this.state.religion,
            this.state.smoking,
            this.state.minAge,
            this.state.maxAge,
            this.state.searchprofile_fk,
            this.state.income,
            this.state.favclub,
            this.state.hobby,
            this.state.politicaltendency,
            this.state.aboutme
            )

        DatingSiteAPI.getAPI()
            .addProfile(newProfile)
            .then(() => {
                this.setState({ profileExists: true });
            })
            .catch((e) => {
                this.setState({
                    error: e,
                });
            });

        DatingSiteAPI.getAPI()
            .addInfoObject(newInfoObject)
            .catch((e) =>
                this.setState({
                    error: e,
                })
            );
    };

    /** Event-Handler für die Änderung des showTextFields */
    handleCreateChar = () => {
        this.setState({showTextFields: true});
    };

    /** Event-Handler für die Änderung des Char_Typen */
    handleSelectedChar = (value) => {
        this.setState({ char_typ: value });
    };

    /** Event-Handler für die Änderung des fields */
    handleInputChange = (event, field) => {
        this.setState({ [field]: event.target.value });
    };

    /** Event-Handler für die Änderung der Eingaben eines NamedInfoObjectBO's */
    handleSaveInputs = () => {

        const { char_name, char_desc, char_id } = this.state;

        const newInfoBO = new NamedInfoObjectBO(
            this.state.id,
            this.props.user.uid,
            this.state.searchprofile_id,
            this.state.char_desc,
            this.state.char_name,
            this.state.char_id,
            this.state.char_typ)

        DatingSiteAPI.getAPI()
            .createCharDescForProfile(newInfoBO)
            .catch((e) =>
                this.setState({
                    error: e,
                })
            );
    };

    /** Event-Handler für die Änderung der Auswahlen eines Nutzers */
    handleSaveInputsSelections = async () => {
        try {
            // Schleife über jedes Element der vom User erstellten Auswahlen
            for (let index = 0; index < this.state.userSelections.length; index++) {
                // Der value ist der Wert des aktuellen Elements der vom User erstellten Auswahlen
                const value = this.state.userSelections[index];

                // Wenn der aktuelle value der erstellten Auswahlen, der vom User explizit ausgewählte value ist.
                if (this.state.selectedOptionIndex === index) {

                    // Erstellen eines neuen NamedInfoObjectBO, hier mit einer GoogleID, da dieser value vom User ausgewählt wurde.
                    const newInfoBO = new NamedInfoObjectBO(
                        this.state.id,
                        this.props.user.uid,
                        null,
                        value,
                        this.state.char_name,
                        this.state.char_id,
                        this.state.char_typ
                    );

                    // API-Aufruf zum Erstellen des NamedInfoObjectBO
                    await DatingSiteAPI.getAPI()
                        .createCharDescForProfile(newInfoBO);

                } else {

                    // Erstellen eines neuen NamedInfoObjectBO, hier ohne GoogleID, da dieser value nicht vom User ausgewählt wurde.
                    const newInfoBO = new NamedInfoObjectBO(
                        this.state.id,
                        null,
                        null,
                        value,
                        this.state.char_name,
                        this.state.char_id,
                        this.state.char_typ
                    );

                    await DatingSiteAPI.getAPI()
                        .createCharDescForProfile(newInfoBO);
                }
            }

        } catch (e) {
            this.setState({
                error: e,
            });
        }
    };

    /** Event-Handler für die Änderung des openuserchars */
    handleOpenUserChar = () => {
        this.setState({ openuserchar: true })
    };

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
                            this.props.user.uid,
                            null,
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
                        this.props.user.uid,
                        null,
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
                        this.props.user.uid,
                        null,
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
                    this.props.user.uid,
                    null,
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
                const updatedNamedInfoBO = new NamedInfoObjectBO(
                    this.state.id,
                    this.props.user.uid,
                    null,
                    this.state.UserSelectSelectedOption,
                    this.state.selectedCharName,
                    this.state.selectedCharId,
                    "select")

                console.log("So sieht das BO aus: ", updatedNamedInfoBO)

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

    /** Event-Handler für die Änderung einer selectedOption */
    handleChangeSelectedProperty = (event) => {
        const { selectedCharNames } = this.state
        const selectedProperty = event.target.value;
        const selectedChar = selectedCharNames.find((char) => char.char_id === selectedProperty);
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
                    updatedUserSelectStartingSelections.push(responseCharName.char_value);
                    // Wenn es nicht länger als 1 ist, ist es automatisch eine Auswahl lang.
                    updatedUserSelectNumOptions = 1;
                }
                /**
                 * Setzt die aktuelle Auswahl des Users, direkt auf die tatsächliche Auswahl des Users.
                 * Setzt den Wert, dass ein User hier ein Update macht auf True
                 */
                if (UserData != undefined) { this.setState({ UserSelectSelectedOption:UserData, UserUpdate: true,})}
                /**
                 *  Setzt den State.
                 */
                this.setState((prevState) => {
                    return {
                        UserSelectStartingSelections: updatedUserSelectStartingSelections,
                        UserSelectNumOptions: updatedUserSelectNumOptions,
                        UserEdit: false,
                    };
                },() => {
                    console.log("this.state.UserSelectAvSelections",this.state.UserSelectAvSelections)
                });
                return responseCharName;
            });
    }

    /** Event-Handler für die Änderung eines neuen infoobjectBO's */
    handleUpdate(event) {
        event.preventDefault();

        const newInfoObject = new infoobjectBO(
            this.props.user.uid,
            this.state.char_fk,
            this.state.value,
            this.state.searchprofile_id,
            this.state.age,
            this.state.firstName,
            this.state.gender,
            this.state.hair,
            this.state.height,
            this.state.lastName,
            this.state.religion,
            this.state.smoking,
            this.state.minAge,
            this.state.maxAge,
            this.state.searchprofile_fk,
            this.state.income,
            this.state.favclub,
            this.state.hobby,
            this.state.politicaltendency,
            this.state.aboutme)

        DatingSiteAPI.getAPI()
            .updateInfoObject(newInfoObject)
            .catch((e) =>
                this.setState({
                    error: e,
                })
            );
    };

    /** Handler für die Anzahl an erstellen Auswahlen */
    handleNumOptions() {
        this.setState((prevState) => {
            const updatedUserSelections = [...prevState.userSelections, ''];
            return {
                numOptions: (this.state.numOptions + 1),
                userSelections: updatedUserSelections,
            };
        })
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
     * Handler für Änderungen an Text der Textfelder, beim Erstellen einer vom User erstellten Auswahleigenschaft.
     */
    handleTextFieldChange(event, index) {
        // setzt die const value
        const { value } = event.target;
        this.setState(prevState => {
            const updatedUserSelections = [...prevState.userSelections];
            // setzt den Wert des Indexes des Textfelds, auf den neune value der Eingabe
            updatedUserSelections[index] = value;
            // setzt den Wert der updatedUserSelections in userSelections
            return { userSelections: updatedUserSelections };
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
     * Handlung für, wenn ein User beim Erstellen einer Auswahleigenschaft, eine Mögliche Auswahl wieder entfernen will.
     */
    handleDeleteSelection(index) {
        this.setState(prevState => {
            // Erstellt einen const mit dem Wert von userSelections
            const updatedUserSelections = [...prevState.userSelections];
            // Entfernt ein Element basierend auf dem Index.
            updatedUserSelections.splice(index, 1);
            return {
                // setzt die vom User erstellten Auswahlen, zu dem neuen Wert (ohne den gelöschten Wert)
                userSelections: updatedUserSelections,
                // setzt die höhe der vom User erstellten Auswahlen auf -1 des aktuellen Werts.
                numOptions: (this.state.numOptions - 1)
            };
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

    /** Setzt den Index der vom User ausgewählten Auswahl der von einem User erstellten Eigenschaft (während des erstellens) */
    handleTextFieldSelection(index) {
        this.setState({ selectedOptionIndex: index });
    }

    // Setzt die Auswahl des Users, bei den vom User erstellten InfoObjekten
    handleUserSelectSelection = (event) => {
        this.setState({
            UserSelectSelectedOption: event.target.value,
        });
    }


    /** Handler zum Löschen seines Profils und die dazugehörigen Daten */
    handleRemove(event) {
    event.preventDefault();

    DatingSiteAPI.getAPI()
        .removeProfile(this.props.user.uid)
        .then((profileBOs) => {
            this.setState({
                profileExists: false,
                firstName: "",
                lastName: "",
                age: "",
                gender: "",
                height: "",
                hair: "",
                religion: "",
                smoking: "",
                income: "",
                favclub: "",
                hobby: "",
                politicaltendency: "",
                aboutme: "",
                customProperties: null,
            });
        }).catch((e) =>
            this.setState({
                error: e,
            })
    );
    };

    /** Event-Handler für die Änderung von selectCreate */
    handleInfoSelectCreate = (event, newSelectedValue) => {
        this.setState({ SelectCreate: newSelectedValue });
    };

    /** Event-Handler für die Änderung einer selectedOption */
    handleChangeSelectedOption = event => {
        this.setState({ selectedOption: event.target.value });
    };

    renderContent() {
        const { selectedOption } = this.state;

        if (selectedOption === "selectReligion") {
            return (
                <FormGroup row style={{ justifyContent: 'center' }}>
                    <Box sx={{ width: 400, margin: '0 auto' }}>
                        <FormLabel>Welche religiöse Ansicht hast du?</FormLabel>
                        <div style={{ marginBottom: '1rem' }}>
                            {/** Hier wird der Button dargestellt, ob ein User ein Text eingeben kann oder die Auswahlen sieht*/}
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
                            <TextField label="Eigenes Label hinzufügen" name="Religion" value={this.state.religion} onChange={this.handleChangeReligion} style={{ justifyContent: 'center' }}/>
                        ) : (this.state.SelectCreate === 'delete' ? (
                            <div>...</div>
                        ) : (
                            <RadioGroup row style={{ justifyContent: 'center' }} value={this.state.religion} onChange={this.handleChangeReligion}>
                                <FormControlLabel sx={{ width: '35%' }} value="Atheist" control={<Radio />} label="Atheist" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '35%' }} value="Christlich" control={<Radio />} label="Christlich" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '35%' }} value="Muslimisch" control={<Radio />} label="Muslimisch" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '35%' }} value="Andere" control={<Radio />} label="Andere" labelPlacement="bottom" />
                            </RadioGroup>
                        ))}
                    </Box>
                </FormGroup>
            );
        } else if (selectedOption === "selectHaarfarbe") {
            return (
                <FormGroup row style={{ justifyContent: 'center' }}>
                    <Box sx={{ width: 400, margin: '0 auto' }}>
                        <FormLabel>Welche Haarfarbe hast du?</FormLabel>
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
                            <RadioGroup row style={{ justifyContent: 'center' }} value={this.state.hair} onChange={this.handleChangeHair}>
                                <FormControlLabel sx={{ width: '35%' }} value="Schwarz" control={<Radio />} label="Schwarz" labelPlacement="bottom"/>
                                <FormControlLabel sx={{ width: '35%' }} value="Braun" control={<Radio />} label="Braun" labelPlacement="bottom"/>
                                <FormControlLabel sx={{ width: '35%' }} value="Blond" control={<Radio />} label="Blond" labelPlacement="bottom"/>
                                <FormControlLabel sx={{ width: '35%' }} value="Andere" control={<Radio />} label="Andere" labelPlacement="bottom"/>
                            </RadioGroup>
                        ))}
                    </Box>
                </FormGroup>
            );
        } else if (selectedOption === "selectRaucherstatuts") {
            return (
                <FormGroup row style={{ justifyContent: 'center' }}>
                    <Box sx={{ width: 400, margin: '0 auto' }}>
                        <FormLabel>Rauchst du?</FormLabel>
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
                            <TextField label="Eigenes Label hinzufügen" name="smoking" value={this.state.smoking} onChange={this.handleChangeSmoking} style={{ justifyContent: 'center' }}/>
                        ) : (this.state.SelectCreate === 'delete' ? (
                            <div>...</div>
                        ) : (
                            <RadioGroup row style={{ justifyContent: 'center' }} value={this.state.smoking} onChange={this.handleChangeSmoking}>
                                <FormControlLabel sx={{ width: '25%' }} value="Nicht-Raucher" control={<Radio/>} label="Nicht-Raucher" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '25%' }} value="Raucher" control={<Radio/>} label="Raucher" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '25%' }} value="egal" control={<Radio/>} label="Keine Angabe" labelPlacement="bottom" />
                            </RadioGroup>
                        ))}
                    </Box>
                </FormGroup>
            );
        } else if (selectedOption === "selectGehalt") {
            return (
                <FormGroup row style={{ justifyContent: 'center' }}>
                    <Box sx={{ width: 400, margin: '0 auto' }}>
                        <FormLabel>Wie viel verdienst du?</FormLabel>
                        <div style={{ marginBottom: '1rem' }}>
                            {/** Hier wird der Button gemacht, ob ein User ein Text eingeben kann oder die Auswahlen sieht*/}
                            <ToggleButtonGroup exclusive value={this.state.SelectCreate} onChange={this.handleInfoSelectCreate} aria-label="InfoObject Select Create">
                                <ToggleButton value="select">
                                    <RadioButtonUncheckedIcon/>
                                </ToggleButton>
                                <ToggleButton value="create">
                                <EditNoteIcon/>
                                </ToggleButton>
                                <ToggleButton value="delete" onClick={this.handleDeleteSalary}>
                                    <DeleteOutlineIcon/>
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        {this.state.SelectCreate === 'create' ? (
                            <TextField label="Eigenes Label hinzufügen" name="income" value={this.state.income} onChange={this.handleChangeSalary} style={{ justifyContent: 'center' }}/>
                        ) : (this.state.SelectCreate === 'delete' ? (
                            <div>...</div>
                        ) : (
                            <RadioGroup row style={{ justifyContent: 'center' }}  value={this.state.income} onChange={this.handleChangeSalary}>
                                <FormControlLabel sx={{ width: '35%' }} value="1000" control={<Radio />} label="1000€" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '35%' }} value="1500" control={<Radio />} label="1500€" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '35%' }} value="2000" control={<Radio />} label="2000€" labelPlacement="bottom" /><FormControlLabel sx={{ width: '35%' }} value="3500" control={<Radio />} label="3500€" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '35%' }} value="5000" control={<Radio />} label=">5000€" labelPlacement="bottom" />
                            </RadioGroup>
                        ))}
                    </Box>
                </FormGroup>
            );
        } else if (selectedOption === "selectLieblingsverein") {
            return (
                <FormGroup row style={{ justifyContent: 'center' }}>
                    <Box sx={{ width: 400, margin: '0 auto' }}>
                        <FormLabel>Was ist dein Lieblingsverein?</FormLabel>
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
                            <TextField type={"text"} label="Name des Vereins" name="favclub" value={this.state.favclub} onChange={this.handleChangeClub} style={{ justifyContent: 'center' }} inputProps={{maxLength: 20}}/>
                        )}
                    </Box>
                </FormGroup>
            );
        } else if (selectedOption === "selectHobbys") {
            return (
                <FormGroup row style={{ justifyContent: 'center' }}>
                    <Box sx={{ width: 400, margin: '0 auto' }}>
                        <FormLabel>Welche Hobbys hast du?</FormLabel>
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
                            <TextField type={"text"} label="Deine Hobbys: " name="hobby" value={this.state.hobby} onChange={this.handleChangeHobbys} style={{ justifyContent: 'center' }} inputProps={{maxLength: 20}}/>
                        )}
                    </Box>
                </FormGroup>
            );
        } else if (selectedOption === "selectPolitischeAusrichtung") {
            return (
                <FormGroup row style={{ justifyContent: 'center' }}>
                    <Box sx={{ width: 400, margin: '0 auto' }}>
                        <FormLabel>Was ist deine politische Ausrichtung?</FormLabel>
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
                            <RadioGroup row style={{ justifyContent: 'center' }} value={this.state.politicaltendency} onChange={this.handleChangePolitical}>
                                <FormControlLabel sx={{ width: '25%' }} value="Unpolitisch" control={<Radio />} label="Unpolitisch" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '25%' }} value="Politische Mitte" control={<Radio />} label="Politische Mitte" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '25%' }} value="Liberal" control={<Radio />} label="Liberal" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '25%' }} value="Links" control={<Radio />} label="Links" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '25%' }} value="Rechts" control={<Radio />} label="Rechts" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '25%' }} value="Keine Angabe" control={<Radio />} label="Keine Angabe" labelPlacement="bottom" />
                            </RadioGroup>
                        ))}
                    </Box>
                </FormGroup>
            );
        }
        return null;
    }

    /** render() gibt das HTML zurück, das gerendert werden soll */
    render() {
            const {
                age,
                firstName,
                gender,
                height,
                lastName,
                char_name,
                char_desc,
                showTextFields,
                profileExists,
                apiage,
                selectedOption,
                customProperties,
                aboutme,
                updatedCharName,
                updatedCharValue,
                char_typ,
                openuserchar,
                selectedCharNames,
                selectedCharTyp,
            } = this.state;

            const defaultValue = selectedOption || '';

            return (
                <div>
                    <h1></h1>
                    {/** Box für die gerenderten Items der React Komponente */}
                    <Box sx={{width: {lg: '40%', md: '60%', sm: '80%'}, margin: '0 auto'}}>
                        <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} sx={{alignItems: 'stretch'}}>
                            <Item>
                                <FormLabel> Wie lautet dein Name? </FormLabel>
                                <FormGroup row style={{justifyContent: 'center'}}>
                                    <Box sx={{width: 200, margin: '0 auto', marginBottom: '10px'}}>
                                        {/** Textfeld für den Vornamen */}
                                        <TextField
                                            type={"text"}
                                            value={firstName}
                                            onChange={this.handleChangeFirstName}
                                            inputProps={{
                                                maxLength: 17,
                                            }}
                                        />
                                    </Box>
                                    <Box sx={{width: 200, margin: '0 auto', marginBottom: '10px'}}>
                                        {/** Textfeld für den Nachnamen */}
                                        <TextField
                                            type="text"
                                            value={lastName}
                                            onChange={this.handleChangeLastName}
                                            inputProps={{
                                                maxLength: 17,
                                            }}
                                        />
                                    </Box>
                                </FormGroup>
                            </Item>
                            {profileExists ? (
                                <Item>
                                    <FormGroup row style={{ justifyContent: 'center' }}>
                                        <Box sx={{ width: 200, margin: '0 auto' }}>
                                            <FormLabel>Dein Alter:</FormLabel>
                                            {/** Hier wird das Geburstdatum angezeigt */}
                                            <p>{apiage}</p>
                                        </Box>
                                    </FormGroup>
                                </Item>
                            ) : (
                                <Item>
                                    <FormGroup row style={{ justifyContent: 'center' }}>
                                        <Box sx={{ width: 200, margin: '0 auto' }}>
                                            <FormLabel>Wann wurdest du geboren?</FormLabel>
                                            {/** Hier kann das Geburtsdatum ausgewählt werden wenn kein Profil exsitiert */}
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    value={age}
                                                    onChange={this.handleChangeAge}
                                                    label="Datum"
                                                />
                                            </LocalizationProvider>
                                        </Box>
                                    </FormGroup>
                                </Item>
                            )}
                            <Item>
                                <FormGroup row style={{justifyContent: 'center'}}>
                                    <Box sx={{width: 400, margin: '0 auto'}}>
                                        <FormLabel> Was für ein Geschlecht hast du ? </FormLabel>
                                        {/** Auswahlbuttons für das Geschlecht */}
                                        <RadioGroup row value={gender} onChange={this.handleChangeGender}>
                                            <FormControlLabel sx={{ width: '40%' }} value="männlich" control={<Radio/>} label="Männlich" labelPlacement="bottom"/>
                                            <FormControlLabel sx={{ width: '40%' }} value="weiblich" control={<Radio/>} label="Weiblich" labelPlacement="bottom"/>
                                        </RadioGroup>
                                    </Box>
                                </FormGroup>
                            </Item>
                            <Item>
                                <FormGroup row style={{justifyContent: 'center'}}>
                                    <Box sx={{width: 150, margin: '0 auto'}}>
                                        <FormLabel> Wie Groß bist du? </FormLabel>
                                        {/** Eingabefeld für die Größe */}
                                        <TextField
                                            type={"number"}
                                            value={height}
                                            onChange={this.handleChangeHeight}
                                            inputProps={{
                                                min: 100,
                                                max: 999,
                                                pattern: "\\d{3}",
                                            }}
                                        />
                                    </Box>
                                </FormGroup>
                            </Item>
                            {/** Ab hier ein DropdownMenü das Religio, Smoker, Haarfarbe, Gehaltvorstellung, Lieblingsverein, Bildungsstatus, Hobbys, Politik, Über Mich*/}
                            <Item>
                                <FormGroup row style={{justifyContent: 'center'}}>
                                    <Box sx={{width: 450, margin: '0 auto'}}>
                                        <FormControl fullWidth>
                                            <InputLabel> Weitere Eigenschaften </InputLabel>
                                            <Select
                                                value={defaultValue}
                                                label="Weitere Eigenschaften"
                                                onChange={this.handleChangeSelectedOption}
                                            >
                                                <MenuItem value="selectReligion">Religion</MenuItem>
                                                <MenuItem value="selectRaucherstatuts">Raucherstatus</MenuItem>
                                                <MenuItem value="selectHaarfarbe">Haarfarbe</MenuItem>
                                                <MenuItem value="selectGehalt">Gehalt</MenuItem>
                                                <MenuItem value="selectLieblingsverein">Lieblingsverein</MenuItem>
                                                <MenuItem value="selectHobbys">Hobbys</MenuItem>
                                                <MenuItem value="selectPolitischeAusrichtung">Politische Ausrichtung</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {this.renderContent()}
                                    </Box>
                                </FormGroup>
                            </Item>
                            <Item>
                                <FormGroup row style={{justifyContent: 'center'}}>
                                    <Box sx={{width: 400, margin: '0 auto', height: 200}}>
                                        <FormLabel> Erzähle uns von dir! </FormLabel>
                                        {/** Eingabefeld für sich selber */}
                                        <TextField
                                            fullWidth
                                            type={"text"}
                                            value={aboutme}
                                            multiline
                                            rows={5}
                                            onChange={this.handleChangeAboutMe}
                                            inputProps={{
                                                maxLength: 128,
                                            }}
                                        />
                                    </Box>
                                </FormGroup>
                            </Item>
                            <Item>
                                <FormGroup row style={{justifyContent: 'center'}}>
                                    <Box sx={{width: 400, margin: '0 auto'}}>
                                        {
                                            customProperties &&
                                            Object.entries(customProperties).map(([key, value], index) => {
                                                if (
                                                    typeof value === 'object' &&
                                                    value.hasOwnProperty('char_id') &&
                                                    value.hasOwnProperty('char_name')
                                                ) {

                                                    const isEditOpen = this.state.editProperty === value.char_id;

                                                    return (
                                                        <Box key={value.char_value} sx={{ width: 400, margin: '0 auto' }}>
                                                            <FormGroup row style={{ justifyContent: 'center' }}>
                                                                <Box sx={{ width: 150, margin: '0 auto' }}>
                                                                    <p>
                                                                        <strong>Eigenschaftsname:</strong>
                                                                    </p>
                                                                    <p>{value.char_name[0]}</p>
                                                                </Box>
                                                                <Box sx={{ width: 150, margin: '0 auto' }}>
                                                                    <p>
                                                                        <strong>Beschreibung:</strong>
                                                                    </p>
                                                                    <p>{value.char_value}</p>
                                                                </Box>
                                                                <Box sx={{ width: 150, margin: '0 auto' }}>
                                                                    <Button
                                                                        variant="contained"
                                                                        color="error"
                                                                        onClick={() => this.handleChangeCharDelete(value.char_value)}
                                                                        startIcon={<DeleteIcon />}
                                                                    > Löschen </Button>
                                                                    <Button
                                                                        sx={{ marginTop: '5%' }}
                                                                        variant="contained"
                                                                        onClick={() => this.handleChangeOpenCharEdit(value.char_id)}
                                                                        startIcon={<BorderColorIcon />}
                                                                    > Anpassen </Button>
                                                                    {isEditOpen && (
                                                                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '5%' }}>
                                                                            <FormGroup row style={{ justifyContent: 'center' }}>
                                                                                <FormLabel> Ändere hier den Eigenschaftsnamen und die Eigenschaftsbeschreibung: </FormLabel>
                                                                                <TextField
                                                                                    label="Eigenschaftsname"
                                                                                    name="char_name"
                                                                                    defaultValue={value.char_name[0]}
                                                                                    value={this.state.char_name}
                                                                                    onChange={(event) => this.handleInputChange(event, 'char_name')}
                                                                                    size="small"
                                                                                    fullWidth
                                                                                    sx={{ mb: 2, width: '250px', margin: '15px' }}
                                                                                />
                                                                                <TextField
                                                                                    label="Eigenschaftsbeschreibung"
                                                                                    name="char_desc"
                                                                                    defaultValue={value.char_value}
                                                                                    value={this.state.char_desc}
                                                                                    onChange={(event) => this.handleInputChange(event, 'char_desc')}
                                                                                    size="small"
                                                                                    fullWidth
                                                                                    sx={{ mb: 2, width: '250px', margin: '15px' }}
                                                                                />
                                                                                <Button sx={{ mb: 2 }} variant="contained" onClick={() => this.handleSaveCharChange(value.char_id)} startIcon={<SaveIcon />}>Speichern</Button>
                                                                            </FormGroup>
                                                                        </Box>
                                                                    )}
                                                                </Box>
                                                            </FormGroup>
                                                        </Box>
                                                    );
                                                }
                                                return null;
                                            })}
                                    </Box>
                                </FormGroup>
                            </Item>
                            {/** Wenn ein Profil vorhanden ist, sollen die Buttons Eigenschaft/Löschen/Update angezeigt werden */}
                            {profileExists && (
                                <Item>
                                    <FormGroup row style={{ justifyContent: 'center' }}>
                                        <Box sx={{ width: 400, margin: '0 auto' }}>
                                            <Button onClick={this.handleCreateChar} variant="contained" startIcon={<BorderColorIcon />}> Eigenschaft erstellen! </Button>
                                            {showTextFields && (
                                                <>
                                                    <Box sx={{ marginBottom: '10px', marginTop: '5%' }}>
                                                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                            <Button
                                                                onClick={() => this.handleSelectedChar("text")}
                                                                startIcon={<ArticleIcon/>}
                                                            > Texteigenschaft </Button>
                                                            <Button
                                                                onClick={() => this.handleSelectedChar("select")}
                                                                endIcon={<RadioButtonUncheckedIcon/>}
                                                            > Auswahleigenschaft </Button>
                                                        </ButtonGroup>
                                                    </Box>
                                                    {char_typ === "select" && (
                                                        <>
                                                        <Box sx={{ marginBottom: '10px', marginTop: '5%' }}>
                                                            <FormLabel sx={{ marginBottom: '10px', marginTop: '5%' }}> Erstelle deine eigene Auswahleigenschaft: </FormLabel>
                                                            <TextField label="Eigenschaftsname" fullWidth size="small" value={this.state.char_name} onChange={(event) => this.handleInputChange(event, 'char_name')}/>
                                                        </Box>
                                                        <Box sx={{ marginBottom: '10px', marginTop: '5%' }}>
                                                            <FormLabel sx={{ marginBottom: '10px', marginTop: '5%' }}> Erstelle hier die passenden Auswahlen: </FormLabel>
                                                            {this.state.userSelections.map((value, index) => (
                                                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', marginTop: '5%' }}>
                                                                    <TextField label="Auswahlname"  size="small"
                                                                               value={this.state.userSelections[index] || ''}
                                                                               onChange={(event) => this.handleTextFieldChange(event, index)}
                                                                               onClick={() => this.handleTextFieldSelection(index)}
                                                                               style={this.state.selectedOptionIndex === index ? { backgroundColor: '#c1ff7a' } : null}
                                                                    ></TextField>
                                                                    <Fab color="error" aria-label="delete" size="small" onClick={() => this.handleDeleteSelection(index)}>
                                                                        <DeleteIcon></DeleteIcon>
                                                                    </Fab>
                                                                </Box>
                                                            ))}
                                                            <Box sx={{ marginBottom: '10px' }}>
                                                                 <Fab onClick={this.handleNumOptions} color="primary" aria-label="add" sx={{ marginLeft: '5px' }}>
                                                                     <AddIcon />
                                                                 </Fab>
                                                            </Box>
                                                            <Box sx={{ marginBottom: '10px' }}>
                                                                <Button onClick={this.handleSaveInputsSelections} variant="contained" startIcon={<SaveIcon />}> Erstellen </Button>
                                                            </Box>
                                                        </Box>
                                                        </>
                                                    )}
                                                    {char_typ === "text" && (
                                                        <>
                                                        <Box sx={{ marginBottom: '10px', marginTop: '5%' }}>
                                                            <FormLabel sx={{ marginBottom: '10px', marginTop: '5%' }}> Erstelle deine eigene Eigenschaft: </FormLabel>
                                                            <TextField label="Eigenschaftsname" fullWidth size="small" value={this.state.char_name} onChange={(event) => this.handleInputChange(event, 'char_name')} />
                                                        </Box>
                                                        <Box sx={{ marginBottom: '10px' }}>
                                                            <TextField label="Beschreibung" value={this.state.char_desc} fullWidth size="small" onChange={(event) => this.handleInputChange(event, 'char_desc')} />
                                                        </Box>
                                                        <Box sx={{ marginBottom: '10px' }}>
                                                            <Button onClick={this.handleSaveInputs} variant="contained" startIcon={<SaveIcon />}> Erstellen </Button>
                                                        </Box>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </Box>
                                    </FormGroup>
                                </Item>
                            )}
                            {profileExists && (
                                <Item>
                                    <Box sx={{ width: 400, margin: '0 auto' }}>
                                        <FormGroup row style={{ justifyContent: 'center' }}>
                                            <Button onClick={this.handleOpenUserChar} variant="contained"  startIcon={<AddIcon />}> Eigenschaftsvorschläge </Button>
                                            {openuserchar && (
                                                <Box sx={{ width: 400, margin: '0 auto', marginTop: '5%' }}>
                                                    <FormGroup row style={{ justifyContent: 'center' }}>
                                                        <FormControl fullWidth>
                                                            <InputLabel> Bereits erstellte Eigenschaften </InputLabel>
                                                            <Select
                                                                value={defaultValue}
                                                                lable="Vorschläge"
                                                                onChange={this.handleChangeSelectedProperty}
                                                            >
                                                                {selectedCharNames &&
                                                                    selectedCharNames.map((char, index) => (
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
                            )}
                            {profileExists && (
                                <Item>
                                    <FormGroup row style={{ justifyContent: 'center' }}>
                                        <Box sx={{ width: 400, margin: '0 auto' }}>
                                            <Button onClick={this.handleRemove} variant="contained" color="error" startIcon={<DeleteIcon />}> Profil löschen! </Button>
                                        </Box>
                                    </FormGroup>
                                </Item>
                            )}
                            {profileExists && (
                                <Item>
                                    <Button onClick={this.handleUpdate} variant="contained" color="warning" startIcon={<SaveIcon />}> Profil Update </Button>
                                </Item>
                            )}
                            {/** Falls kein Profil vorhanden ist soll nur der Button "Profil erstellen" wird */}
                            {!profileExists && (
                                <Item>
                                    {/** Button für die Profilerstellung */}
                                    <Button onClick={this.handleSubmit} variant="contained"  startIcon={<AddIcon />}>Profil erstellen</Button>
                                </Item>
                            )}
                            {profileExists && (
                                <Item>
                                    {/** Button für das anzeigen seines eigenes Profils */}
                                    <Link to={`/Profile/${this.props.user.uid}`}>
                                        <Button variant="contained" color="inherit" startIcon={<AccountCircleIcon />}>Profil anzeigen</Button>
                                    </Link>
                                </Item>
                            )}
                        </Stack>
                    </Box>
                    <span></span>
                </div>
            );
    }
}

export default CreateProfil;