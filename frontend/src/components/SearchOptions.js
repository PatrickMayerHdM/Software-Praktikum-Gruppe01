import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import EditIcon from '@mui/icons-material/Edit';
import "./Profile.css";
import SearchIcon from '@mui/icons-material/Search';

/**
 * Innerhalb der Suche, gibt es für den User später verschiedene Optionen.
 * Hierbei kann dieser einerseits, nur neue Profile anzeigen und andererseits kann dieser zwischen seinen Suchprofilen
 * das Suchprofil auswählen, mit welcher er aktuell suchen will.
 * sx={{ width: {sm: '100%'}
 */


class SearchOptions extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
          selectedProfileIndex: null,
        };
    }

    // Hier wird erstmal ein console.log ausgeführt, wenn ein Button gedrückt wird, damit später dann nur neue Profile angezeigt werden.
    NewProfiles(){
        console.log("Button nur noch neue Profile gedrückt")
    }

    // Hier wird erstmal ein console.log ausgeführt, wenn ein Button gedrückt wird, damit später dann das aktuell ausgewähle Profil bearbeitet werden kann.
    EditSearchProfiles() {
        console.log("Das Suchprofil", this.state.selectedProfileIndex, " wird bearbeitet")
    }

    // Hier wird erstmal ein console.log ausgeführt, wenn der Such Button gedrückt wird, damit später dann danach gesucht wird.
    Search() {
        console.log("Es wurde eine Suchanfrage mit dem Suchprofil", this.state.selectedProfileIndex,  "gestellt");
    }

    // Hier wird erstmal ein console.log ausgeführt, wenn ein Button gedrückt wird, damit später dann das Suchprofil hier geändert wird.
    ChangeSearchProfiles(index) {
        console.log("Es wurde auf das Suchprofil", index, "geändert");
        // State handling, damit die Farbe von dem ausgewählten Profil geändert wird
        this.setState({ selectedProfileIndex: index });
    }


    render() {


        // const welche die Anzahl an zu erstellenden Suchprofilen angibt
        const numSearchProfiles = 5;

        // const welche genau ein Listing für ein Suchprofil darstellt, dabei wir auch die Nummer des Suchprofils angezeigt
        const SearchProfileListing = Array(numSearchProfiles)
          .fill(null)
          .map((item, index) => (
            <Grid item key={index} md={1} xs={2} >
              <button
                onClick={() => this.ChangeSearchProfiles(index)}
                  style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    this.state.selectedProfileIndex === index ? "#820263" : "#30638E", // Wenn ein Profil ausgewählt ist, wird "#820263" als Farbe verwendet, sonst: "#30638E"
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Suchprofil {index + 1}
              </button>
            </Grid>
          ));

    return (

      <div>
        <h1>Suche Jetzt:</h1>
        <Box sx={{ width: {lg: '100%',  sm: '100%'}}}>
          <Grid container direction="row" justifyContent="center" alignItems="stretch" style={{ height: "100%" }}>
              {/** Hier wird der Button zum Anzeigen von nur neuen Profilen erstellt */}
            <Grid item md={1} xs={1} spacing={2} >
              <button
                onClick={this.NewProfiles}
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#7AA095",
                  color: "#fff",
                  cursor: "pointer"
                }}
              >
                <BubbleChartIcon />
              </button>
            </Grid>

              {/** Hier werden die Buttons für die Anzahl der Suchprofile eingetragen */}
            {SearchProfileListing}

              {/** Hier wird der Button zum Bearbeiten von Suchprofilen erstellt */}
            <Grid item md={1} xs={1} spacing={2} style={{height: "200%"}}>
              <button
                  onClick={() => this.EditSearchProfiles()}
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#ef7714",
                  color: "#fff",
                  cursor: "pointer"
                }}
              >
                <EditIcon />
              </button>
            </Grid>

                {/** Hier wird der Button zum suchen nach dem aktuell ausgewählten Suchprofil angezeigt */}
            <Grid md={7} xs={12} >
              <button
                onClick={() => this.Search()}
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#ff0059",
                  color: "#fff",
                  cursor: "pointer",
                  margin: "auto",
                }}
              >
                <SearchIcon />
              </button>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}

export default SearchOptions;
