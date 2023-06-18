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
import profile from "../components/Profile";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



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
            firstName: null,
            lastName: null,
            age: "",
            gender: null,
            height: null,
            religion: null,
            hair: null,
            smoking: null,
            char_name: '',
            char_desc: '',
            showTextFields: false,
            profileExists: false,
            selectedOption: null,
            minAge: null,
            maxAge: null,
            searchprofile_fk: null,
            income: null,
            favclub: null,
            educationalstatuts: null,
            hobby: null,
            politicaltendency: null,
            aboutme: null,
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
        this.handleChangeEducation = this.handleChangeEducation.bind(this);
        this.handleChangeHobbys = this.handleChangeHobbys.bind(this);
        this.handleChangePolitical = this.handleChangePolitical.bind(this);
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
        this.getSelectedProperties();
    };

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
    /** Event-Handler für die Änderung des Hobbys */
    handleChangeHobbys(event) {
      const newHobbys = event.target.value;
      this.setState({hobby: newHobbys})
    };
    /** Event-Handler für die Änderung des Bildungsstatus */
    handleChangeEducation(event) {
      const newEdu = event.target.value;
      this.setState({educationalstatuts: newEdu})
    };
    /** Event-Handler für die Änderung den Lieblingsverein */
    handleChangeClub(event) {
      const newClub = event.target.value;
      this.setState({favclub: newClub})
    };
    /** Event-Handler für die Änderung des Einkommens */
    handleChangeSalary(event) {
        const newSalary = event.target.value;
        this.setState({income: newSalary})
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
        const newProfile = new profileBO(this.state.profile_id, this.state.favoriteNote_id, this.state.blockNote_id,this.props.user.uid);
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
            this.state.educationalstatuts,
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

    handleInputChange = (event, field, index) => {
    };
    handleSaveInputs = () => {
    };

    handleUpdate(event) {
        console.log(this.state)
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
            this.state.income,
            this.state.favclub,
            this.state.educationalstatuts,
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

    /** Handler zum löschen seines Profils und die dazugehörigen Daten */
    handleRemove(event) {
    console.log(this.state)
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
                educationalstatuts: "",
                hobby: "",
                politicaltendency: "",
                aboutme: "",
        });
        })
        .catch((e) =>
            this.setState({
                error: e,
            })
        );
    };

    handleChangeSelectedOption = event => {
      this.setState({ selectedOption: event.target.value });
    };
    renderContent() {
      const { selectedOption } = this.state;

      if (selectedOption === "selectReligion") {
        return (
          <FormGroup>
            <FormLabel>Welcher Religion gehörst du an?</FormLabel>
            <RadioGroup row value={this.state.religion} onChange={this.handleChangeReligion}>
              <FormControlLabel sx={{ width: '35%' }} value="Atheist" control={<Radio />} label="Atheist" labelPlacement="bottom" />
              <FormControlLabel sx={{ width: '35%' }} value="Christlich" control={<Radio />} label="Christlich" labelPlacement="bottom" />
              <FormControlLabel sx={{ width: '35%' }} value="Muslimisch" control={<Radio />} label="Muslimisch" labelPlacement="bottom" />
              <FormControlLabel sx={{ width: '35%' }} value="Andere" control={<Radio />} label="Andere" labelPlacement="bottom" />
              <FormControlLabel sx={{ width: '35%' }} value="" control={<Radio />} label="Keine Angabe" labelPlacement="bottom" />
            </RadioGroup>
          </FormGroup>
        );
      } else if (selectedOption === "selectHaarfarbe") {
        return (
          <FormGroup row style={{ justifyContent: 'center' }}>
            <Box sx={{ width: 400, margin: '0 auto' }}>
              <FormLabel>Welche Haarfarbe hast du?</FormLabel>
              {/** Auswahlbuttons für die Haarfarbe */}
              <RadioGroup row value={this.state.hair} onChange={this.handleChangeHair}>
                <FormControlLabel sx={{ width: '35%' }} value="Schwarz" control={<Radio />} label="Schwarz" labelPlacement="bottom" />
                <FormControlLabel sx={{ width: '35%' }} value="Braun" control={<Radio />} label="Braun" labelPlacement="bottom" />
                <FormControlLabel sx={{ width: '35%' }} value="Blond" control={<Radio />} label="Blond" labelPlacement="bottom" />
                <FormControlLabel sx={{ width: '35%' }} value="Andere" control={<Radio />} label="Andere" labelPlacement="bottom" />
                <FormControlLabel sx={{ width: '35%' }} value="" control={<Radio />} label="Keine Angabe" labelPlacement="bottom" />
              </RadioGroup>
            </Box>
          </FormGroup>
        );
      } else if (selectedOption === "selectRaucherstatuts") {
        return (
          <FormGroup row style={{ justifyContent: 'center' }}>
            <Box sx={{ width: 400, margin: '0 auto' }}>
              <FormLabel>Rauchst du?</FormLabel>
              {/** Buttons für die Auswahl als Raucher */}
              <RadioGroup row value={this.state.smoking} onChange={this.handleChangeSmoking}>
                <FormControlLabel sx={{ width: '35%' }} value="Nicht-Raucher" control={<Radio />} label="Nicht-Raucher" labelPlacement="bottom" />
                <FormControlLabel sx={{ width: '35%' }} value="Raucher" control={<Radio />} label="Raucher" labelPlacement="bottom" />
                <FormControlLabel sx={{ width: '35%' }} value="" control={<Radio />} label="Keine Angabe" labelPlacement="bottom" />
              </RadioGroup>
            </Box>
          </FormGroup>
        );
      } else if (selectedOption === "selectGehalt") {
        return (
          <FormGroup row style={{ justifyContent: 'center' }}>
            <Box sx={{ width: 400, margin: '0 auto' }}>
              <FormLabel>Wie viel verdienst du?</FormLabel>
              {/** Buttons für die Auswahl des Gehalts */}
              <RadioGroup row value={this.state.income} onChange={this.handleChangeSalary}>
                <FormControlLabel sx={{ width: '35%' }} value="1000" control={<Radio />} label="1000€" labelPlacement="bottom" />
                <FormControlLabel sx={{ width: '35%' }} value="1500" control={<Radio />} label="1500€" labelPlacement="bottom" />
                <FormControlLabel sx={{ width: '35%' }} value="2000" control={<Radio />} label="2000€" labelPlacement="bottom" />
                <FormControlLabel sx={{ width: '35%' }} value="3500" control={<Radio />} label="3500€" labelPlacement="bottom" />
                <FormControlLabel sx={{ width: '35%' }} value=">5000" control={<Radio />} label=">5000€" labelPlacement="bottom" />
                <FormControlLabel sx={{ width: '35%' }} value="" control={<Radio />} label="Keine Angabe" labelPlacement="bottom" />
              </RadioGroup>
            </Box>
          </FormGroup>
        );
      } else if (selectedOption === "selectLieblingsverein") {
        return (
          <FormGroup row style={{ justifyContent: 'center' }}>
            <Box sx={{ width: 400, margin: '0 auto' }}>
              <FormLabel>Was ist dein Lieblingsverein?</FormLabel>
              {/** Textfeld für deinen Lieblingsverein */}
              <TextField
                type={"text"}
                label={"Name des Vereins"}
                value={this.state.favclub}
                onChange={this.handleChangeClub}
                inputProps={{
                  maxLength: 17,
                }}
              />
            </Box>
          </FormGroup>
        );
      } else if (selectedOption === "selectBildungsstatus") {
        return (
          <FormGroup row style={{ justifyContent: 'center' }}>
            <Box sx={{ width: 400, margin: '0 auto' }}>
              <FormLabel>Was für einen Bildungsabschluss hast du?</FormLabel>
              {/** Buttons für die Auswahl des Bildungsstatus */}
              <RadioGroup row value={this.state.educationalstatuts} onChange={this.handleChangeEducation}>
                <FormControlLabel sx={{ width: '35%' }} value="Hauptschule" control={<Radio />} label="Hauptschule" labelPlacement="bottom" />
                <FormControlLabel sx={{ width: '35%' }} value="Realschule" control={<Radio />} label="Realschule" labelPlacement="bottom" />
                <FormControlLabel sx={{ width: '35%' }} value="Abitur" control={<Radio />} label="Abitur" labelPlacement="bottom" />
                <FormControlLabel sx={{ width: '35%' }} value="Hochschulabschluss" control={<Radio />} label="Hochschulabschluss" labelPlacement="bottom" />
                <FormControlLabel sx={{ width: '35%' }} value="" control={<Radio />} label="Keine Angabe" labelPlacement="bottom" />
              </RadioGroup>
            </Box>
          </FormGroup>
        );
      } else if (selectedOption === "selectHobbys") {
        return (
          <FormGroup row style={{ justifyContent: 'center' }}>
            <Box sx={{ width: 400, margin: '0 auto' }}>
              <FormLabel>Welche Hobbys hast du?</FormLabel>
              {/** Textfeld für die Hobbys */}
              <TextField
                type={"text"}
                label={"Hobbyname"}
                value={this.state.hobby}
                onChange={this.handleChangeHobbys}
                inputProps={{
                  maxLength: 17,
                }}
              />
            </Box>
          </FormGroup>
        );
      } else if (selectedOption === "selectPolitischeAusrichtung") {
        return (
          <FormGroup row style={{ justifyContent: 'center' }}>
            <Box sx={{ width: 400, margin: '0 auto' }}>
              <FormLabel>Was ist deine politische Ausrichtung?</FormLabel>
              {/** Buttons für die Auswahl der politischen Ausrichtung */}
              <RadioGroup row value={this.state.politicaltendency} onChange={this.handleChangePolitical}>
                <FormControlLabel sx={{ width: '35%' }} value="Pazifismus" control={<Radio />} label="Pazifismus" labelPlacement="bottom" />
                <FormControlLabel sx={{ width: '35%' }} value="Libertarianismus" control={<Radio />} label="Libertarianismus" labelPlacement="bottom" />
                <FormControlLabel sx={{ width: '35%' }} value="Kommunitarismus" control={<Radio />} label="Kommunitarismus" labelPlacement="bottom" />
                <FormControlLabel sx={{ width: '35%' }} value="Sozialkonservatismus" control={<Radio />} label="Sozialkonservatismus" labelPlacement="bottom" />
                <FormControlLabel sx={{ width: '35%' }} value="" control={<Radio />} label="Keine Angabe" labelPlacement="bottom" />
              </RadioGroup>
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
            } = this.state;

            const defaultValue = selectedOption || '';

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
                                    <FormControlLabel sx={{ width: '25%' }} value="männlich" control={<Radio/>} label="Mann" labelPlacement="bottom"/>
                                    <FormControlLabel sx={{ width: '25%' }} value="weiblich" control={<Radio/>} label="Frau" labelPlacement="bottom"/>
                                    <FormControlLabel sx={{ width: '25%' }} value="divers" control={<Radio/>} label="Divers" labelPlacement="bottom"/>
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
                                  <InputLabel>Auswahleigenschaften</InputLabel>
                                  <Select
                                    value={defaultValue}
                                    label="Auswahleigenschaften"
                                    onChange={this.handleChangeSelectedOption}
                                  >
                                      <MenuItem value="selectReligion">Religion</MenuItem>
                                      <MenuItem value="selectRaucherstatuts">Raucherstatus</MenuItem>
                                      <MenuItem value="selectHaarfarbe">Haarfarbe</MenuItem>
                                      <MenuItem value="selectGehalt">Gehalt</MenuItem>
                                      <MenuItem value="selectLieblingsverein">Lieblingsverein</MenuItem>
                                      <MenuItem value="selectBildungsstatus">Bildungsstatus</MenuItem>
                                      <MenuItem value="selectHobbys">Hobbys</MenuItem>
                                      <MenuItem value="selectPolitischeAusrichtung">Politische Ausrichtung</MenuItem>
                                  </Select>
                                </FormControl>
                                {this.renderContent()}
                            </Box>
                            </FormGroup>
                        </Item>
                        {/**

                         Mögliche Änderung durch "Über Mich Feld"

                         */}
                        <Item>
                            <FormGroup row style={{justifyContent: 'center'}}>
                                <Box sx={{width: 400, margin: '0 auto'}}>
                                    {/**

                                     Liste die für jede Eigenschaft erstellt werden kann

                                     */}
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
                                        <TextField label="Eigenschaftsname" value={this.state.char_name} onChange={(event) => this.handleInputChange(event, 'char_name')} />
                                      </Box>
                                      <Box sx={{ marginBottom: '10px' }}>
                                        <TextField label="Beschreibung" value={this.state.char_value} onChange={(event) => this.handleInputChange(event, 'char_value')} />
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
                    {profileExists && (
                    <Item>
                    {/** Button für das anzeigen seines eigenes Profils */}
                        <Link to={`/Profile/${this.props.user.uid}`}>
                            <Button variant="outlined" startIcon={<AccountCircleIcon />}>Profil anzeigen</Button>
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