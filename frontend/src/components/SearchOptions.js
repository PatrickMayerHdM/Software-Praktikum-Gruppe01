import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import EditIcon from '@mui/icons-material/Edit';
import "./Profile.css";

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
          selectedProfileIndex: null
        };
    }

    NewProfiles(){
        console.log("Button nur noch neue Profile gedrückt")
    }

    EditSearchProfiles() {
        console.log("Ein Suchprofil wird bearbeitet")
    }

    ChangeSearchProfiles(index) {
        console.log("Es wurde auf das Suchprofil", index, "geändert");
        this.setState({ selectedProfileIndex: index });
    }


    render() {

        const numSearchProfiles = 5;

        const SearchProfileListing = Array(numSearchProfiles)
          .fill(null)
          .map((item, index) => (
            <Grid item key={index} md={1} xs={1} >
              <button
                onClick={() => this.ChangeSearchProfiles(index)}
                  style={{
                  height: "200%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    this.state.selectedProfileIndex === index ? "#820263" : "#30638E",
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
        <h1>Deine Optionen:</h1>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container direction="row" justifyContent="center" alignItems="stretch">
            <Grid item md={1} xs={1} spacing={2}>
              <button
                onClick={this.NewProfiles}
                style={{
                  height: "200%",
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

            {SearchProfileListing}

            <Grid item md={1} xs={1} spacing={2}>
              <button
                onClick={this.EditSearchProfiles}
                style={{
                  height: "200%",
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
        </Box>
      </div>
    );
  }
}

export default SearchOptions;
