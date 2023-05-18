import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";

/** Da sich die gestaltung der Profil komponente nicht unterscheidet, ob es das eigene Profil oder ein Profil einer
 * anderen Person ist, werden die spezifischen Funktionen in einem extra Komponenten behandelt.
 * Dabei werden hier jetzt die Optionen gezeigt, welche ein User bei seinem eigenen Profil hat.*/

class OptionsOwnProfile extends React.Component {
    render() {

        /**
         * Funktion welche ausgeführt wird, wenn der User den Button "bearbeiten" drückt.
         * Zu Testzwecken noch nicht weiter ausgeführt, sondern nur mit einem console.log
         */
        function EditProfile() {
            console.log("Profil wird bearbeitet")
        }

        return (

            /** Der dargestellte Teil des Komponenten jeweils nested Grids welche dann aus einem button bestehen*/
            <Box sx={{flexGrow: 1}}>
                <Grid container direction="row" justifyContent="center" alignItems="strech">
                    <Grid item md={4} xs={6} spacing={2}>
                        <button onClick={EditProfile} style={{
                            height: "200%",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#ef7714",
                            color: "#fff",
                            cursor: "pointer",
                            border: "solid",
                            borderColor: '#BDC2BF'
                        }}>
                            Bearbeiten
                        </button>
                    </Grid>
                </Grid>
            </Box>
        );
    }

}

export default OptionsOwnProfile