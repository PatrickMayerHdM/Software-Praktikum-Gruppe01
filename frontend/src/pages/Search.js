import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import EditIcon from '@mui/icons-material/Edit';
import "../components/Profile.css";
import SearchIcon from '@mui/icons-material/Search';
import ProfileBoxList from "../components/ProfileBoxList";
import Stack from "@mui/material/Stack";
import Item from "../theme";


/**
 * Innerhalb der Suche, gibt es für den User später verschiedene Optionen.
 * Hierbei kann dieser einerseits, nur neue Profile anzeigen und andererseits kann dieser zwischen seinen Suchprofilen
 * das Suchprofil auswählen, mit welcher er aktuell suchen will.
 * sx={{ width: {sm: '100%'}
 */





class Search extends React.Component{
    
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
        const numSearchProfiles = 4;

        // const welche genau ein Listing für ein Suchprofil darstellt, dabei wir auch die Nummer des Suchprofils angezeigt
        const SearchProfileListing = Array(numSearchProfiles)
          .fill(null)
          .map((item, index) => (
            <Grid item key={index} md={2} xs={2} >
              <button
                onClick={() => this.ChangeSearchProfiles(index)}
                  style={{
                  height: "120%",
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
        <Box sx={{ width: {md: '50%', sm: '60%'} , margin: '0 auto'}}>
             <Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={3} >
                 <Item sx={{ width: "100%"}}>
                     <Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={0} >
                        <Item sx={{ width: "100%"}}>
                            <Grid container direction="row" justifyContent="center" alignItems="stretch">
                              {/** Hier wird der Button zum Anzeigen von nur neuen Profilen erstellt */}
                                <Grid item md={2} xs={2} >
                                  <button
                                    onClick={this.NewProfiles}
                                    style={{
                                      height: "120%",
                                      width: "100%",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      backgroundColor: "#7AA095",
                                      color: "#fff",
                                      cursor: "pointer"
                                    }}
                                  >
                                    <BubbleChartIcon/>
                                  </button>
                                </Grid>

                                  {/** Hier werden die Buttons für die Anzahl der Suchprofile eingetragen */}
                                {SearchProfileListing}

                                  {/** Hier wird der Button zum Bearbeiten von Suchprofilen erstellt */}
                                <Grid item md={2} xs={2} >
                                  <button
                                      onClick={() => this.EditSearchProfiles()}
                                    style={{
                                      height: "120%",
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
                            </Grid>
                        </Item>

                        <Item sx={{ width: "100%"}}>
                            {/** Hier wird der Button zum suchen nach dem aktuell ausgewählten Suchprofil angezeigt */}
                            <Grid item>
                              <button
                                onClick={() => this.Search()}
                                style={{
                                  height: "120%",
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
                        </Item>
                     </Stack>
                 </Item>

                 <Item>
                     <ProfileBoxList/>
                 </Item>
             </Stack>
        </Box>
      </div>
    );
  }
}

export default Search;
