import { Component } from "react";
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from './components/config';
import {Avatar, Container, Menu, MenuItem} from '@mui/material';
import Item from "./theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LogIn from "./pages/LogIn";
import BlockProfileBox from "./components/BlockProfileBox";
import FavoriteProfileBox from "./components/FavoriteProfileBox";
import ChatProfileBox from "./components/ChatProfileBox";
import Merkliste from "./pages/Merkliste";
import Sperrliste from "./pages/Sperrliste";
import Profile from "./components/Profile";
import OptionsOtherProfile from "./components/OptionsOtherProfile";
import OptionsOwnProfile from "./components/OptionsOwnProfile";
import ChatWindow from "./components/ChatWindow";
import ProfileBox from "./components/ProfileBox";
import ProfileBoxList from "./components/ProfileBoxList";
import CreateProfil, { checkProfilExc } from "./pages/createProfil";
import './pages/avatarContainer.css';
import Header from "./components/Header";
import * as React from "react";
import {BrowserRouter as Router, Routes, Route, useLocation, Navigate} from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import FavoriteProfileBoxList from "./components/FavoriteProfileBoxList";
import BlockProfileBoxList from "./components/BlockProfileBoxList";
import ChatProfileBoxList from "./components/ChatProfileBoxList";
import SearchProfile from "./components/SearchProfile";
import Search from "./pages/Search";
/** Definition der App-Komponente */

class App extends Component {

  /** alle Zustandsvariablen: aktueller Nutzer, Ankerpunkt für das Dropdown-Menü, Fehler bei der "auth",
   *  Fehler in der Anwendung, Ladezustand der "auth" */

  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      menuAnchor: null,
      authError:null,
      appError:null,
      authLoading:false,
    };
  }

  componentDidMount() {

    /** Hier wird die Firebase-App initialisieren und der Authentifizierungsstatus überwacht.
     *  beim Ändern des Anmelde-Status wird der Zustand aktualisiert. */

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {

      /** Änderung des Anmeldezustandes  */

      if (user) {

        /** Wenn der User angemeldet ist = Ladezustand auf "true" gesetzt */

          this.setState({
              authLoading: true
          });

          /** Authentifizierungstoken des Useres wird abgerufen und in einem Cookie gespeichert. currentUser wird auf
           * den aktuellen User gesetzt, vorherige Errors werden auf null gesetzt und der Ladezustand wird beendet */

          user.getIdToken().then(token => {
            document.cookie = `token=${token};path=/`;
            this.setState({
              currentUser: user,
              authError: null,
              authLoading: false
            });

            /** Fehlerbehanldung für das Abrufen des Authentifizierungstokens */

          }).then(e => {
            this.setState({
              authError:e,
              authLoading:false,
            });
          });

          /** Wenn kein Benutzer angemeldet ist wird der Cookie gelöscht und der Zustand angepasst
           * => kein aktueller User und Ladezustand beendet*/
      } else {
        document.cookie = 'token=;path=/';

        this.setState({
          currentUser: null,
          authLoading:false
        });
      }
    });
  }

  /** Handler-Funktion, die beim Klicken auf den "Anmelden"-Button aufgerufen wird */

  handleLogIn = () => {
  /** Firebase-App initialisieren und Authentifizierungs-Objekt erstellen */
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  /** Ruft das "signInWithPopup" Fenster auf um sich anmelden zu können, bei erfolgriecher Anmeldung
   *  wird der User "gespeichert" un der Zustand aktualisiert. Bei einem Fehler wird dieser
   *  in der Konsole ausgegeben. */


    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        this.setState({ currentUser: user });
      })
      .catch((error) => {
        console.log(error);
    });
  }

  /** Handler-Funktion, die beim Klicken auf den "Abmelden"-Button aufgerufen wird */

  handleLogOut = () => {

    /** Firebase-App initialisieren und Authentifizierungs-Objekt erstellen */

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    /** Hier wird der aktuelle User wieder auf "null" gesetzt und somit wird dieser abgemeldet. Bei einem Fehler
     *  wird dieser dementsprechend in der Konsole ausgegeben. */

    auth.signOut()
        .then(() => {
          this.setState({currentUser: null});
        })
        .catch((error) => {
          console.log(error);
        });
  }

  /** Handler-Funktion, die beim Klicken auf den Avatar aufgerufen wird */

  handleClick = (event) => {
    this.setState({menuAnchor: event.currentTarget});
  };

  /** Handler-Funktion, die beim Schließen des Menüs aufgerufen wird */

  handleClose = () => {
    this.setState({menuAnchor: null});
  };

  /** render() gibt das HTML zurück, das gerendert werden soll */

  render() {

    const { currentUser, currentUserUid } = this.state;

    if (!currentUser) {
    // Wenn kein User angemeldet ist wird nur das Anmeldefenster gerendert.
    return <LogIn onLogIn={this.handleLogIn} />;
    } else if (!currentUser.displayName || !currentUser.photoURL) {
    // Wenn ein User sich angemeldet hat wird er zuerst nur auf die Profil Seite gebracht
    return <Navigate to="/Profil" />;
    }

    return (
        <div>
            {this.state.currentUser && /** Wenn der Benutzer angemeldet ist */
                <div>
                  <div style={{display: 'flex', alignItems: 'center'}} className="avatarNavbarContainer">
                    {this.state.currentUser.photoURL ? ( /** Abfrage ob der Benutzer ein Profilbild hat */
                        <Avatar alt={this.state.currentUser.displayName} src={this.state.currentUser.photoURL} onClick={this.handleClick}/>
                    ) : ( /** Hat der Benutzer kein Profilbild wird  */
                        <Avatar alt={this.state.currentUser.displayName} onClick={this.handleClick}>
                          {this.state.currentUser.displayName[0]}
                        </Avatar>
                    )}
                    <Menu
                        anchorEl={this.state.menuAnchor} /** Das Element, an dem das Menü angezeigt werden soll */
                        open={Boolean(this.state.menuAnchor)} /** gibt an ob das Menü geöffnet ist */
                        onClose={this.handleClose} /** der Hanlder für das Schließen des Menüs */
                    >
                      <MenuItem onClick={this.handleLogOut}> Abmelden </MenuItem>
                    </Menu>
                  </div>
                </div>
            }

            <Router>
              <Header user={currentUser}/>
                <Routes>
                    <Route path="/" element={<Outlet />}>
                      <Route path="/" element={<Profile />}></Route>
                      <Route path="/Profile/:andereID" element={<Profile user={currentUser}/>}></Route>
                      <Route path="/Profil/:eigeneID" element={<Secured user={currentUser}><CreateProfil user={currentUser}/></Secured>}></Route>
                      <Route path="/Suche" element={<Search user={currentUser}/>}></Route>
                      <Route path="/Suche/Suchprofil/:SuchprofilID" element={<SearchProfile/>}></Route>
                      <Route path="/Merkliste" element={<FavoriteProfileBoxList user={currentUser}/>}></Route>
                      <Route path="/Sperrliste" element={<BlockProfileBoxList user={currentUser}/>}></Route>
                      <Route element={<ChatProfileBox user={currentUser}/>}></Route>
                      <Route path="/Chats" element={<ChatProfileBoxList user={currentUser}/>}></Route>
                      <Route path="/ChatWindow/:eigeneID/:andereID" element={<ChatWindow user={currentUser}/>}></Route>
                    </Route>
                </Routes>
            </Router>
        </div>
    );
  }
}

/**
 *
 * @param {props} The React props
 * @returns
 *
 * Mögliche Änderung stehen noch aus?!
 *
 */
function Secured(props) {
	let location = useLocation();

	if (!props.user) {
		return <Navigate to={process.env.PUBLIC_URL + '/index.html'} state={{ from: location }} replace />;
	}

	return props.children;
}
export default App;
