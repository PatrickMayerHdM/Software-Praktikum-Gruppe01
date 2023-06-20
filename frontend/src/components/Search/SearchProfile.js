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


/**
 * Damit dem User beim Suchen passende Personen angezeigt werden, kann dieser Suchprofile erstellen, diese in Verbindung
 * mit den Profilen der anderen User legen dann auch das Ähnlichkeitsmaß fest.
 * In dieser Klasse soll ein User dann ein Suchprofil anlegen können.
 * */

class SearchProfile extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
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
            interests: null, // Wert welcher bei dem Submit des Suchprofils übergeben wird.

            lastPartURL: null, // Letzer Teil der URL, dies wird benötigt, um herauszufinden, ob es sich um ein neues Suchprofil oder das Bearbeiten eines Suchprofils handelt.
            char_fk: 0,
            searchprofile_id: null,
            error: null,

            selectedOption: null, // Dies ist die vom User ausgewählte Option im Dropdown
        };

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
    }

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

    /** Event-Handler für die Änderung bei dem Raucherstatus der gesuchten Person */
    handleChangeSmo = (val) => {
        const selectedSmoker = val.target.value;
        this.setState({ smoking: selectedSmoker });
    }

    /** Event-Handler für die Änderung an den Haaren der gesuchten Person */
    handleChangeHair = (val) => {
       const selectedHair = val.target.value;
        this.setState({ hair: selectedHair });
    };

    /** Event-Handler für die Änderung an der Körpergröße der gesuchten Person */
    handleChangeHeight = (val) => {
        const selectedHeight = val.target.value;
        this.setState({ height: selectedHeight });
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
    /** Event-Handler für die Änderung des Hobbys der gesuchten Person */
    handleChangeHobbys(event) {
      const newHobbys = event.target.value;
      this.setState({hobby: newHobbys})
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
    /** Event-Handler für die Änderung des Einkommens der gesuchten Person */
    handleChangeSalary(event) {
        const newSalary = event.target.value;
        this.setState({income: newSalary})
    };

    /** Event-Handler für die Änderung der Interessen der gesuchten Person */
    handleChangeInterests(event) {
        const newinterests = event.target.value;
        this.setState({interests: newinterests})
    };


    submit = (event) => {
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
                 this.state.educationalstatuts,
                 this.state.hobby,
                 this.state.politicaltendency,
                 this.state.interests
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
                 this.state.educationalstatuts,
                 this.state.hobby,
                 this.state.politicaltendency,
                 this.state.interests
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

    /**
     * Diese Funktion besitzt die Darstellungen zu den ausgewählten Optionen eines Users in dem drop-down menu.
     */
    rederSelectedContent() {
        const { selectedOption } = this.state;

        if (selectedOption === "selectReligion") {
            return (
                <FormGroup style={{ justifyContent: 'center' }}>
                    {/** Hier kann die gewünschte Religion der mit diesem Suchprofil gesuchten Person ausgewählt werden */}
                    <FormLabel> Welche Religion sollte die gesuchte Person haben?</FormLabel>
                    <RadioGroup row style={{justifyContent: 'center'}} value={this.state.religion} onChange={this.handleChangeRel} className={"checkbox_search"}>
                        <FormControlLabel sx={{ width: '12%' }} value="atheist" control={<Radio />} label="Atheist" labelPlacement="bottom" />
                        <FormControlLabel sx={{ width: '12%' }} value="christianity" control={<Radio />} label="Christlich" labelPlacement="bottom" />
                        <FormControlLabel sx={{ width: '12%' }} value="islam" control={<Radio />} label="Muslimisch" labelPlacement="bottom" />
                        <FormControlLabel sx={{ width: '12%' }} value="different" control={<Radio />} label="Andere" labelPlacement="bottom" />
                        <FormControlLabel sx={{ width: '12%' }} value="indifferent" control={<Radio />} label="indifferent" labelPlacement="bottom" />
                    </RadioGroup>
                </FormGroup>
            );
        } else if (selectedOption === 'selectBildungsstatus') {
            return (
                <FormGroup style={{ justifyContent: 'center' }}>
                    <Box sx={{ width: 400, margin: '0 auto' }}>
                        <FormLabel>Was für einen Bildungsabschluss sollte die Person haben?</FormLabel>
                        {/** Buttons für die Auswahl des Bildungsstatus */}
                        <RadioGroup row style={{justifyContent: 'center'}} value={this.state.educationalstatuts} onChange={this.handleChangeEducation} className={"checkbox_search"}>
                            <FormControlLabel sx={{ width: '35%' }} value="Hauptschule" control={<Radio />} label="Hauptschule" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '35%' }} value="Realschule" control={<Radio />} label="Realschule" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '35%' }} value="Abitur" control={<Radio />} label="Abitur" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '35%' }} value="Hochschulabschluss" control={<Radio />} label="Hochschulabschluss" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '35%' }} value="indifferent" control={<Radio />} label="indifferent" labelPlacement="bottom" />
                        </RadioGroup>
                    </Box>
                </FormGroup>
            );
        } else if (selectedOption === 'selectRaucherstatuts') {
            return (
                <FormGroup style={{justifyContent: 'center'}}>
                    {/** Hier kann der Raucherstatus für die mit diesem Suchprofil gesuchten Personen ausgewählt werden */}
                    <FormLabel>Sollte die Person rauchen?</FormLabel>
                    <RadioGroup row style={{justifyContent: 'center'}} value={this.state.smoking} onChange={this.handleChangeSmo} className={"checkbox_search"}>
                        <FormControlLabel sx={{ width: '20%' }} value="nonSmoker" control={<Radio />} label="Nein" labelPlacement="bottom" />
                        <FormControlLabel sx={{ width: '20%' }} value="smoker" control={<Radio />} label="Ja" labelPlacement="bottom" />
                        <FormControlLabel sx={{ width: '20%' }} value="indifferent" control={<Radio />} label="indifferent" labelPlacement="bottom" />
                    </RadioGroup>
                </FormGroup>
            )
        } else if (selectedOption === 'selectHaarfarbe'){
            return(
                <FormGroup style={{justifyContent: 'center'}}>
                    {/** Hier kann die gewünschte Haarfarbe der mit diesem Suchprofil gesuchten Person ausgewählt werden */}
                    <FormLabel> Welche Haarfarbe sollte die gesuchte Person haben?</FormLabel>
                    <RadioGroup row style={{justifyContent: 'center'}} value={this.state.hair} onChange={this.handleChangeHair} className={"checkbox_search"}>
                        <FormControlLabel sx={{ width: '10%' }} value="black" control={<Radio />} label="Schwarz" labelPlacement="bottom" />
                        <FormControlLabel sx={{ width: '10%' }} value="brown" control={<Radio />} label="Braun" labelPlacement="bottom" />
                        <FormControlLabel sx={{ width: '10%' }} value="blond" control={<Radio />} label="Blond" labelPlacement="bottom" />
                        <FormControlLabel sx={{ width: '10%' }} value="different" control={<Radio />} label="Andere" labelPlacement="bottom" />
                        <FormControlLabel sx={{ width: '10%' }} value="indifferent" control={<Radio />} label="indifferent" labelPlacement="bottom" />
                    </RadioGroup>
                </FormGroup>
            )
        } else if (selectedOption === 'selectGehalt'){
            return(
                <FormGroup style={{justifyContent: 'center'}}>
                    {/** Hier kann das gewünschte Gehalt der Person die gesucht wird angegeben werden. */}
                    <FormLabel> Welches Gehalt sollte die Person mindestens haben?</FormLabel>
                    <RadioGroup row style={{justifyContent: 'center'}} value={this.state.income} onChange={this.handleChangeSalary} className={"checkbox_search"}>
                        <FormControlLabel sx={{ width: '20%' }} value="1000" control={<Radio />} label="1000€" labelPlacement="bottom" />
                        <FormControlLabel sx={{ width: '20%' }} value="1500" control={<Radio />} label="1500€" labelPlacement="bottom" />
                        <FormControlLabel sx={{ width: '20%' }} value="2000" control={<Radio />} label="2000€" labelPlacement="bottom" />
                        <FormControlLabel sx={{ width: '20%' }} value="3500" control={<Radio />} label="3500€" labelPlacement="bottom" />
                        <FormControlLabel sx={{ width: '20%' }} value=">5000" control={<Radio />} label="5000€" labelPlacement="bottom" />
                        <FormControlLabel sx={{ width: '20%' }} value="indifferent" control={<Radio />} label="indifferent" labelPlacement="bottom" />
                    </RadioGroup>
                </FormGroup>
            )
        } else if (selectedOption === 'selectLieblingsverein'){
            return(
                <FormGroup style={{justifyContent: 'center'}}>
                    {/** Hier kann der gewünschte Lieblingsverein der Person die gesucht wird angegeben werden. */}
                    <FormLabel> Was ist der gewünschte Lieblingsverein?</FormLabel>
                    <TextField
                        type={"text"}
                        label={"Name des Vereins"}
                        value={this.state.favclub}
                        onChange={this.handleChangeClub}
                        inputProps={{
                          maxLength: 17,
                        }}
                    />
                </FormGroup>
            )
        } else if (selectedOption === 'selectHobbys'){
            return(
                <FormGroup row style={{justifyContent: 'center'}}>
                    <FormLabel>Welche Hobbys soll die gesuchte Person haben?</FormLabel>
                      {/** Textfeld für die eingabe der Hobbys der gesuchten Person*/}
                      <TextField
                        type={"text"}
                        label={"Hobbyname"}
                        value={this.state.hobby}
                        onChange={this.handleChangeHobbys}
                        inputProps={{
                          maxLength: 17,
                        }}
                      />
                </FormGroup>
            )
        } else if (selectedOption === 'selectPolitischeAusrichtung'){
            return(
                <FormGroup style={{justifyContent: 'center'}}>
                    <FormLabel>Was für eine politische Ausrichtung sollte die gesuchte Person haben?</FormLabel>
                    {/** Buttons für die Auswahl der politischen Ausrichtung der gesuchten Person*/}
                    <RadioGroup row value={this.state.politicaltendency} onChange={this.handleChangePolitical}>
                        <FormControlLabel sx={{ width: '25%' }} value="Pazifismus" control={<Radio />} label="Pazifismus" labelPlacement="bottom" />
                        <FormControlLabel sx={{ width: '25%' }} value="Libertarianismus" control={<Radio />} label="Libertarianismus" labelPlacement="bottom" />
                        <FormControlLabel sx={{ width: '25%' }} value="Kommunitarismus" control={<Radio />} label="Kommunitarismus" labelPlacement="bottom" />
                        <FormControlLabel sx={{ width: '25%' }} value="Sozialkonservatismus" control={<Radio />} label="Sozialkonservatismus" labelPlacement="bottom" />
                        <FormControlLabel sx={{ width: '25%' }} value="indifferent" control={<Radio />} label="indifferent" labelPlacement="bottom" />
              </RadioGroup>
                </FormGroup>
            )
        } else if (selectedOption === 'selectKörpergröße'){
            return(
                <FormGroup style={{justifyContent: 'center'}}>
                    {/** Hier kann die gewünschte Körpergröße einer Person ausgewählt werden */}
                    <FormLabel> Wie groß soll die gesuchte Person sein?</FormLabel>
                    <RadioGroup row style={{justifyContent: 'center'}} value={this.state.height} onChange={this.handleChangeHeight} className={"checkbox_search"}>
                        <FormControlLabel sx={{ width: '16%' }} value="small" control={<Radio />} label="Klein" labelPlacement="bottom" />
                        <FormControlLabel sx={{ width: '16%' }} value="mean" control={<Radio />} label="Mittel" labelPlacement="bottom" />
                        <FormControlLabel sx={{ width: '16%' }} value="large" control={<Radio />} label="Groß" labelPlacement="bottom" />
                    </RadioGroup>
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
                                <FormControlLabel sx={{ width: '10%' }} value="male" control={<Radio />} label="Mann" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '10%' }} value="female" control={<Radio />} label="Frau" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '10%' }} value="various" control={<Radio />} label="Divers" labelPlacement="bottom" />
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
                                        label={"Interessen"}
                                        value={this.state.interests}
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
                                            <MenuItem value="selectBildungsstatus">Bildungsstatus</MenuItem>
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