import { Component, useState } from "react";
import Stack from "@mui/material/Stack";
import Item from "../theme";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import {Button, TextField} from "@mui/material";
import * as React from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DatingSiteAPI, { getProfileByID, addInfoObject } from '../api/DatingSiteAPI';
import profileBO from "../api/ProfileBO";
import characteristicBO from "../api/CharacteristicBO"
import infoobjectBO from "../api/InfoObjectBO";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import Characteristic from "../api/CharacteristicBO";
import PropTypes from 'prop-types';
import AddIcon from "@mui/icons-material/Add";
import * as properties from "react-bootstrap/ElementChildren";

class CreateProfil extends Component {
    constructor(props) {
        super(props);
        /** Initalisierung der Zustände der CreateProfil Komponente */
        this.state = {
            profile_id: this.props.user.uid,
            favoriteNote_id: 0,
            blockNote_id: 0,
            char_fk: 0,
            profile_fk: 0,
            firstName: '',
            lastName: '',
            age: '',
            gender: '',
            height: '',
            religion: '',
            hair: '',
            smoking: '',
            char_name: '',
            char_desc: '',
            showTextFields: false,
            profileExists: false,
            properties: [],
        };

        /** Bindung der Handler an die Komponente */
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeGender = this.handleChangeGender.bind(this);
        this.handleChangeHeight = this.handleChangeHeight.bind(this);
        this.handleChangeReligion = this.handleChangeReligion.bind(this);
        this.handleChangeSmoking = this.handleChangeSmoking.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleCreateChar = this.handleCreateChar.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSaveInputs = this.handleSaveInputs.bind(this);
    };

    /** Abfrage ob ein Profil bereits vorhanden ist oder nicht*/
    componentDidMount() {
        this.checkProfilExc();
    };

    /** Handler und API für "checkProfilExc" */
    checkProfilExc() {
      const profile_id = this.props.user.uid;
      DatingSiteAPI.getAPI()
          .getProfileByID(profile_id)
          .then((profileBOs) => {
              this.setState({ profileExists: true })
          }).catch((e) =>
                this.setState({
                    error: e,
                })
            );
    };

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
    /** Event-Handler für die Änderung als Raucher/Nicht-Raucher */
    handleChangeSmoking = (event) => {
        const selectedSmoker = event.target.value;
        this.setState({ smoking: selectedSmoker });
    };
    /** Event-Handler für die Änderung der Haarfarbe */
    handleChangeHair = (event) => {
        const selectedHair = event.target.value;
        this.setState({ hair: selectedHair });
    };
    /** Event-Handler für die Änderung des Alters */
    handleChangeAge = (date) => {
        const newAge = date.toISOString();
        this.setState({ age: newAge });
    };
    /** Event-Handler für das Drücken des Buttons "Profil erstellen" und der API Aufruf */
    handleSubmit(event) {
        console.log(this.state)
        event.preventDefault();
        const newProfile = new profileBO(this.props.user.uid, this.state.favoriteNote_id, this.state.blockNote_id);
        const newInfoObject = new infoobjectBO(
            this.state.char_fk,
            this.state.profile_fk,
            this.state.age,
            this.state.firstName,
            this.state.gender,
            this.state.hair,
            this.state.height,
            this.state.lastName,
            this.state.religion,
            this.state.smoking)

        DatingSiteAPI.getAPI()
            .addProfile(newProfile)
            .catch((e) =>
                this.setState({
                    error: e,
                })
            );

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

    handleInputChange = (event, field, index) => {
        const { properties } = this.state;
        properties[index][field] = event.target.value;
        this.setState({ properties });
    };

    handleSaveInputs = () => {
        console.log(this.state)
        const { properties } = this.state;
        const { char_name, char_desc } = this.state;
        const newProperty = {
            name: char_name,
            description: char_desc
        };
        const updatedProperties = [...properties, newProperty];

        this.setState({ properties: updatedProperties, char_name: '', char_desc: ''})
        this.setState({ char_name: char_name, char_desc: char_desc})
        const createdCharForProfile = new Characteristic(this.state._aid ,this.state._name);
        DatingSiteAPI.getAPI()
            .createCharForProfile(createdCharForProfile)
            .catch((e) => {
                this.setState({
                    error: e
                });
            });
    };

    renderProperties() {
      const { Properties } = this.state

      return properties.map((property, index) => (
            <div key={index}>
                <input
                value={property.name}
                onChange={(event) => this.handleInputChange(event, index, 'name')}
                />
                <input
                value={property.description}
                onChange={(event) => this.handleInputChange(event, index, 'description')}
                />
            </div>
      ));
    };

    handleUpdate(event) {
        console.log(this.state)
        event.preventDefault();
        const updatedProfile = new profileBO(this.props.user.uid, this.state.favoriteNote_id, this.state.blockNote_id);
        DatingSiteAPI.getAPI()
            .updateProfile(updatedProfile)
            .catch((e) =>
                this.setState({
                    error: e,
                })
            );
    };

    handleRemove(event) {
        console.log(this.state)
        event.preventDefault();
        const removedProfile  = new profileBO(this.props.user.uid, this.state.favoriteNote_id, this.state.blockNote_id);
        DatingSiteAPI.getAPI()
            .removeProfile(removedProfile)
            .catch((e) =>
                this.setState({
                    error: e,
                })
            );
    };

    /** render() gibt das HTML zurück, das gerendert werden soll */
    render() {
            const {
                firstName,
                lastName,
                age,
                gender,
                height,
                religion,
                hair,
                smoking,
                char_name,
                char_desc,
                showTextFields,
                profileExists,
            } = this.state;
            return (
            <div>
                <h1></h1>
                {/** Box für die gerenderten Items der React Komponente */}
                <Box sx={{width: {lg: '40%', md: '60%', sm: '80%'}, margin: '0 auto'}}>
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={1}
                           sx={{alignItems: 'stretch'}}>
                        <Item>
                            <FormLabel> Wie lautet dein Name? </FormLabel>
                            <FormGroup row style={{justifyContent: 'center'}}>
                                <Box sx={{width: 200, margin: '0 auto', marginBottom: '10px'}}>
                                    {/** Textfeld für den Vornamen */}
                                    <TextField
                                        type={"text"}
                                        label={"Vorname"}
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
                                        label="Nachname"
                                        value={lastName}
                                        onChange={this.handleChangeLastName}
                                        inputProps={{
                                            maxLength: 17,
                                        }}
                                    />
                                </Box>
                            </FormGroup>
                        </Item>
                        <Item>
                            <FormGroup row style={{justifyContent: 'center'}}>
                            <Box sx={{width: 200, margin: '0 auto'}}>
                                <FormLabel> Wann wurdest du geboren? </FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        {/** Datepicker für das Geburtsdatum, ReactMUI der einen Kalender rendert bzw. ausgibt */}
                                        <DatePicker
                                            value={age}
                                            onChange={this.handleChangeAge}
                                            label="Datum"
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>
                            </FormGroup>
                        </Item>
                        <Item>
                            <FormGroup row style={{justifyContent: 'center'}}>
                            <Box sx={{width: 400, margin: '0 auto'}}>
                                <FormLabel> Was für ein Geschlecht hast du ? </FormLabel>
                                {/** Auswahlbuttons für das Geschlecht */}
                                <RadioGroup row value={gender} onChange={this.handleChangeGender}>
                                    <FormControlLabel sx={{ width: '25%' }} value="male" control={<Radio/>} label="Mann" labelPlacement="bottom"/>
                                    <FormControlLabel sx={{ width: '25%' }} value="female" control={<Radio/>} label="Frau" labelPlacement="bottom"/>
                                    <FormControlLabel sx={{ width: '25%' }} value="various" control={<Radio/>} label="Divers" labelPlacement="bottom"/>
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
                                    label={'cm'}
                                    inputProps={{
                                        min: 100,
                                        max: 999,
                                        pattern: "\\d{3}",
                                    }}
                                />
                            </Box>
                            </FormGroup>
                        </Item>
                        <Item>
                            <FormGroup row style={{justifyContent: 'center'}}>
                            <Box sx={{width: 400, margin: '0 auto'}}>
                                <FormLabel> Welcher Religion gehörst du an? </FormLabel>
                                {/** Auswahlbuttons für die Religion */}
                                <RadioGroup row value={religion} onChange={this.handleChangeReligion}>
                                    <FormControlLabel sx={{ width: '25%' }} value="atheist" control={<Radio />} label="Atheist" labelPlacement="bottom" />
                                    <FormControlLabel sx={{ width: '25%' }} value="christianity" control={<Radio />} label="Christlich" labelPlacement="bottom" />
                                    <FormControlLabel sx={{ width: '25%' }} value="islam" control={<Radio />} label="Budistisch" labelPlacement="bottom" />
                                    <FormControlLabel sx={{ width: '25%' }} value="judaism" control={<Radio />} label="Jüdisch" labelPlacement="bottom" />
                                    <FormControlLabel sx={{ width: '25%' }} value="buddhism" control={<Radio />} label="Muslimisch" labelPlacement="bottom" />
                                    <FormControlLabel sx={{ width: '25%' }} value="orthodox" control={<Radio />} label="Orthodox" labelPlacement="bottom" />
                                </RadioGroup>
                            </Box>
                            </FormGroup>
                        </Item>
                        <Item>
                            <FormGroup row style={{justifyContent: 'center'}}>
                            <Box sx={{width: 400, margin: '0 auto'}}>
                                <FormLabel> Welche Haarfarbe du? </FormLabel>
                                {/** Auswahlbuttons für die Haarfarbe */}
                                <RadioGroup row value={hair} onChange={this.handleChangeHair}>
                                    <FormControlLabel sx={{ width: '10%' }} value="black" control={<Radio />} label="Schwarz" labelPlacement="bottom" />
                                    <FormControlLabel sx={{ width: '10%' }} value="brown" control={<Radio />} label="Braun" labelPlacement="bottom" />
                                    <FormControlLabel sx={{ width: '10%' }} value="blond" control={<Radio />} label="Blond" labelPlacement="bottom" />
                                    <FormControlLabel sx={{ width: '10%' }} value="red" control={<Radio />} label="Rot" labelPlacement="bottom" />
                                    <FormControlLabel sx={{ width: '10%' }} value="gray" control={<Radio />} label="Grau" labelPlacement="bottom" />
                                </RadioGroup>
                            </Box>
                            </FormGroup>
                        </Item>
                        <Item>
                            <FormGroup row style={{justifyContent: 'center'}}>
                            <Box sx={{width: 400, margin: '0 auto'}}>
                                <FormLabel> Rauchst du ? </FormLabel>
                                {/** Buttons für die Auswahl als Raucher */}
                                <RadioGroup row value={smoking} onChange={this.handleChangeSmoking}>
                                    <FormControlLabel sx={{ width: '50%' }} value="nonSmoker" control={<Radio />} label="Nicht-Raucher" labelPlacement="bottom" />
                                    <FormControlLabel sx={{ width: '15%' }} value="smoker" control={<Radio />} label="Raucher" labelPlacement="bottom" />
                                </RadioGroup>
                            </Box>
                            </FormGroup>
                        </Item>
                        <Item>
                            <FormGroup row style={{justifyContent: 'center'}}>
                                <Box sx={{width: 400, margin: '0 auto'}}>
                                    {/** Liste die für jede Eigenschaft erstellt werden kann */}
                                    {this.state.properties && this.state.properties.map((property, index) => (
                                        <Item key={index}>
                                            <h3>{property.name}</h3>
                                            <p>{property.description}</p>
                                        </Item>
                                    ))}
                                </Box>
                            </FormGroup>
                        </Item>
                        {/** Wenn ein Proifl vorhanden ist sollen die Buttons Eigenschaft/Löschen/Update angezeigt werden */}
                        {profileExists && (
                        <Item>
                            <FormGroup row style={{ justifyContent: 'center' }}>
                                <Box sx={{ width: 400, margin: '0 auto' }}>
                                    <Button onClick={this.handleCreateChar} variant="outlined" startIcon={<BorderColorIcon />}> Eigenschaft erstellen! </Button>
                                    {showTextFields && (
                                    <>
                                    <Box sx={{ marginBottom: '10px' }}>
                                        <TextField label="Eigenschaftsname" value={char_name} onChange={(event) => this.handleInputChange(event, 'char_name')} />
                                    </Box>
                                    <Box sx={{ marginBottom: '10px' }}>
                                        <TextField label="Beschreibung" value={char_desc} onChange={(event) => this.handleInputChange(event, 'char_desc')} />
                                    </Box>
                                    <Box sx={{ marginBottom: '10px' }}>
                                        <Button onClick={this.handleSaveInputs} variant="outlined" startIcon={<SaveIcon />}> Speichern </Button>
                                    </Box>
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
                                <Button onClick={this.handleRemove} variant="outlined" startIcon={<DeleteIcon />}> Profil löschen! </Button>
                            </Box>
                        </FormGroup>
                    </Item>
                    )}
                    {profileExists && (
                    <Item>
                        <Button onClick={this.handleUpdate} variant="outlined" startIcon={<SaveIcon />}> Profil Update </Button>
                    </Item>
                    )}
                    {/** Falls kein Profil vorhanden ist soll nur der Button "Profil erstellen" wird */}
                    {!profileExists && (
                    <Item>
                    {/** Button für die Profilerstellung */}
                        <Button onClick={this.handleSubmit} variant="outlined" startIcon={<AddIcon />}>Profil erstellen</Button>
                    </Item>
                    )}
                    </Stack>
                </Box>
                <span></span>
            </div>
            );
        }
}

CreateProfil.propTypes = {
    currentUser: PropTypes.string.isRequired,
};

export default CreateProfil;