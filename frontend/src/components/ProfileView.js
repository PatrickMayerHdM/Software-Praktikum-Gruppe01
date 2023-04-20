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

function ProfileView(){
    return(
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Item>Vorname</Item>
            </Grid>
            <Grid item xs={5}>
              <Item>Nachname</Item>
            </Grid>
            <Grid item xs={2}>
              <Item>Alter</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>Geschlecht</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>Größe</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>Ähnlichkeit</Item>
            </Grid>
          </Grid>
        </Box>
    );
}

export default ProfileView