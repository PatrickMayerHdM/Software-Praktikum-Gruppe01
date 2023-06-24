import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Item from "../../theme";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";
import {Button, TextField} from "@mui/material";
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


/**
 * Damit dem User beim Suchen passende Personen angezeigt werden, kann dieser Suchprofile erstellen, diese in Verbindung
 * mit den Profilen der anderen User legen dann auch das Ähnlichkeitsmaß fest.
 * In dieser Klasse soll ein User dann ein Suchprofil anlegen können.
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

            lastPartURL: " ", // Letzer Teil der URL, dies wird benötigt, um herauszufinden, ob es sich um ein neues Suchprofil oder das Bearbeiten eines Suchprofils handelt.
            char_fk: 0,
            searchprofile_id: null,
            error: null,

            selectedOption: null, // Dies ist die vom User ausgewählte Option im Dropdown
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
        this.handleChangeEducation = this.handleChangeEducation.bind(this);
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
    }

    /**
     * Funktionen für Veränderungen an den Werten
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
        this.setState({ religion: '' });
    };

    /** Event-Handler für die Änderung bei dem Raucherstatus der gesuchten Person */
    handleChangeSmo = (val) => {
        const selectedSmoker = val.target.value;
        this.setState({ smoking: selectedSmoker });
    }

    handleDeletesmoking = () => {
        this.setState({ smoking: '' });
    };

    /** Event-Handler für die Änderung an den Haaren der gesuchten Person */
    handleChangeHair = (val) => {
       const selectedHair = val.target.value;
        this.setState({ hair: selectedHair });
    };

    handleDeleteHair = () => {
        this.setState({ hair: '' });
    };

    /** Event-Handler für die Änderung an der Körpergröße der gesuchten Person */
    handleChangeHeight = (val) => {
        const selectedHeight = val.target.value;
        this.setState({ height: selectedHeight });
    };

    handleDeleteHeight = () => {
        this.setState({ height: '' });
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
        this.setState({ politicaltendency: '' });
    };

    /** Event-Handler für die Änderung des Hobbys der gesuchten Person */
    handleChangeHobbys(event) {
      const newHobbys = event.target.value;
      this.setState({hobby: newHobbys})
    };

    handleDeleteHobbys = () => {
        this.setState({ hobby: '' });
    };

    /** Event-Handler für die Änderung des Bildungsstatus der gesuchten Person */
    handleChangeEducation(event) {
      const newEdu = event.target.value;
      this.setState({educationalstatuts: newEdu})
    };

    /** Event-Handler für die Änderung den Lieblingsverein der gesuchten Person */
    handleChangeClub(event) {
      const newClub = event.target.value;
      this.setState({favclub: newClub})
    };

    handleDeleteClub = () => {
        this.setState({ favclub: '' });
    };

    /** Event-Handler für die Änderung des Einkommens der gesuchten Person */
    handleChangeSalary(event) {
        const newSalary = event.target.value;
        this.setState({income: newSalary})
    };

    handleDeleteSalary = () => {
        this.setState({ income: '' });
    };

    /** Event-Handler für die Änderung der Interessen der gesuchten Person */
    handleChangeInterests(event) {
        const newinterests = event.target.value;
        this.setState({aboutme: newinterests})
    };

    handleDeleteInterests = () => {
        this.setState({ aboutme: '' });
    };


    submit = (event) => {
        // Ermitteln, ob es sich um ein erstmaliges Anlegen eines Suchprifils handelt.
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

             console.log(newInfoObject)
             console.log("FrontEnd Payload", newSearchprofile)
         } else {
             // Der Code zum Ändern eines Suchprofils
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


    componentDidMount() {
        const currentPath = window.location.pathname;
        // Letzte Teil der URL wird gepoppt, un in const lastPartURL gespeichert
        const lastPartURL = currentPath.split('/').pop();
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
        }};

    handleChangeSelectedOption = event => {
      this.setState({ selectedOption: event.target.value });
    };

    handleInfoSelectCreate = (event, newSelectedValue) => {
        this.setState({ SelectCreate: newSelectedValue });
    };

    /**
     * Diese Funktion besitzt die Darstellungen zu den ausgewählten Optionen eines Users in dem drop-down menu.
     */
    rederSelectedContent() {
        const { selectedOption } = this.state;

        if (selectedOption === "selectReligion") {
            return (
            <FormGroup row style={{ justifyContent: 'center' }}>
            <Box sx={{ width: 400, margin: '0 auto' }}>
                <FormLabel> Welche Religion sollte die gesuchte Person haben?</FormLabel>
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
                        <FormControlLabel sx={{ width: '12%' }} value="indifferent" control={<Radio />} label="indifferent" labelPlacement="bottom" />
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
                              <FormControlLabel sx={{ width: '20%' }} value="Nicht-Raucher" control={<Radio />} label="Nein" labelPlacement="bottom" />
                              <FormControlLabel sx={{ width: '20%' }} value="Raucher" control={<Radio />} label="Ja" labelPlacement="bottom" />
                              <FormControlLabel sx={{ width: '20%' }} value="indifferent" control={<Radio />} label="indifferent" labelPlacement="bottom" />
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
                                <FormControlLabel sx={{ width: '10%' }} value="Anders" control={<Radio />} label="Andere" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '10%' }} value="indifferent" control={<Radio />} label="indifferent" labelPlacement="bottom" />
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
                            <FormControlLabel sx={{ width: '20%' }} value="indifferent" control={<Radio />} label="indifferent" labelPlacement="bottom" />
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
                                <FormControlLabel sx={{ width: '25%' }} value="indifferent" control={<Radio />} label="indifferent" labelPlacement="bottom" />
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
                                <FormControlLabel sx={{ width: '10%' }} value="Divers" control={<Radio />} label="Divers" labelPlacement="bottom" />
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
                                        value={this.state.aboutme}
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
                                        <InputLabel>Auswahleigenschaften</InputLabel>
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