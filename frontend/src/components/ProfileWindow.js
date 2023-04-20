import React from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Item from '../theme';


/**
 * Erstellt einen react Komponenten für die Profilvorschau.
 * Diese soll dann in verschiedenen Ansichten innerhalb
 * der App vorkommen.
 *
 * Diese Vorschau soll dann die Aspekte: Bild (wenn mit
 * Bildern umgesetzt), Vorname, Nachname, Alter, Geschlecht,
 * vielleicht Größe und den Ähnlichkeitsmaß beinhalten.
 */

function ProfileWindow(){
    return(
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </Box>
    )
}

export default ProfileWindow