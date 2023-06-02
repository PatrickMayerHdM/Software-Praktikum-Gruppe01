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
import DatingSiteAPI, { addProfile } from '../api/DatingSiteAPI';
import profileBO from "../api/ProfileBO";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import Characteristic from "../api/CharacteristicBO";
import PropTypes from 'prop-types';

class CreateProfil extends Component {
    constructor(props) {
        super(props);
        /** Initalisierung der Zustände der CreateProfil Komponente */
        this.state = {
            profile_id: props.profile,
            favoriteNote_id: 0,
            blockNote_id: 0,
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
            profileCreated: false,
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
        const newProfile = new profileBO(this.props.profile, this.state.favoriteNote_id, this.state.blockNote_id);
        DatingSiteAPI.getAPI()
            .addProfile(newProfile)
            .then(() => {
                this.setState({ profileCreated: true });
            })
            .catch((e) =>
                this.setState({
                    error: e,
                })
            );
    };

    handleCreateChar = () => {
        this.setState({showTextFields: true});
    };
    handleInputChange = (event, field) => {
        this.setState({ [field]: event.target.value });
    };
    handleSaveInputs = () => {
        console.log(this.state)
        const { char_name, char_desc } = this.state;
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


    handleUpdate(event) {
        console.log(this.state)
        event.preventDefault();
        const updatedProfile = new profileBO(this.state.profile_id, this.state.favoriteNote_id, this.state.account_id, this.state.blockNote_id);
        DatingSiteAPI.getAPI()
            .updateProfile(updatedProfile)
            .catch((e) =>
                this.setState({
                    error: e,
                })
            );
    };

    handleRemove(event) {
        console.log(this.props.profile)
        console.log(this.state)
        event.preventDefault();
        const { profile } = new profileBO(this.state.profile_id, this.state.favoriteNote_id, this.state.blockNote_id);
        DatingSiteAPI.getAPI()
            .removeProfile(profile.getID())
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
                            {/** Button für die Profilerstellung */}
                            <Button onClick={this.handleSubmit}> Profil erstellen </Button>
                        </Item>
                        <Item>
                        <FormGroup row style={{justifyContent: 'center'}}>
                            <Box sx={{width: 400, margin: '0 auto'}}>
                                <Button onClick={this.handleCreateChar} variant="outlined" startIcon={<BorderColorIcon />}> Eigenschaft erstellen! </Button>
                                {showTextFields && (
                                    <>
                                        <Box sx={{ marginBottom: '10px' }}>
                                            <TextField label="Eigenschaftsname" value={char_name} onChange={(event) => this.handleInputChange(event, 'char_name')}></TextField>
                                        </Box>
                                        <Box sx={{ marginBottom: '10px' }}>
                                            <TextField label="Beschreibung" value={char_desc} onChange={(event) => this.handleInputChange(event, 'char_desc')}></TextField>
                                        </Box>
                                        <Box sx={{ marginBottom: '10px' }}>
                                            <Button onClick={this.handleSaveInputs} variant="outlined" startIcon={<SaveIcon />}> Speichern </Button>
                                        </Box>
                                    </>
                                )}
                            </Box>
                        </FormGroup>
                        </Item>
                        <Item>
                        <FormGroup row style={{justifyContent: 'center'}}>
                            <Box sx={{width: 400, margin: '0 auto'}}>
                                <Button onClick={this.handleRemove} variant="outlined" startIcon={<DeleteIcon />} > Profil löschen! </Button>
                            </Box>
                        </FormGroup>
                        </Item>
                        <Item>
                            <Button onClick={this.handleUpdate} variant="outlined" startIcon={<SaveIcon />}> Profil Update </Button>
                        </Item>
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