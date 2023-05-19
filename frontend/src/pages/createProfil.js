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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';



class CreateProfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            age: '',
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
                orthodox: false,
            },
            hair: {
                black: false,
                brown: false,
                blond: false,
                red: false,
                gray: false,
            },
            smoking: {
                nonSmoker: false,
                smoker: false,
            },
            description: '',
        };

        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeGender = this.handleChangeGender.bind(this);
        this.handleChangeHeight = this.handleChangeHeight.bind(this);
        this.handleChangeReligion = this.handleChangeReligion.bind(this);
        this.handleChangeSmoking = this.handleChangeSmoking.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeFirstName(event) {
        const newName = event.target.value
        this.setState({firstName: newName})
    };

    handleChangeLastName(event) {
        const newName = event.target.value
        this.setState({lastName: newName})
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
    };


    handleChangeAge(date) {
        const selectedDate = dayjs(date);
        const today = dayjs();
        const age = today.diff(selectedDate, 'year');
        this.setState({ age: age });
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
                <Box sx={{width: {lg: '40%', md: '60%', sm: '80%'}, margin: '0 auto'}}>
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
                            <Box sx={{width: 200, margin: '0 auto'}}>
                                <FormLabel> Wie alt bist du? </FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            value={this.state.age}
                                            onChange={this.handleChangeAge}
                                            label="Geburtsdatum"
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
                                <RadioGroup value={gender} onChange={this.handleChangeGender}>
                                    <FormControlLabel value="male" control={<Radio/>} label="Mann"/>
                                    <FormControlLabel value="female" control={<Radio/>} label="Frau"/>
                                    <FormControlLabel value="nonBinary" control={<Radio/>} label="Nicht-binär"/>
                                    <FormControlLabel value="various" control={<Radio/>} label="Divers"/>
                                </RadioGroup>
                            </Box>
                            </FormGroup>
                        </Item>
                        <Item>
                            <FormGroup row style={{justifyContent: 'center'}}>
                            <Box sx={{width: 150, margin: '0 auto'}}>
                                <FormLabel> Wie Groß bist du? </FormLabel>
                                <TextField
                                    type={"number"}
                                    value={height}
                                    onChange={this.handleChangeHeight}
                                    inputProps={{ inputMode: "numeric", style: { WebkitAppearance: 'none', margin: 0 } }}
                                />
                            </Box>
                            </FormGroup>
                        </Item>
                        <Item>
                            <FormGroup row style={{justifyContent: 'center'}}>
                            <Box sx={{width: 400, margin: '0 auto'}}>
                                <FormLabel> Welcher Religion gehörst du an? </FormLabel>
                                <RadioGroup row value={religions} onChange={this.handleChangeReligion}>
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
                                <RadioGroup row value={smoking} onChange={this.handleChangeSmoking}>
                                    <FormControlLabel sx={{ width: '50%' }} value="nonSmoker" control={<Radio />} label="Nich-Raucher" labelPlacement="bottom" />
                                    <FormControlLabel sx={{ width: '15%' }} value="smoker" control={<Radio />} label="Raucher" labelPlacement="bottom" />
                                </RadioGroup>
                            </Box>
                            </FormGroup>
                        </Item>
                        <Item>
                            <FormGroup row style={{justifyContent: 'center'}}>
                            <Box sx={{width: 400, margin: '0 auto'}}>
                                <FormLabel> Was hast du noch zu sagen? </FormLabel>
                                <TextField
                                    type="text"
                                    value={description}
                                    onChange={this.handleChangeDescription}
                                    inputProps={{
                                        maxLength: 250
                                        }}
                                    />
                            </Box>
                            </FormGroup>
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