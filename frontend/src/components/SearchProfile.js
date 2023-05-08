/** Die verschiedenen gebrauchten Imports*/
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Item from "../theme";
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import {Button} from "@mui/material";
import { useState} from "react";

/** Damit dem User beim Suchen passende Personen angezeigt werden, kann dieser Suchprofile erstellen, diese in Verbindung
 * mit den Profilen der anderen User legen dann auch das Ähnlichkeitsmaß fest.
 * In dieser Funktion soll der User dann eins seiner Suchprofile anlegen können.*/


function SearchProfile(){

    /** const für möglichen Werte  */

    /** const für die Auswahlmöglichkeiten beim Geschlecht  */
    const [gender, setGender] = useState({
        male: false,
        female: false,
        nonBinary: false,
        various: false,
    });

    /** const für die Auswahlmöglichkeiten beim Alter  */
    const [age, setValue] = React.useState([18, 100])

    /** const für die Auswahlmöglichkeiten bei den Religionen  */
    const [religions, setReligions] = useState({
        atheist: false,
        christianity: false,
        islam: false,
        judaism: false,
        buddhism: false,
        indifferent: true, // auf "True" gesetzt weil der Standardwert
    });

    /** const für die Auswahlmöglichkeiten bei den Raucheroptionen  */
    const [smoking, setSmoking] = useState({
        nonSmoker: false,
        occasional: false,
        smoker: false,
        indifferent: false, // auf "True" gesetzt weil der Standardwert
    });

    /** const für die Auswahlmöglichkeiten bei den Haarfarben  */
    const [hair, setHair] = useState({
        black: false,
        brown: false,
        blond: false,
        red: false,
        different: false,
        indifferent: false,
    });

    /** handleChange const: Also wenn etwas geändert wird*/

    /** handleChange für die Auswahlmöglichkeiten beim Geschlecht  */
    const handleChangeGen = (val) => {
        const {name, checked} = val.target;
        setGender((prev) => ({...prev, [name]:checked,
        }));
    };

    /** handleChange für den Schieber beim Alter  */
    const handleChange_age = (event, newValue) => {
        setValue(newValue);
    };

    /** handleChange für die Auswahlmöglichkeiten bei den Religionen  */
    const handleChangeRel = (val) => {
        const {name, checked} = val.target;
        setReligions((prev) => ({...prev, [name]:checked,
        }));
    };

    /** handleChange für die Auswahlmöglichkeiten bei dem Thema Rauchen  */
    const handleChangeSmo = (val) => {
        const {name, checked} = val.target;
        setSmoking((prev) => ({...prev, [name]:checked,
        }));
    };

    /** handleChange für die Auswahlmöglichkeiten bei dem Thema Rauchen  */
    const handleChangeHai = (val) => {
        const {name, checked} = val.target;
        setHair((prev) => ({...prev, [name]:checked,
        }));
    };

    /** Testfunktion fürs Übermitteln der Daten (Hier in consolelog)  */
    function submit(){
        console.log(gender, age, religions, smoking, hair )
    }


    /** Return Teil  */
    return(
        <div>
            <h1>Lege hier dein Suchprofil an:</h1>

            <Box sx={{ width: '33%', margin: '0 auto'}}>
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} sx={{ alignItems: 'stretch' }}>
                    <Item >
                        {/** Hier kann das Geschlecht der in diesem Suchprofil gesuchten Person ausgewählt werden */}
                        <FormLabel> Welches Geschlecht soll die gesuchte Person haben?</FormLabel>
                        <FormGroup row style={{ justifyContent: 'center' }} >
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox name="male" checked={gender.male} onChange={handleChangeGen} />} label="Mann" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox name="female" checked={gender.female} onChange={handleChangeGen} />} label="Frau" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox name="nonBinary" checked={gender.nonBinary} onChange={handleChangeGen} />} label="Nicht-binär" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox name="various" checked={gender.various} onChange={handleChangeGen} />} label="Divers" labelPlacement="bottom" />
                        </FormGroup>
                    </Item>

                    <Item >
                        {/** Hier kann das Geschlecht der in diesem Suchprofil gesuchten Person ausgewählt werden */}
                        <Box sx={{ width: 400, margin: '0 auto' }}  >
                            <FormLabel>Wie alt soll die Person sein?</FormLabel>
                            <Slider
                                value={age}
                                onChange={handleChange_age}
                                valueLabelDisplay="auto"
                                min={18}

                            />
                        </Box>
                    </Item>

                    <Item >
                        {/** Hier kann die gewünschte Religion der mit diesem Suchprofil gesuchten Person ausgewählt werden */}
                        <FormLabel> Welche Religion sollte die gesuchte Person haben?</FormLabel>
                        <FormGroup row style={{ justifyContent: 'center' }} >
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox name="atheist" checked={religions.atheist} onChange={handleChangeRel}/>} label="Atheist" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox name="christianity" checked={religions.christianity} onChange={handleChangeRel}/>} label="Christlich" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox name="islam" checked={religions.islam} onChange={handleChangeRel}/>} label="Muslimisch" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox name="judaism" checked={religions.judaism} onChange={handleChangeRel}/>} label="Jüdisch" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox name="buddhism" checked={religions.buddhism} onChange={handleChangeRel}/>} label="Budistisch" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox name="indifferent" checked={religions.indifferent} onChange={handleChangeRel} defaultChecked />} label="indifferent" labelPlacement="bottom" />
                        </FormGroup>
                    </Item>

                    <Item>
                        {/** Hier kann der Raucherstatus für die mit diesem Suchprofil gesuchten Personen ausgewählt werden */}
                        <FormLabel>Sollte die Person rauchen?</FormLabel>
                        <FormGroup row style={{ justifyContent: 'center' }} >
                            <FormControlLabel sx={{ width: '16%'}} control={<Checkbox name="nonSmoker" checked={smoking.nonSmoker} onChange={handleChangeSmo} />} label="Nichraucher" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '16%'}} control={<Checkbox name="occasional" checked={smoking.occasional} onChange={handleChangeSmo} />} label="Gelegenheitsraucher" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '16%'}} control={<Checkbox name="smoker" checked={smoking.smoker} onChange={handleChangeSmo} />} label="Raucher" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '16%'}} control={<Checkbox name="indifferent" checked={smoking.indifferent} onChange={handleChangeSmo} />} label="indifferent" labelPlacement="bottom" />

                        </FormGroup>
                    </Item>

                    <Item >
                        {/** Hier kann die gewünschte Haarfarbe der mit diesem Suchprofil gesuchten Person ausgewählt werden */}
                        <FormLabel> Welche Haarfarbe sollte die gesuchte Person haben?</FormLabel>
                        <FormGroup row style={{ justifyContent: 'center' }} >
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox name="black" checked={hair.black} onChange={handleChangeHai} />} label="Schwarz" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox name="brown" checked={hair.brown} onChange={handleChangeHai} />} label="Braun" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox name="blond" checked={hair.blond} onChange={handleChangeHai} />} label="Blond" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox name="red" checked={hair.red} onChange={handleChangeHai} />} label="Rot" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox name="different" checked={hair.different} onChange={handleChangeHai} />} label="Anders" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox defaultChecked name="indifferent" checked={hair.indifferent} onChange={handleChangeHai} />} label="indifferent" labelPlacement="bottom" />
                        </FormGroup>
                    </Item>
                    <Item>
                        <Button onClick={submit}>Suchprofil erstellen</Button>
                    </Item>
                </Stack>
            </Box>
        </div>
    )


}
export default SearchProfile