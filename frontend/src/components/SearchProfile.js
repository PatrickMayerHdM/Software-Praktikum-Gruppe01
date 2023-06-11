import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Item from "../theme";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
import {Button} from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import "./Profile.css";
import SaveIcon from '@mui/icons-material/Save';


/**
 * Damit dem User beim Suchen passende Personen angezeigt werden, kann dieser Suchprofile erstellen, diese in Verbindung
 * mit den Profilen der anderen User legen dann auch das Ähnlichkeitsmaß fest.
 * In dieser Klasse soll ein User dann ein Suchprofil anlegen können.
 * */

class SearchProfile extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            minAge: '',
            maxAge: '',
            minHeight: '',
            maxHeight: '',
            gender: '',
            religion: '',
            hair: '',
            smoking: '',
        };

        this.handleChangeGen = this.handleChangeGen.bind(this);
        this.handleChangeRel = this.handleChangeRel.bind(this);
        this.handleChangeSmo = this.handleChangeSmo.bind(this);
        this.handleChangeHai = this.handleChangeHai.bind(this);



    }

    handleChangeGen = (val) => {
        const selectedGender = val.target.value;
        this.setState({ gender: selectedGender});
    }

    handleChangeRel = (val) => {
        const selectedReligion = val.target.value;
        this.setState({ religion: selectedReligion});
    }

    handleChangeSmo = (val) => {
        const selectedSmoker = val.target.value;
        this.setState({ smoking: selectedSmoker });
    }

    handleChangeHai = (val) => {
       const selectedHair = val.target.value;
        this.setState({ hair: selectedHair });
    };

     handleChangeAge = (event, value) => {
      const [minAge, maxAge] = value;
      this.setState({ minAge: minAge, maxAge: maxAge });
    }

    handleChangeHeight = (event, value) => {
      const [minHeight, maxHeight] = value;
      this.setState({minHeight: minHeight, maxHeight: maxHeight})
    }

    submit = () => {
        console.log(this.state )
    }



    render() {
        const {
          minAge,
          maxAge,
          minHeight,
          maxHeight,
          gender,
          religion,
          hair,
          smoking
        } = this.state;


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
                            {/** Hier kann die gewünschte Religion der mit diesem Suchprofil gesuchten Person ausgewählt werden */}
                            <FormLabel> Welche Religion sollte die gesuchte Person haben?</FormLabel>
                            <RadioGroup row style={{justifyContent: 'center'}} value={this.state.religion} onChange={this.handleChangeRel} className={"checkbox_search"}>
                                <FormControlLabel sx={{ width: '12%' }} value="atheist" control={<Radio />} label="Atheist" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '12%' }} value="christianity" control={<Radio />} label="Christlich" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '12%' }} value="islam" control={<Radio />} label="Muslimisch" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '12%' }} value="different" control={<Radio />} label="Andere" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '12%' }} value="indifferent" control={<Radio />} label="indifferent" labelPlacement="bottom" />
                            </RadioGroup>
                        </Item>

                        <Item >
                            {/** Hier kann die gewünschte Höhe einer Person ausgewählt werden */}
                            <Box sx={{width: 400, margin: '0 auto'}}>
                                <FormLabel>Welche Körpergröße sollte die Person haben?</FormLabel>
                                <Slider
                                    value={[minHeight, maxHeight]}
                                    onChange={this.handleChangeHeight}
                                    valueLabelDisplay="auto"
                                    min={140}
                                    max={220}
                                    className="slider"
                                />
                            </Box>
                        </Item>

                        <Item>
                            {/** Hier kann der Raucherstatus für die mit diesem Suchprofil gesuchten Personen ausgewählt werden */}
                            <FormLabel>Sollte die Person rauchen?</FormLabel>
                            <RadioGroup row style={{justifyContent: 'center'}} value={this.state.smoking} onChange={this.handleChangeSmo} className={"checkbox_search"}>
                                <FormControlLabel sx={{ width: '16%' }} value="nonSmoker" control={<Radio />} label="Nein" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '16%' }} value="smoker" control={<Radio />} label="Ja" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '16%' }} value="indifferent" control={<Radio />} label="indifferent" labelPlacement="bottom" />
                            </RadioGroup>
                        </Item>

                        <Item>
                            {/** Hier kann die gewünschte Haarfarbe der mit diesem Suchprofil gesuchten Person ausgewählt werden */}
                            <FormLabel> Welche Haarfarbe sollte die gesuchte Person haben?</FormLabel>
                            <RadioGroup row style={{justifyContent: 'center'}} value={this.state.hair} onChange={this.handleChangeHai} className={"checkbox_search"}>
                                <FormControlLabel sx={{ width: '10%' }} value="black" control={<Radio />} label="Schwarz" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '10%' }} value="brown" control={<Radio />} label="Braun" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '10%' }} value="blond" control={<Radio />} label="Blond" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '10%' }} value="different" control={<Radio />} label="Andere" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '10%' }} value="indifferent" control={<Radio />} label="indifferent" labelPlacement="bottom" />
                            </RadioGroup>
                        </Item>
                        <Item>
                            {/** Wir dann schlussendlich der submit des Suchprofils gemacht */}
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