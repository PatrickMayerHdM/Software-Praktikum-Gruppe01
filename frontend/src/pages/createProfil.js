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

class CreateProfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            age: null,
            gender: {
                male: false,
                female: false,
                nonBinary: false,
                various: false,
            },
            height: null,
            religions: {
                atheist: false,
                christianity: false,
                islam: false,
                judaism: false,
                buddhism: false,
                individually: false,
            },
            hair: {
                black: false,
                brown: false,
                blond: false,
                red: false,
                different: false,
                // individually: false,
            },
            smoking: {
                nonSmoker: false,
                smoker: false,
            },
            description: '',
        };
    }
    handleChangeFirstName = (event) => {
        this.setState({firstName: event.target.value});
    };

    handleChangeLastName = (event) => {
        this.setState({lastName: event.target.value})
    };

    handleChangeGender = (event) => {
        const { name, checked } = event.target;
        this.setState((prevState) => ({
            gender: {...prevState.gender, [name]: checked},
        }));
    };

    handleChangeHeight = (event) => {
        this.setState({height: event.target.value});
    };

    handleChangeReligion = (event) => {
      const { name, checked } = event.target;
      this.setState((prevState) => ({
          religions: {...prevState.religions, [name]: checked},
      }));
    };

    handleChangeSmoking = (event) => {
        const { name, checked } = event.target;
        this.setState((prevState) => ({
            smoking: {...prevState.smoking, [name]: checked},
        }));
    };

    handleChangeHair = (event) => {
        const { name, checked } = event.target;
        this.setState((prevState) => ({
            hair: {...prevState.hair, [name]: checked},
        }));
        console.log("hair radio event: ", event.target.value);
        console.log("hair state: ", this.state.hair);
    };

    handleChangeAge = (event) => {
        this.setState({age: event.target.value});
    };

    handleChangeDescription = (event) => {
        this.setState({descripition: event.target.value});
    };

    handleSubmit = () => {
    console.log(this.state);
    };

    render() {
            const {
                firstName,
                lastName,
                age,
                gender,
                height,
                religions,
                hair,
                smoking,
                description,
            } = this.state;
            return (
            <div>
                <h2> Lege hier dein Profil an: </h2>
                <Box sx={{width: '33%', margin: '0 auto'}}>
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={1}
                           sx={{alignItems: 'stretch'}}>
                        <Item>
                            <FormLabel> Wie ist dein Name? </FormLabel>
                            <FormGroup row style={{justifyContent: 'center'}}>
                                <Box sx={{width: 200, margin: '0 auto'}}>
                                    <TextField
                                        type={"text"}
                                        label={"Vorname"}
                                        value={firstName}
                                        onChange={this.handleChangeFirstName}
                                        inputProps={{
                                            maxLenght: 25
                                        }}
                                    />
                                    <TextField
                                        type="text"
                                        label="Nachname"
                                        value={lastName}
                                        onChange={this.handleChangeLastName}
                                        inputProps={{
                                            maxLength: 25
                                        }}
                                    />
                                </Box>
                            </FormGroup>
                        </Item>
                        <Item>
                            <FormGroup row style={{justifyContent: 'center'}}>
                            <Box sx={{width: 150, margin: 'o auto'}}>
                                <FormLabel> Wie alt bist du? </FormLabel>
                                <TextField
                                    type={"number"}
                                    value={age}
                                    onChange={this.handleChangeAge}
                                />
                            </Box>
                            </FormGroup>
                        </Item>
                        <Item>
                            <Box sx={{width: 400, margin: '0 auto'}}>
                                <FormLabel> Was für ein Geschlecht hast du ? </FormLabel>
                                <RadioGroup value={gender} onChange={this.handleChangeGender}>
                                    <FormControlLabel value="male" control={<Radio/>} label="Mann"/>
                                    <FormControlLabel value="female" control={<Radio/>} label="Frau"/>
                                    <FormControlLabel value="nonBinary" control={<Radio/>} label="Nicht-binär"/>
                                    <FormControlLabel value="various" control={<Radio/>} label="Divers"/>
                                </RadioGroup>
                            </Box>
                        </Item>
                        <Item>
                            <FormGroup row style={{justifyContent: 'center'}}>
                            <Box sx={{width: 150, margin: 'o auto'}}>
                                <FormLabel> Wie Groß bist du? </FormLabel>
                                <TextField
                                    type={"number"}
                                    value={height}
                                    onChange={this.handleChangeHeight}
                                />
                            </Box>
                            </FormGroup>
                        </Item>
                        <Item>
                            <Box sx={{width: 400, margin: '0 auto'}}>
                                <FormLabel> Welcher Religion gehörst du an? </FormLabel>
                                <RadioGroup row value={religions} onChange={this.handleChangeReligion}>
                                    <FormControlLabel sx={{ width: '10%' }} value="atheist" control={<Radio />} label="Atheist" labelPlacement="bottom" />
                                    <FormControlLabel sx={{ width: '10%' }} value="christianity" control={<Radio />} label="Christlich" labelPlacement="bottom" />
                                    <FormControlLabel sx={{ width: '10%' }} value="islam" control={<Radio />} label="Muslimisch" labelPlacement="bottom" />
                                    <FormControlLabel sx={{ width: '10%' }} value="judaism" control={<Radio />} label="Jüdisch" labelPlacement="bottom" />
                                    <FormControlLabel sx={{ width: '10%' }} value="buddhism" control={<Radio />} label="Budistisch" labelPlacement="bottom" />
                                </RadioGroup>
                                <TextField
                                    label="Persönliche Auswahl"
                                    value={religions.individually}
                                    onChange={this.handleChangeReligion}
                                    fullWidth
                                    />
                            </Box>
                        </Item>
                        <Item>
                            <Box sx={{width: 400, margin: '0 auto'}}>
                                <FormLabel> Welche Haarfarbe du? </FormLabel>
                                <RadioGroup row value={"brown"} onChange={this.handleChangeHair}>
                                    <FormControlLabel sx={{ width: '10%' }} value="black" control={<Radio />} label="Schwarz" labelPlacement="bottom" />
                                    <FormControlLabel sx={{ width: '10%' }} value="brown" control={<Radio />} label="Braun" labelPlacement="bottom" />
                                    {/*<FormControlLabel sx={{ width: '10%' }} value="blond" control={<Radio />} label="Blond" labelPlacement="bottom" />*/}
                                    {/*<FormControlLabel sx={{ width: '10%' }} value="red" control={<Radio />} label="Rot" labelPlacement="bottom" />*/}
                                </RadioGroup>
                                <TextField
                                    label="Persönliche Auswahl"
                                    value={hair.individually}
                                    onChange={this.handleChangeHair}
                                    fullWidth
                                    />
                            </Box>
                        </Item>
                        <Item>
                            <Box sx={{width: 400, margin: '0 auto'}}>
                                <FormLabel> Rauchst du ? </FormLabel>
                                <RadioGroup row value={smoking.individually} onChange={this.handleChangeSmoking}>
                                    <FormControlLabel sx={{ width: '10%' }} value="nonSmoker" control={<Radio />} label="Nichraucher" labelPlacement="bottom" />
                                    <FormControlLabel sx={{ width: '10%' }} value="smoker" control={<Radio />} label="Raucher" labelPlacement="bottom" />
                                </RadioGroup>
                            </Box>
                        </Item>
                        <Item>
                            <Box sx={{width: 400, margin: '0 auto'}}>
                                <FormLabel> Was hast du noch zu sagen? </FormLabel>
                                <TextField
                                    value={description}
                                    onChange={this.handleChangeDescription}
                                    inputProps={{
                                        maxLength: 250
                                        }}
                                    />
                            </Box>
                        </Item>
                        <Item>
                            <Button onClick={this.handleSubmit}> Profil erstellen </Button>
                        </Item>
                    </Stack>
                </Box>
            </div>
            );
        }
}
export default CreateProfil;