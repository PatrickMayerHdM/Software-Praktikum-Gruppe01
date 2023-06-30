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
        this.handleCharValueChange = this.handleCharValueChange.bind(this);
        this.handleCharNameChange = this.handleCharNameChange.bind(this);
        this.handleNumOptions = this.handleNumOptions.bind(this);
        this.handleSaveInputsSelections = this.handleSaveInputsSelections.bind(this);

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
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.numOptions !== this.state.numOptions) {
            this.setState(prevState => {
                const { numOptions, userSelections } = prevState;
                const updatedUserSelections = [...userSelections];

                while (updatedUserSelections.length < numOptions) {
                    updatedUserSelections.push('');
                }

                return { userSelections: updatedUserSelections };
            });
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

    /** Abfrage der InfoObjekte für das Profil */
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

    handleDeletePolitical = () => {
        this.setState({ politicaltendency: null });
    };

    /** Event-Handler für die Änderung des Hobbys */
    handleChangeHobbys(event) {
        const newHobbys = event.target.value;
        this.setState({hobby: newHobbys})
    };

    handleDeleteHobbys = () => {
        this.setState({ hobby: null });
    };

    /** Event-Handler für die Änderung den Lieblingsverein */
    handleChangeClub(event) {
        const newClub = event.target.value;
        this.setState({favclub: newClub})
    };

    handleDeleteClub = () => {
        this.setState({ favclub: null });
    };


    /** Event-Handler für die Änderung des Einkommens */
    handleChangeSalary(event) {
        const newSalary = event.target.value;
        this.setState({income: newSalary})
    };

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
    handleDeleteReligion = () => {
        this.setState({ religion: null });
    };
    /** Event-Handler für die Änderung als Raucher/Nicht-Raucher */
    handleChangeSmoking = (event) => {
        const selectedSmoker = event.target.value;
        this.setState({ smoking: selectedSmoker });
    };

    handleDeletesmoking = () => {
        this.setState({ smoking: null });
    };

    /** Event-Handler für die Änderung der Haarfarbe */
    handleChangeHair = (event) => {
        const selectedHair = event.target.value;
        this.setState({ hair: selectedHair });
    };
    handleDeleteHair = () => {
        this.setState({ hair: null });
    };
    /** Event-Handler für die Änderung des Alters */
    handleChangeAge = (date) => {
        const newAge = date.toISOString();
        this.setState({ age: newAge });
    };

    handleChangeAboutMe = (event) => {
        const newAboutMe = event.target.value;
        this.setState({ aboutme: newAboutMe})
    };

    handleChangeCharDelete = (value) => {
        DatingSiteAPI.getAPI()
            .removeNamedChar(value)
    }

    handleChangeOpenCharEdit = (charID) => {
        this.setState({ editProperty: charID })
    }

    handleCharNameChange = (event) => {
        const newCharName = event.target.value;
        this.setState({ updatedCharName: newCharName })
    }
    
    handleCharValueChange = (event) => {
        const newCharValue = event.target.value;
        this.setState({ updatedCharValue: newCharValue})
    }
    

     handleSaveCharChange = (char_id) => {
        const newchar_id = char_id;

        const { updatedCharName, updatedCharValue } = this.state;

        const updatedNamedInfoBO = new NamedInfoObjectBO(
            this.state.id,
            this.props.user.uid,
            this.state.searchprofile_id,
            this.state.updatedCharValue,
            this.state.updatedCharName,
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

    handleCreateChar = () => {
        this.setState({showTextFields: true});
    };

    handleSelectedChar = (value) => {
        this.setState({ char_typ: value });
    };

    handleInputChange = (event, field) => {
        this.setState({ [field]: event.target.value });
    };
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

    handleSaveInputsSelections = () => {


        this.state.userSelections.forEach((value, index) => {
            if (this.state.selectedOptionIndex === index) {
                console.log(value, "ist die ausgewählte Auswahl")
                const { char_name, char_desc, char_id } = this.state;

                const newInfoBO = new NamedInfoObjectBO(
                    this.state.id,
                    this.props.user.uid,
                    null,
                    value,
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
            } else {
                console.log(value)
                const { char_name, char_desc, char_id } = this.state;

                const newInfoBO = new NamedInfoObjectBO(
                    this.state.id,
                    null,
                    null,
                    value,
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
            }
        })
    }

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

    /** Handler für die Anzahl an erstellen Auswahlen*/
    handleNumOptions() {
        console.log(this.state.numOptions)
        this.setState({numOptions: (this.state.numOptions + 1)})
    }

    handleTextFieldChange(event, index) {
        const { value } = event.target;
        this.setState(prevState => {
            const updatedUserSelections = [...prevState.userSelections];
            updatedUserSelections[index] = value;
            return { userSelections: updatedUserSelections };
        });
    }

    handleDeleteSelection(index) {
        this.setState(prevState => {
            const updatedUserSelections = [...prevState.userSelections];
            updatedUserSelections.splice(index, 1);
            return {
                userSelections: updatedUserSelections,
                numOptions: (this.state.numOptions - 1)
            };
        });
    }

    handleTextFieldSelection(index) {
        this.setState({ selectedOptionIndex: index });
    }


    /** Handler zum löschen seines Profils und die dazugehörigen Daten */
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

    handleInfoSelectCreate = (event, newSelectedValue) => {
        this.setState({ SelectCreate: newSelectedValue });
    };

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
                                                                                <FormLabel> Gib deine angepassten Eigenschaftsnamen und Infos hier ein: </FormLabel>
                                                                                <TextField
                                                                                    label="Eigenschaftsname"
                                                                                    value={updatedCharName}
                                                                                    onChange={this.handleCharNameChange}
                                                                                    size="small"
                                                                                    fullWidth
                                                                                    sx={{ mb: 2, width: '250px', margin: '15px' }}
                                                                                />
                                                                                <TextField
                                                                                    label="Eigenschaftsbeschreibung"
                                                                                    value={updatedCharValue}
                                                                                    onChange={this.handleCharValueChange}
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
                                                            <TextField label="Eigenschaftsname" fullWidth size="small" value={this.state.char_name} onChange={(event) => this.handleInputChange(event, 'char_name')} />
                                                        </Box>
                                                        <Box sx={{ marginBottom: '10px', marginTop: '5%' }}>
                                                            <FormLabel sx={{ marginBottom: '10px', marginTop: '5%' }}> Erstelle hier die passenden Auswahlen: </FormLabel>
                                                            {this.state.userSelections.map((value, index) => (
                                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', marginTop: '5%' }}>
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