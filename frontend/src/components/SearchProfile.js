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


/**
 * Damit dem User beim Suchen passende Personen angezeigt werden, kann dieser Suchprofile erstellen, diese in Verbindung
 * mit den Profilen der anderen User legen dann auch das Ähnlichkeitsmaß fest.
 * In dieser Klasse soll ein User dann ein Suchprofil anlegen können.
 * */

class SearchProfile extends React.Component{

    constructor(props) {
        super(props);
        this.state = {

            age: {
                minAge: null,
                maxAge: null,
            },

            gender: {
                male: false,
                female: false,
                nonBinary: false,
                various: false,
            },
            religions: {
                atheist: false,
                christianity: false,
                islam: false,
                judaism: false,
                buddhism: false,
                indifferent: false,
            },
            smoking: {
                nonSmoker: false,
                smoker: false,
                indifferent: false,
            },
            hair: {
                black: false,
                brown: false,
                blond: false,
                red: false,
                different: false,
                indifferent: false,

            },
        };
    }

    handleChangeGen = (val) => {
        const {name, checked} = val.target;
        this.setState((prevState) => ({
            gender: {...prevState.gender, [name]: checked},
        }))
    }

    handleChangeRel = (val) => {
        const {name, checked} = val.target;
        this.setState((prevState) => ({

            religions: {...prevState.religions, [name]: checked},
        }))
    }

    handleChangeSmo = (val) => {
        const {name, checked} = val.target;
        this.setState((prevState) => ({
            smoking: {
              nonSmoker: name === "nonSmoker",
              smoker: name === "smoker",
              indifferent: name === "indifferent",
            },
        }))
    }

    handleChangeHai = (val) => {
        const {name, checked} = val.target;
        this.setState((prevState) => ({
            hair: {...prevState.hair, [name]: checked},
        }))
    }

    handleChangeAge = (event, value) => {
      const [minAge, maxAge] = value;
      this.setState((prevState) => ({
        age: {
          ...prevState.age, minAge: value[0], maxAge: value[1],
        }
      }));
}

    submit = (val) => {
        console.log(this.state )
    }




    render() {
        const {

            religions,
            gender,
            smoking,
            hair,
            age

        } = this.state;


        return(
            <div>
                <h2>Lege hier dein Suchprofil an:</h2>

                <Box sx={{ width: {lg: '50%', md: '60%', sm: '80%'}, margin: '0 auto'}}>
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} sx={{ alignItems: 'stretch' }}>
                        <Item >
                            {/** Hier kann das Geschlecht der in diesem Suchprofil gesuchten Person ausgewählt werden */}
                            <FormLabel> Welches Geschlecht soll die gesuchte Person haben?</FormLabel>
                            <FormGroup row style={{ justifyContent: 'center'}} className={"checkbox_search"}>
                                <FormControlLabel sx={{ width: '10%'}} control={<Checkbox name="male" checked={gender.male}
                                                                                          onChange={this.handleChangeGen} />} label="Mann" labelPlacement="bottom"
                                />
                                <FormControlLabel sx={{ width: '10%'}} control={<Checkbox name="female" checked={gender.female}
                                                                                          onChange={this.handleChangeGen} />} label="Frau" labelPlacement="bottom"
                                />
                                <FormControlLabel sx={{ width: '10%'}} control={<Checkbox name="nonBinary" checked={gender.nonBinary}
                                                                                          onChange={this.handleChangeGen} />} label="Nicht-binär" labelPlacement="bottom"
                                />
                                <FormControlLabel sx={{ width: '10%'}} control={<Checkbox name="various" checked={gender.various}
                                                                                          onChange={this.handleChangeGen} />} label="Divers" labelPlacement="bottom"
                                />
                            </FormGroup>
                        </Item>
                        <Item >
                            {/** Hier kann das Geschlecht der in diesem Suchprofil gesuchten Person ausgewählt werden */}
                            <Box sx={{width: 400, margin: '0 auto'}}>
                                <FormLabel>Wie alt soll die Person sein?</FormLabel>
                                <Slider
                                    value={[age.minAge, age.maxAge]}
                                    onChange={this.handleChangeAge}
                                    valueLabelDisplay="auto"
                                    min={18}
                                    max={100}
                                    className="slider_age"
                                />
                            </Box>
                        </Item>

                        <Item>
                            {/** Hier kann die gewünschte Religion der mit diesem Suchprofil gesuchten Person ausgewählt werden */}
                            <FormLabel> Welche Religion sollte die gesuchte Person haben?</FormLabel>
                            <FormGroup row style={{justifyContent: 'center'}} className={"checkbox_search"}>
                                <FormControlLabel sx={{width: '12%'}} control={<Checkbox name="atheist" checked={religions.atheist}
                                                                                         onChange={this.handleChangeRel}/>} label="Atheist" labelPlacement="bottom"
                                />
                                <FormControlLabel sx={{width: '12%'}} control={<Checkbox name="christianity" checked={religions.christianity}
                                                                                         onChange={this.handleChangeRel}/>}  label="Christlich" labelPlacement="bottom"
                                />
                                <FormControlLabel sx={{width: '12%'}} control={<Checkbox name="islam" checked={religions.islam}
                                                                                         onChange={this.handleChangeRel}/>}  label="Muslimisch" labelPlacement="bottom"
                                />
                                <FormControlLabel sx={{width: '12%'}} control={<Checkbox name="judaism" checked={religions.judaism}
                                                                                         onChange={this.handleChangeRel}/>}  label="Jüdisch" labelPlacement="bottom"
                                />
                                <FormControlLabel sx={{width: '12%'}} control={<Checkbox name="buddhism" checked={religions.buddhism}
                                                                                         onChange={this.handleChangeRel}/>}  label="Budistisch" labelPlacement="bottom"
                                />
                                <FormControlLabel sx={{width: '12%'}} control={<Checkbox name="indifferent" checked={religions.indifferent}
                                                                                         onChange={this.handleChangeRel} />} label="indifferent" labelPlacement="bottom"
                                />
                            </FormGroup>
                        </Item>

                        <Item>
                            {/** Hier kann der Raucherstatus für die mit diesem Suchprofil gesuchten Personen ausgewählt werden */}
                            <FormLabel>Sollte die Person rauchen?</FormLabel>
                            <RadioGroup row style={{justifyContent: 'center'}} onChange={this.handleChangeSmo} name="radio-buttons-group" className={"checkbox_search"}>
                                <FormControlLabel sx={{width: '16%'}} control={<Radio  name="nonSmoker" checked={smoking.nonSmoker}/>}
                                                  label="Nein" labelPlacement="bottom"
                                />
                                <FormControlLabel sx={{width: '16%'}} control={<Radio  name="smoker" checked={smoking.smoker}/>}
                                                  label="Ja" labelPlacement="bottom"
                                />
                                <FormControlLabel sx={{width: '16%'}} control={<Radio  name="indifferent" checked={smoking.indifferent}/>}
                                                  label="indifferent" labelPlacement="bottom"
                                />
                            </RadioGroup>
                        </Item>
                        <Item>
                            {/** Hier kann die gewünschte Haarfarbe der mit diesem Suchprofil gesuchten Person ausgewählt werden */}
                            <FormLabel> Welche Haarfarbe sollte die gesuchte Person haben?</FormLabel>
                            <FormGroup row style={{justifyContent: 'center'}} className={"checkbox_search"}>
                                <FormControlLabel sx={{width: '10%'}} control={<Checkbox  name="black" checked={hair.black}
                                                                                         onChange={this.handleChangeHai}/>} label="Schwarz" labelPlacement="bottom"
                                />
                                <FormControlLabel sx={{width: '10%'}} control={<Checkbox  name="brown" checked={hair.brown}
                                                                                         onChange={this.handleChangeHai}/>} label="Braun" labelPlacement="bottom"
                                />
                                <FormControlLabel sx={{width: '10%'}} control={<Checkbox name="blond" checked={hair.blond}
                                                                                         onChange={this.handleChangeHai}/>} label="Blond" labelPlacement="bottom"
                                />
                                <FormControlLabel sx={{width: '10%'}} control={<Checkbox name="red" checked={hair.red}
                                                                                         onChange={this.handleChangeHai}/>} label="Rot" labelPlacement="bottom"
                                />
                                <FormControlLabel sx={{width: '10%'}} control={<Checkbox name="different" checked={hair.different}
                                                                                         onChange={this.handleChangeHai}/>} label="Andere" labelPlacement="bottom"
                                />
                                <FormControlLabel sx={{width: '10%'}} control={<Checkbox defaultChecked name="indifferent" checked={hair.indifferent}
                                                                                         onChange={this.handleChangeHai}/>} label="indifferent" labelPlacement="bottom"
                                />
                            </FormGroup>
                        </Item>
                        <Item>
                            <Button onClick={this.submit}>Suchprofil erstellen</Button>
                        </Item>

                    </Stack>
                </Box>
            </div>
        )
    }
}

export default SearchProfile