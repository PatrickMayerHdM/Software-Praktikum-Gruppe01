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

/** Damit dem User beim Suchen passende Personen angezeigt werden, kann dieser Suchprofile erstellen, diese in Verbindung
 * mit den Profilen der anderen User legen dann auch das Ähnlichkeitsmaß fest.
 * In dieser Funktion soll der User dann eins seiner Suchprofile anlegen können.*/


function valuetext(value) {
  return `${value}` ;
}

function SearchProfile(){
    /** Definieren der Daten wie value und der State  */
    const [value = [18,100], setValue] = React.useState([18, 100]);

    /** Wird bei einem Event auf dem slider für das Alter ausgeführt  */
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    /** Testfunktion fürs Übermitteln der Daten (Hier in consolelog)  */
    function submit(){
        console.log(valuetext(value))
    }

    return(
        <div>
            <h1>Lege hier dein Suchprofil an:</h1>

            <Box sx={{ width: '33%', margin: '0 auto'}}>
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={1} sx={{ alignItems: 'stretch' }}>
                    <Item >
                        {/** Hier kann das Geschlecht der in diesem Suchprofil gesuchten Person ausgewählt werden */}
                        <FormLabel> Welches Geschlecht soll die gesuchte Person haben?</FormLabel>
                        <FormGroup row style={{ justifyContent: 'center' }} >
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox />} label="Mann" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox />} label="Frau" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox />} label="Nicht-binär" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox />} label="Divers" labelPlacement="bottom" />
                        </FormGroup>
                    </Item>

                    <Item >
                        {/** Hier kann das Geschlecht der in diesem Suchprofil gesuchten Person ausgewählt werden */}
                        <Box sx={{ width: 400, margin: '0 auto' }}  >
                            <FormLabel>Wie alt soll die Person sein?</FormLabel>
                            <Slider
                                value={value}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}

                            />
                        </Box>
                    </Item>

                    <Item>
                        {/** Platzhalter für eine eventuell weitere Sucheinstellung*/}
                        Platzhalter
                    </Item>

                    <Item >
                        {/** Hier kann die gewünschte Religion der mit diesem Suchprofil gesuchten Person ausgewählt werden */}
                        <FormLabel> Welche Religion sollte die gesuchte Person haben?</FormLabel>
                        <FormGroup row style={{ justifyContent: 'center' }} >
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox />} label="Atheist" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox />} label="Christlich" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox />} label="Muslimisch" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox />} label="Jüdisch" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox />} label="Budistisch" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox defaultChecked />} label="indifferent" labelPlacement="bottom" />
                        </FormGroup>
                    </Item>

                    <Item>
                        {/** Hier kann der Raucherstatus für die mit diesem Suchprofil gesuchten Personen ausgewählt werden */}
                        <FormControl>
                            <FormLabel>Sollte die Person rauchen?</FormLabel>
                            <RadioGroup row >
                                <FormControlLabel value="Nichraucher" control={<Radio />} label="Nichraucher" />
                                <FormControlLabel value="Gelegenheitsraucher" control={<Radio />} label="Gelegenheitsraucher" />
                                <FormControlLabel value="Raucher" control={<Radio />} label="Raucher" />
                                <FormControlLabel value="keinePräferenz"  control={<Radio />} label="indifferent"/>
                            </RadioGroup>
                        </FormControl>
                    </Item>

                    <Item >
                        {/** Hier kann die gewünschte Haarfarbe der mit diesem Suchprofil gesuchten Person ausgewählt werden */}
                        <FormLabel> Welche Haarfarbe sollte die gesuchte Person haben?</FormLabel>
                        <FormGroup row style={{ justifyContent: 'center' }} >
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox />} label="Schwarz" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox />} label="Braun" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox />} label="Blond" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox />} label="Rot" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox />} label="Anders" labelPlacement="bottom" />
                            <FormControlLabel sx={{ width: '10%'}} control={<Checkbox defaultChecked />} label="indifferent" labelPlacement="bottom" />
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