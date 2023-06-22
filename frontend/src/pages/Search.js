import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import "../components/Profile/Profile.css";
import SearchIcon from '@mui/icons-material/Search';
import ProfileBoxList from "../components/Profile/ProfileBoxList";
import Stack from "@mui/material/Stack";
import Item from "../theme";
import { Link } from "react-router-dom"
import DatingSiteAPI from "../api/DatingSiteAPI";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import infoobjectBO from "../api/InfoObjectBO";
import SearchProfileBox from "../components/Search/SearchProfileBox";

/**
 * Innerhalb der Suche gibt es für den User später verschiedene Optionen.
 * Hierbei kann dieser einerseits, nur neue Profile anzeigen und andererseits kann dieser zwischen seinen Suchprofilen
 * das Suchprofil auswählen, mit welcher er aktuell suchen will.
 *
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
            profile_id: this.props.user.uid, // Die eigene profile_id die durch props aus App.js erhalten wird
            clickable: false, // Boolean, ob ein User ein Suchprofil ausgewählt hat und dann suchen kann, da ein User dies ohne ein Auasgewähltes Suchprofil nicht kann.
            numProfiles: 0, // Nummer der Profile welche als Antwort kamen
        };

        this.NewProfiles = this.NewProfiles.bind(this);
        this.DeleteSearchProfile = this.DeleteSearchProfile.bind(this);
        this.loadPage = this.loadPage.bind(this);
        this.loadingPage = this.loadingPage.bind(this);
        this.ChangeSearchProfiles = this.ChangeSearchProfiles.bind(this);
        this.SearchallProfiles = this.SearchallProfiles.bind(this);
        this.Search = this.Search.bind(this);
        this.TestSearch = this.TestSearch.bind(this);
    }


    /**
     * Diese Funktion ruft in der DatingsiteAPI getOnlyNewProfiles auf und übergibt dabei die Profile_id (des
     * eigenen Profils) und die SearchProfileID (this.state.selectedProfile) des ausgewählten Suchprofils.
     * Dieser Aufruf ermöglicht es, dem User Partnervorschläge basierend auf Konten zu sehen, welcher dieser User noch
     * nicht besucht hat. Diese Partnervorschläge sind dann anhand des Ähnlichkeitsmaß, in Bezug auf ein Suchprofil
     * geordnet.
     * Um diese FUnktion auszuführen, muss ein User ein SuchProfil ausgewählt haben.
     * @constructor
     */
    NewProfiles(){
        const { profile_id } = this.state; // Zugriff auf profile_id aus dem state
        //console.log("Button nur noch neue Profile gedrückt, von dieser Profil:id: ", profile_id," mit diesem " + "SuchProfil: ", this.state.selectedProfile)
        DatingSiteAPI.getAPI()
            .getOnlyNewProfiles(profile_id, this.state.selectedProfile)
            .then(profilesvar => {
                // Ermitteln der Länge der zurückgegebenen Daten, dies ist zur Darstellung der SearchProfileBoxen relevant.
                const lengthProfiles = profilesvar.length;
                this.setState(prevState => ({
                    profiles: profilesvar,
                    numProfiles: lengthProfiles
                }), () => {
                    console.log("In Search.js in Search(), sieht so profiles aus: ", this.state.profiles, this.state.numProfiles);
                });
            })
            .catch(error => {
                console.error('Error fetching data in NewProfiles():', error);
            });
    }

    /**
     * Diese Funktion wird bei einem onClick() auf das Suchprofil bearbeiten ausgeführt.
     * Es beinhaltet einen Console.log zum debug, da das eigentliche Weiterleiten über den Link gemacht wird,
     * ist hier kein weiterer Code notwendig.
     * Der User wird dann auf die Seite zum Bearbeiten/Erstellen eines Suchprofils weitergeleitet.
     */

    EditSearchProfiles(event) {
        //console.log("Das Suchprofil", this.state.selectedProfileIndex, " wird bearbeitet")
        //console.log("Es wurde auf das Suchprofil: ", this.state.Searchprofiles[this.state.selectedProfileIndex], "geändert");
    }

    /**
     * Eine Funktion, welche eine Liste von allen Profilen zurückgibt, dabei werden keine Filter oder Suchprofile
     * beachtet. Sie ist nicht aktuell für den User nicht nutzbar.
     */
    SearchallProfiles() {
        DatingSiteAPI.getAPI()
        .getAllProfiles()
        .then(profilesvar => {
            // Ermitteln der Länge der zurückgegebenen Daten, dies ist zur Darstellung der SearchProfileBoxen relevant.
            const lengthProfiles = profilesvar.length;
            this.setState(prevState => ({
                profiles: profilesvar,
                numProfiles: lengthProfiles
            }));
        })
        .catch(error => {
          console.error('Error fetching data in SearchallProfiles():', error);
        });
    }


    /**
     * Hier wird die eigentliche Suche ausgeführt, der User kann diese Funktion durch das Drücken eines Buttons
     * ausführen. Dabei wird an die DatingSiteAPI das ausgewählte Suchprofil übergeben.
     * Um diese FUnktion auszuführen, muss ein User ein SuchProfil ausgewählt haben.
     * @constructor
     */

    Search() {
        //console.log("Mit dem Suchprofil",this.state.selectedProfile ,"wird gesucht");
        DatingSiteAPI.getAPI()
        .getSearchResults(this.state.selectedProfile)
        .then(profilesvar => {
            // Ermitteln der Länge der zurückgegebenen Daten, dies ist zur Darstellung der SearchProfileBoxen relevant.
            const lengthProfiles = profilesvar.length;
            this.setState(prevState => ({
                profiles: profilesvar,
                numProfiles: lengthProfiles
            }), () => {
                // Hier wird der neue State des profiles Arrays ausgegeben und dazu die im State festgelegte Anzahl der Profile
                //console.log("In Search.js in Search(), sieht so profiles aus: ", this.state.profiles, this.state.numProfiles);
            });
        })
        .catch(error => {
          console.error('Error fetching in Search() :', error);
        });
    }

    /**
     * Diese TestSearch hat eine BeispielsTest var, die ein Beispiels RESPONSEJSON darstellt.
     * @constructor
     */
    TestSearch() {
        //console.log("Das ist die Testsearch mit dem Suchprofil",this.state.selectedProfile ,"wird gesucht");
        const BeispielRESPONSEJSON = ([['OnhCSTN3ypaBnidTh2x4cbC7ie12', 80.0], ['zQokAwj2tchqk4dkovLVvqCmzWp2', 60.0], ['zQokAwj2tchqk4dkovLVvqCmzWp2', 40.0]])
        //console.log("So sieht das BeispielRESPONSEJSON in der console aus: ",BeispielRESPONSEJSON)
        // Ermitteln der Länge des BeispielRESPONSEJSON, dies ist zur Darstellung der SearchProfileBoxen relevant.
        const lengthProfiles = BeispielRESPONSEJSON.length;
        this.setState(prevState => ({
            profiles: BeispielRESPONSEJSON,
            numProfiles: lengthProfiles
        }));
    }

    /**
     * Diese Funktion wird ausgeführt, wenn ein User zwischen einem seiner SuchProfile wechselt und ein anderes Auswählt.
     * Denn im State ist immer vermerkt, welches SuchProfil ein User gerade ausgewählt hat.
     * Zusätzlich wird hier der State clickable gesetzt, dieser ist verantwortlich, ob ein User Optionen wie z.B. die
     * Suche klicken kann. Denn hierfür wird ein ausgewähltes Suchprofil benötigt.
     * @param index
     * @constructor
     */
    ChangeSearchProfiles(index) {
        //console.log("Es wurde auf das Suchprofil mit dem index: ", index, "geändert");
        // State handling, damit die Farbe von dem ausgewählten Profil geändert wird
        this.setState({ selectedProfileIndex: index });
        this.setState({ clickable: true });
        this.setState({ selectedProfile: this.state.Searchprofiles[index] }, () => {
          //console.log("Es wurde auf das Suchprofil: ", this.state.selectedProfile, "geändert (mit selectedProfile)" + " mit diesem Index: ", index);
        });

    }

    /**
     * Diese Funktion wird ausgeführt wenn ein SuchProfil gelöscht werden soll.
     * Um diese FUnktion auszuführen, muss ein User ein SuchProfil ausgewählt haben.
     * @constructor
     */
    DeleteSearchProfile(){
        //console.log("Das Suchprofil",this.state.selectedProfileIndex ,"wird gelöscht");
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
        }, () => {
            //console.log('handleRemoveProfile und profiles nach der Aktualisierung:', this.state.Searchprofiles);
        });
    };

    /**
     * Diese componentDidUpdate Funktion wird bei der Aktualisierung des State von Searchprofiels aufgerufen.
     * Die Funktion an sich ändert bei einer Änderung der Suchprofile den Wert für die Anzahl dieser
     * Suchprofile, dazu ist Sie dafür verantwortlich, dass ein entferntes Suchprofil, nicht mehr in der Liste angeziegt
     * wird.
     */

    componentDidUpdate(prevProps, prevState) {
      if (prevState.Searchprofiles !== this.state.Searchprofiles) {
        const numSearchProfiles = this.state.Searchprofiles.length;
        this.setState({ numSearchProfiles });

        if (this.state.selectedProfile && !this.state.Searchprofiles.includes(this.state.selectedProfile)) {
          this.setState({ selectedProfileIndex: null, selectedProfile: null });
        }
      }
    }

    /**
     * Diese Funktion wird in der componentDidMount() aufgerufen und lädt die SuchProfile eines Users. Dafür wird
     * zu der DatingSiteAPI mit getSearchProfileIDs und der eigenen Profile_ID eine Anfrage geschickt.
     * Die SuchProfile, welche dann empfangen werden, sind in dem SearchProfiles Array gespeichert. Zudem wird
     * die länge, also die Anzah lder SuchProfile gespeichert.
     */
    loadingPage(){
        DatingSiteAPI.getAPI()
        .getSearchProfileIDs(this.props.user.uid)
        .then(Searchprofilesvar => {
          //console.log("Das ist Searchprofilesvar in der loadingPage: ",Searchprofilesvar)
          this.setState(prevState => ({
            Searchprofiles: Searchprofilesvar,
          }));
           // Ermitteln der Länge der Suchprofile, dies ist für die Darstellung der SuchProfile als Liste für den User relevant.
          const lengthSearchprofiles = this.state.Searchprofiles.length;
          //console.log("Die Seite wird geladen", lengthSearchprofiles, this.state.numSearchProfiles);
          //this.setState({ numSearchProfiles: lengthSearchprofiles });
          this.setState({ numSearchProfiles: lengthSearchprofiles });

        })
        .catch(error => {
          console.error('Error fetching data from API:', error);
        });
    }

    /**
     * Testfunktion zum laden der Search Seite. Hier wird eine Liste mit dummy SearchProfile Daten aufgerufen.
     */
    loadPage() {
        const dummySearchProfiles = [12, 56];

        this.setState({ Searchprofiles: dummySearchProfiles }, () => {
            const lengthSearchprofiles = this.state.Searchprofiles.length;
            this.setState({ numSearchProfiles: lengthSearchprofiles });
            console.log(this.state.profile_id)
        });
    }

    /**
     * Die componentDidMount wird bei Laden der React Seite aufgerufen und ruft intern dann eine andere Funktion auf.
     * Diese kann dann entweder die zum testing extra geschriebene Funktion loadPage() sein, oder die Funktion
     * loadingPage(). Diese Funktion wird dabei normalerweise ausgeführt und holt sich die Daten zu den SuchProfilen
     * aus dem BackEnd.
     */
    componentDidMount() {
      this.loadingPage();
    }


    /**
     * rendert den Komponenten
     */
    render() {

        // const für den Status, ob die buttons (Suche, edit, delete ausführbar sind)
        const { clickable } = this.state
        // const um den State der Anzahl der Profile mit count anzusprechen
        const count = this.state.numProfiles;

        // const welche genau ein Listing für ein Suchprofil darstellt, dabei wir auch die Nummer des Suchprofils angezeigt
        const SearchProfileListing = Array(this.state.numSearchProfiles)
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
                    this.state.selectedProfileIndex === index ? "#8F3985" : "#6A7285",
                  color: "#fff",
                  cursor: "pointer", paddingBottom: "1%", paddingTop: "1%",
                }}
              >
                Suchprofil {index + 1}
              </button>
            </Grid>
          ));

        // Methode zur Darstellung einer SearchProfileBox (So wird ein anderer User dargestellt)
        const SearchListing = Array(count).fill(null).map((item, index) => (
            <Grid item xs={12} key={index} >
                <SearchProfileBox key={this.state.profiles[index]} current_profile={this.props.user.uid} Profilematchmaking={this.state.profiles[index]}/>
            </Grid>
        ));

    return (

      <div>
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
                                      backgroundColor: "#374258",
                                      color: "#fff",
                                      cursor: "pointer",
                                      pointerEvents: clickable ? '' : 'none',
                                    }}
                                  >
                                    <UpdateIcon/>
                                  </button>
                                </Grid>


                                {/** Hier werden die Buttons zum Erstellen eines Suchprofils erstellt */}
                                <Grid item md={2} xs={2} >
                                    <Link to="/Suche/Suchprofil/new">
                                        <button
                                            style={{
                                          height: "120%",
                                          width: "100%",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          backgroundColor: "#374258",
                                          color: "#fff",
                                          cursor: "pointer"}}>
                                            <AddIcon/>
                                        </button>
                                    </Link>

                                </Grid>

                                {/** Hier wird der Button zum Suchen nach dem aktuell ausgewählten Suchprofil angezeigt */}
                                <Grid item md={4} xs={4}>
                                  <button
                                    onClick={() => this.Search()}
                                    style={{
                                      height: "120%",
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
                                          onClick={() => this.EditSearchProfiles()}
                                        style={{
                                          height: "120%",
                                          width: "100%",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          backgroundColor: "#374258",
                                          color: "#fff",
                                          cursor: "pointer"
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
                                          height: "120%",
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
                            {/** Hier werden die Buttons für die Anzahl der Suchprofile eingetragen */}
                                {SearchProfileListing}
                        </Item>
                     </Stack>
                 </Item>
                     {SearchListing.length > 0 ? (
                        <Box sx={{ width: '100%',margin: '0 auto'}} >
                            <Grid item container spacing={2} justifyContent="center">
                                {SearchListing}
                            </Grid>
                        </Box>
                    ) : (
                        <p>Suche um Profile zu sehen...</p>
                    )}
             </Stack>
        </Box>
      </div>
    );
  }
}

export default Search;
