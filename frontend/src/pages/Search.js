import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import "../components/Profile/Profile.css";
import SearchIcon from '@mui/icons-material/Search';
import Stack from "@mui/material/Stack";
import Item from "../theme";
import { Link } from "react-router-dom"
import DatingSiteAPI from "../api/DatingSiteAPI";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchProfileBox from "../components/Search/SearchProfileBox";
import { Switch } from '@mui/material';

/**
 * In der Suche kann ein User einerseits Partnervorschläge finden. Diese Partnervorschläge haben ein Ähnlichkeitsmaß
 * zu dem von dem User ausgewählten Suchprofil.
 * Diese Suchergebnisse, kann der User zudem danach filtern, ob dieser die gefundene Person bereits angesehen hat.
 * Zudem kann der User Suchprofile löschen und auf die Seite zum Erstellen bzw. Bearbeiten eines Suchprofils gelangen.
 */


class Search extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            numSearchProfiles: 0, // Die Anzahl der Suchprofile
            selectedProfileIndex: null, // Der Index des aktuell Ausgewählten Suchprofils
            selectedProfile: null, // Das aktuell Ausgewählte Suchprofil.
            Searchprofiles: [ ],  // Dieses Array für Suchprofile wird beim Laden der Seite geladen und besteht aus den ID's der Suchprofile
            profiles: [ ], // Die Profile die wir als Antwort bekommen.
            RenderProfiles: [ ], // Die Profile, welche dem User angezeigt werden.
            numRenderProfiles: 0, // Die Anzahl der Profile die angezeigt werden sollen.
            profile_id: this.props.user.uid, // Die eigene profile_id die durch props aus App.js erhalten wird
            clickable: false, // Boolean, ob ein User ein Suchprofil ausgewählt hat und dann suchen kann, da ein User dies ohne ein Auasgewähltes Suchprofil nicht kann.
            switchModeVisits: false, // Boolean, ob ein User nur noch nicht besuchte Profile angezeigt bekommen will
        };

        this.DeleteSearchProfile = this.DeleteSearchProfile.bind(this);
        this.loadingPage = this.loadingPage.bind(this);
        this.ChangeSearchProfiles = this.ChangeSearchProfiles.bind(this);
        this.Search = this.Search.bind(this);
        this.handleSearchModeChange = this.handleSearchModeChange.bind(this);
        this.RenderSearchResults = this.RenderSearchResults.bind(this);

    }


    /**
     * Diese Funktion RenderSearchResults() ist dafür verantwortlich, die Partnervorschläge zu filtern und anzuzeigen,
     * je nachdem, ob der Benutzer nur die noch nicht besuchten Profile sehen möchte oder alle. Dies funktioniert mit
     * dem State switchModeVisits, je nach der Entscheidung werden dem User die dazustellenden Profile in einem Array
     * zusammengefasst.
     */

    RenderSearchResults() {
        // Abfrage welchen Wert der switch (für noch nicht angesehene Profile) hat, hier ist true, dass dies ausgewählt wurde
        if (this.state.switchModeVisits === true) {
            // hier wird jedes einzelne Element des profiles Array ausgewählt.
            this.state.profiles.forEach(element => {
                // Mit einer if Abfrage wird geprüft, ob ein Profil von einem User bereits besucht wurde. (Wenn dies nicht der Fall ist, ist false enthalten).
                if (element[2] === false) {
                    // Wenn ein Element (also Partnervorschlag) noch nciht besucht wurde, wird dieser dem RenderProfiles Array hinzugefügt.
                    this.setState(prevState => ({
                        RenderProfiles: [...prevState.RenderProfiles, element]
                    }), () => {
                        const lengthRenderProfiles = this.state.RenderProfiles.length;
                        this.setState({ numRenderProfiles: lengthRenderProfiles });
                    });
                }
            })
        } else {
            /**
             * Wenn ein User alle Partnervorschläge sehen will, ohne die Prüfung, ob der User sie schon gesehen hat,
             * wird dieser Code ausgeführt.
             */
            this.state.profiles.forEach(element => {
                this.setState(prevState => ({
                        RenderProfiles: [...prevState.RenderProfiles, element]
                    }), () => {
                        const lengthRenderProfiles = this.state.RenderProfiles.length;
                        this.setState({ numRenderProfiles: lengthRenderProfiles });
                    });
            })
        }
    }


    /**
     * Hier wird die eigentliche Suche ausgeführt, der User kann diese Funktion durch das Drücken eines Buttons
     * ausführen. Dabei wird an die DatingSiteAPI das ausgewählte Suchprofil übergeben.
     * Um diese Funktion auszuführen, muss ein User ein SuchProfil ausgewählt haben.
     * @constructor
     */

    Search() {
        /**
         * Da bei jeder Suchanfrage, andere Suchergebnisse dargestellt werden müssen die dargestellten Profile
         * wieder zurückgesetzt werden, damit die neuen Suchergebnisse dargestellt werden können.
         */
        this.setState({
            RenderProfiles: [ ],
            numRenderProfiles: 0,
        })
        DatingSiteAPI.getAPI()
        .getSearchResults(this.state.selectedProfile)
        .then(profilesvar => {
            this.setState({
                // Die Ergebnisse der Suche werden in den State des Profiles Array gesetzt.
                profiles: profilesvar,

            }, () => {
                // Hier wird die RenderSearchResults aufgerufen, da dies der Schritt nach dem Empfangen der Suchergebnisse ist.
                this.RenderSearchResults()
            })
        })
        .catch(error => {
          console.error('Error fetching in Search() :', error);
        });
    }

    handleSearchModeChange = () => {
        this.setState({
            RenderProfiles: [ ],
            numRenderProfiles: 0,
            switchModeVisits: !this.state.switchModeVisits,
        }, () => {
            this.RenderSearchResults()
        });
    }

    /**
     * Diese Funktion wird ausgeführt, wenn ein User zwischen einem seiner SuchProfile wechselt und ein anderes auswählt.
     * Denn im State ist immer vermerkt, welches SuchProfil ein User gerade ausgewählt hat.
     * Zusätzlich wird hier der State clickable gesetzt, dieser ist verantwortlich, ob ein User Optionen wie z.B. die
     * Suche klicken kann. Denn hierfür wird ein ausgewähltes Suchprofil benötigt.
     * @param index
     * @constructor
     */

    ChangeSearchProfiles(index) {
        // State handling, damit die Farbe von dem ausgewählten Profil geändert wird
        this.setState({ selectedProfileIndex: index });
        this.setState({ clickable: true });
        this.setState({ selectedProfile: this.state.Searchprofiles[index] });
    }

    /**
     * Diese Funktion wird ausgeführt, wenn ein SuchProfil gelöscht werden soll.
     * Um diese Funktion auszuführen, muss ein User ein SuchProfil ausgewählt haben.
     * @constructor
     */

    DeleteSearchProfile(){
        DatingSiteAPI.getAPI()
            .removeSearchProfile(this.state.selectedProfile)
            .catch((e) =>
                this.setState({
                error: e,
                })
            );
        const updatedSearchProfiles = this.state.Searchprofiles.filter(searchprofileId => searchprofileId !== this.state.selectedProfile);
        const lengthupdatedSearchProfiles = updatedSearchProfiles.length;
        this.setState({
            Searchprofiles: updatedSearchProfiles,
            numSearchProfiles: lengthupdatedSearchProfiles
        });
    };

    /**
     * Diese componentDidUpdate-Funktion wird aufgerufen, wenn der Zustand von Searchprofiles aktualisiert wird. Sie
     * aktualisiert die Anzahl der Suchprofile und sorgt dafür, dass ein entferntes Suchprofil nicht mehr in der Liste
     * angezeigt wird.
     */

    componentDidUpdate(prevProps, prevState) {
        // Hier wird überprüft, ob sich der Zustand von Searchprofiles mit dem vorherigen Zustand von Searchprofiles unterscheidet.
        if (prevState.Searchprofiles !== this.state.Searchprofiles) {
            // Hier wird die Länge/ Anzahl der SuchProfile, wenn es zu einer Änderung kam aktualisiert.
            const numSearchProfiles = this.state.Searchprofiles.length;
            this.setState({ numSearchProfiles });

            //
            if (this.state.selectedProfile && !this.state.Searchprofiles.includes(this.state.selectedProfile)) {
                this.setState({ selectedProfileIndex: null, selectedProfile: null });
            }
        }
    }

    /**
     * Diese Funktion wird in der componentDidMount() aufgerufen und lädt die SuchProfile eines Users. Dafür wird
     * zu der DatingSiteAPI mit getSearchProfileIDs und der eigenen Profile_ID eine Anfrage geschickt.
     * Die SuchProfile, welche dann empfangen werden, sind im State Array SearchProfiles gespeichert. Zudem wird
     * die Länge, also die Anzahl der SuchProfile gespeichert.
     * Dazu wird ein User zum Erstellen eines SuchProfils weitergeleitet, wenn ein User noch keine Suchprofile besitzt.
     * Und das erste SuchProfil eines Users wird automatisch ausgewählt (wenn er Suchprofile hat), damit der User
     * direkt suchen kann.
     */

    async loadingPage(){
        // API Anfrage für die Suchprofile eines Users.
        DatingSiteAPI.getAPI()
        .getSearchProfileIDs(this.props.user.uid)
        .then(Searchprofilesvar => {
            this.setState({
                // Setzen der SuchProfile eines Users in das State Array Searchprofiles.
                Searchprofiles: Searchprofilesvar
            }, () => {
                // Ermitteln der Länge der Suchprofile, dies ist für die Darstellung der SuchProfile als Liste für den User relevant.
                const lengthSearchprofiles = this.state.Searchprofiles.length;
                this.setState({
                    numSearchProfiles: lengthSearchprofiles
                },
                    async () => {
                    // Dies ist eine Abfrage, ob ein User bereits ein SuchProfil hat, andernfalls wird der User zum Erstellen eines SuchProfils weitergeleitet.
                    if (this.state.numSearchProfiles === 0){
                        // Hier findet die Weiterleitung auf die Seite zum Erstellen eines SuchProfils statt.
                        window.location.replace("/Suche/Suchprofil/new");
                    } else {
                        /**
                         * Da bei jeder Suchanfrage, andere Suchergebnisse dargestellt werden müssen die dargestellten Profile
                         * wieder zurückgesetzt werden, damit die neuen Suchergebnisse dargestellt werden können.
                         */
                        await this.setState({
                            RenderProfiles: [ ],
                            numRenderProfiles: 0,
                        })
                        // Hier wird das erste SuchProfil eines Users automatisch ausgewählt.
                        await this.ChangeSearchProfiles(0)
                        // Hier wird automatisch mit dem ersten SuchProfil eines Users gesucht, wenn dieser die Suche aufruft.
                        this.Search();
                    }
                });
            });

        })
        .catch(error => {
            console.error('Error fetching data from API:', error);
        });
    }


    /**
     * Die componentDidMount wird bei Laden der React Seite aufgerufen und ruft intern dann eine andere Funktion auf.
     * Diese kann dann entweder die zum Testing extra geschriebene Funktion loadPage() sein, oder die Funktion
     * loadingPage(). Diese Funktion wird dabei normalerweise ausgeführt und holt sich die Daten zu den SuchProfilen
     * aus dem BackEnd.
     */
    componentDidMount() {
      this.loadingPage();
    }


    /**
     * Rendert den Komponenten
     */
    render() {

        // const für den Status, ob die buttons (Suche, edit, delete ausführbar sind)
        const { clickable } = this.state
        // const um den State der Anzahl der Profile mit count anzusprechen
        const count = this.state.numRenderProfiles ;

        // const welche genau ein Listing für ein Suchprofil darstellt, dabei wir auch die Nummer des Suchprofils angezeigt
        const SearchProfileListing = Array(this.state.numSearchProfiles)
            .fill(null)
            .map((item, index) => (
                <Grid item key={index} md={2} xs={2} >
                    <button onClick={() => this.ChangeSearchProfiles(index)}
                            style={{
                                height: "120%",
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor:
                                    this.state.selectedProfileIndex === index ? "#F74464" : "#6A7285",
                                color: "#fff",
                                cursor: "pointer", paddingBottom: "1%", paddingTop: "1%",
                            }}
                    >
                        Suchprofil {index + 1}
                    </button>
                </Grid>
            ));
        // Methode zur Darstellung einer SearchProfileBox (So wird ein Partnervorschlag dem User dargestellt)
        const SearchListing = Array(count).fill(null).map((item, index) => (
            <Grid item xs={12} key={index} >
                <SearchProfileBox key={this.state.RenderProfiles[index]} current_profile={this.props.user.uid} Profilematchmaking={this.state.RenderProfiles[index]}/>
            </Grid>
        ));

    return (
        <div>
            <Box sx={{ width: {lg: '50%', md: '60%', sm: '80%'} , margin: '0 auto'}}>
                <Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={3} >
                    <Item sx={{ width: "100%"}}>
                        <Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={0} >
                            <Item sx={{ width: "100%"}}>
                                <Grid container direction="row" justifyContent="center" alignItems="stretch">
                                    {/** Hier wird der Button zum Anzeigen von nur neuen Profilen erstellt */}
                                    <Grid item md={2} xs={2} sx={{ backgroundColor: "#374258", color: "#fff", height: "100%", width: "100%" , border: "1.6px solid"}}>
                                        <Switch onChange={this.handleSearchModeChange} label="Mein Switch" />
                                    </Grid>

                                    {/** Hier werden die Buttons zum Erstellen eines Suchprofils erstellt */}
                                    <Grid item md={2} xs={2} >
                                        <Link to="/Suche/Suchprofil/new">
                                            <button
                                                style={{
                                                    height: "100%",
                                                    width: "100%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    backgroundColor: "#374258",
                                                    color: "#fff",
                                                    cursor: "pointer"}}
                                            >
                                                <AddIcon/>
                                            </button>
                                        </Link>
                                    </Grid>

                                    {/** Hier wird der Button zum Suchen nach dem aktuell ausgewählten Suchprofil angezeigt */}
                                    <Grid item md={4} xs={4}>
                                        <button
                                            onClick={() => this.Search()}
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                backgroundColor: "#374258",
                                                color: "#fff",
                                                cursor: "pointer",
                                                margin: "auto",
                                                pointerEvents: clickable ? '' : 'none',
                                            }}
                                        >
                                            <SearchIcon />
                                        </button>
                                    </Grid>

                                    {/** Hier wird der Button zum Bearbeiten von Suchprofilen erstellt */}
                                    <Grid item md={2} xs={2} >
                                        <Link to={`/Suche/Suchprofil/${this.state.selectedProfile}`} style={{ pointerEvents: clickable ? '' : 'none' }} >
                                            <button
                                                style={{
                                                    height: "100%",
                                                    width: "100%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    backgroundColor: "#374258",
                                                    color: "#fff",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <EditIcon/>
                                            </button>
                                        </Link>
                                    </Grid>

                                    {/** Hier wird der Button zum Löschen des ausgewählten Suchprofils erstellt */}
                                    <Grid item md={2} xs={2} >

                                        <button
                                            onClick={() => this.DeleteSearchProfile()}
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                backgroundColor: "#374258",
                                                color: "#fff",
                                                cursor: "pointer",
                                                pointerEvents: clickable ? '' : 'none',
                                            }}
                                        >
                                            <DeleteIcon/>
                                        </button>
                                    </Grid>
                                </Grid>
                            </Item>

                            <Item sx={{ width: "100%"}}>
                                {/** Hier werden die Suchprofile, die ein User auswählen kann, dargestellt. */}
                                {SearchProfileListing}
                            </Item>
                        </Stack>
                    </Item>
                    {/** Wenn SearchListing länger als 0 ist, word ein SearchListing dargestellt*/}
                    {SearchListing.length > 0 ? (
                        <Box sx={{ width: '100%',margin: '0 auto'}} >
                            <Grid item container spacing={2} justifyContent="center">
                                {/** Hier werden die Suchergebnisse (Partnervorschläge), die ein User als Antwort bekommt, dargestellt. */}
                                {SearchListing}
                            </Grid>
                        </Box>
                    ) : (
                        // Dies stellt den Text dar, welcher einem User angezeigt wird, wenn dieser noch nicht gesucht hat.
                        <p>Suche um Profile zu sehen...</p>
                    )}
                </Stack>
            </Box>
        </div>
    );
  }
}

export default Search;
