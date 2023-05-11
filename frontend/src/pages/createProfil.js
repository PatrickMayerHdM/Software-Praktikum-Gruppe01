import {useState} from "react";
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


function CreateProfil() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [age, setValue] = React.useState();

    const [gender, setGender] = useState({
        male: false,
        female: false,
        nonBinary: false,
        various: false,
    });

    const [height, setSize] = React.useState();

    const [religions, setReligion] = useState({
        atheist: false,
        christianity: false,
        islam: false,
        judaism: false,
        buddhism: false,
        individually: true,
    });

    const [hair, setHair] = useState({
        black: false,
        brown: false,
        blond: false,
        red: false,
        different: false,
        individually: true,
    });

    const [smoking, setSmoking] = useState({
        nonSmoker: false,
        smoker: false,
    });

    const [description, setDesc] = useState('');

    const handleChangeFirstName = (event) => {
        setFirstName(event.target.value);
    };

    const handleChangeLastName = (event) => {
        setLastName(event.target.value);
    };

    const handleChangeGender = (val) => {
        const {name, checked} = val.target;
        setGender((prev) => ({...prev, [name]: checked}));
    };

    const handleChangeHeight = (event) => {
        setSize({body_height: event.target.value});
    };

    const handleChangeReligion = (val) => {
        const {name, checked} = val.target;
        setReligion((prev) => ({...prev, [name]: checked}));
    };

    const handleChangeHair = (val) => {
        const {name, checked} = val.target;
        setHair((prev) => ({...prev, [name]: checked}));
    };

    const handleChangeSmoking = (val) => {
        const {name, checked} = val.target;
        setSmoking((prev) => ({...prev, [name]: checked}));
    };

    const handleChangeDescription = (event) => {
        setDesc(event.target.value);
    };

    const handleChangeAge = (event, newValue) => {
        setValue(newValue);
    };

    function submit() {
        console.log(firstName, lastName, age, gender, height, religions, hair, smoking, description)
    };



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
                                    onChange={handleChangeFirstName}
                                    inputProps={{
                                        maxLenght: 25
                                    }}
                                />
                                <TextField
                                    type="text"
                                    label="Nachname"
                                    value={lastName}
                                    onChange={handleChangeLastName}
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
                                onChange={handleChangeAge}
                            />
                        </Box>
                        </FormGroup>
                    </Item>
                    <Item>
                        <Box sx={{width: 400, margin: '0 auto'}}>
                            <FormLabel> Was für ein Geschlecht hast du ? </FormLabel>
                            <RadioGroup value={gender} onChange={handleChangeGender}>
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
                                onChange={handleChangeHeight}
                            />
                        </Box>
                        </FormGroup>
                    </Item>
                    <Item>
                        <Box sx={{width: 400, margin: '0 auto'}}>
                            <FormLabel> Welcher Religion gehörst du an? </FormLabel>
                            <RadioGroup row value={religions} onChange={handleChangeReligion}>
                                <FormControlLabel sx={{ width: '10%' }} value="atheist" control={<Radio />} label="Atheist" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '10%' }} value="christianity" control={<Radio />} label="Christlich" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '10%' }} value="islam" control={<Radio />} label="Muslimisch" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '10%' }} value="judaism" control={<Radio />} label="Jüdisch" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '10%' }} value="buddhism" control={<Radio />} label="Budistisch" labelPlacement="bottom" />
                            </RadioGroup>
                            <TextField
                                label="Persönliche Auswahl"
                                value={religions}
                                onChange={handleChangeReligion}
                                fullWidth
                                />
                        </Box>
                    </Item>
                    <Item>
                        <Box sx={{width: 400, margin: '0 auto'}}>
                            <FormLabel> Welche Haarfarbe du? </FormLabel>
                            <RadioGroup row value={hair} onChange={handleChangeHair}>
                                <FormControlLabel sx={{ width: '10%' }} value="black" control={<Radio />} label="Schwarz" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '10%' }} value="brown" control={<Radio />} label="Braun" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '10%' }} value="blond" control={<Radio />} label="Blond" labelPlacement="bottom" />
                                <FormControlLabel sx={{ width: '10%' }} value="red" control={<Radio />} label="Rot" labelPlacement="bottom" />
                            </RadioGroup>
                            <TextField
                                label="Persönliche Auswahl"
                                value={hair}
                                onChange={handleChangeHair}
                                fullWidth
                                />
                        </Box>
                    </Item>
                    <Item>
                        <Box sx={{width: 400, margin: '0 auto'}}>
                            <FormLabel> Rauchst du ? </FormLabel>
                            <RadioGroup row value={smoking} onChange={handleChangeSmoking}>
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
                                onChange={handleChangeDescription}
                                inputProps={{
                                    maxLength: 250
                                    }}
                                />
                        </Box>
                    </Item>
                    <Item>
                        <Button onClick={submit}> Profil erstellen </Button>
                    </Item>
                </Stack>
            </Box>
        </div>
    )
}
export default CreateProfil