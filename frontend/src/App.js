import { Component } from "react";
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from './components/config';
import {Avatar, Menu, MenuItem} from '@mui/material';
import LogIn from "./pages/LogIn";
import ChatProfileBox from "./components/Chat/ChatProfileBox";
import Profile from "./components/Profile/Profile";
import ChatWindow from "./pages/ChatWindow";
import CreateProfil from "./pages/createProfil";
import './pages/avatarContainer.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./components/App.css"
import * as React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { Outlet } from "react-router-dom";
import FavoriteProfileBoxList from "./pages/FavoriteProfileBoxList";
import BlockProfileBoxList from "./pages/BlockProfileBoxList";
import ChatProfileBoxList from "./pages/ChatProfileBoxList";
import SearchProfile from "./components/Search/SearchProfile";
import Search from "./pages/Search";
import AboutUs from "./pages/AboutUs";
/** Definition der App-Komponente */

class App extends Component {

  /** alle Zustandsvariablen: */

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

    /** Beim Laden der Seite wird der folgende Code ausgeführt: */

    /** Hier wird die firbaseConfig aus der config.js initsialisiert */
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    /** Hier wird der Anmeldezustand überwacht: */
    onAuthStateChanged(auth, (user) => {

      /** Änderung des Anmeldezustandes  */

      if (user) {

        /** Wenn der User angemeldet ist = Ladezustand auf "true" gesetzt */

          this.setState({
              authLoading: true
          });

          /** Hier wird der Authentifizierungstokens des Useres in einem Cookie gespeichert */

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

          /** Wenn kein Benutzer angemeldet ist, wird der Cookiezustand "gelöscht" */
      } else {
        document.cookie = 'token=;path=/';

        this.setState({
          currentUser: null,
          authLoading:false
        });
      }
    });
  }

  /** Handler-Funktion, die aufgerufen wird, wenn der User den "Anmelden"-Button gedrückt hat */

  handleLogIn = () => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  /** Ruft das "signInWithPopup" Fenster auf, um sich anmelden zu können, bei erfolgreicher Anmeldung
   *  wird der User „gespeichert“ und der Zustand aktualisiert. Bei einem Fehler wird dieser
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

  /** render() sorgt für das Anzeigen im Webbrowser */

  render() {

    const { currentUser } = this.state;

    if (!currentUser) {
      {/** Wenn kein User angemeldet ist, wird nur das Anmeldefenster gerendert. */}
    return <LogIn onLogIn={this.handleLogIn} />;
    } else if (!currentUser.displayName || !currentUser.photoURL) {
      {/** Wenn ein User sich angemeldet hat, wird er zuerst auf die Create-Profilseite gebracht */}
      return <Navigate to="/Profil" />;
    }

    return (
        <div className="app">
          <div className="content">
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
                        anchorEl={this.state.menuAnchor} // Hier wird das Abmelden Menü gesetzt
                        open={Boolean(this.state.menuAnchor)} // Hier wird der Status gesetzt ob das Menü geöffnet worden ist
                        onClose={this.handleClose} // Hanlder für das Schließen des Menüs
                    >
                      {/** Hier ist der "Abmelde"-Button, der die "handleLogOut" Funktion aufruft */}
                      <MenuItem onClick={this.handleLogOut}> Abmelden </MenuItem>
                    </Menu>
                  </div>
                </div>
            }

            {/** Routing der gesamten App */}
            <Router>
              <Header user={currentUser}/>
                <Routes>
                    <Route path="/" element={<Outlet />}>
                      <Route path="/" element={<CreateProfil user={currentUser}/>}></Route>
                      <Route path="/Profil/:eigeneID" element={<CreateProfil user={currentUser}/>}></Route>
                      <Route path="/Suche" element={<Search user={currentUser}/>}></Route>
                      <Route path="/Suche/Suchprofil/:SuchprofilID" element={<SearchProfile user={currentUser}/>}></Route>
                      <Route path="/Profile/:eigeneID" element={<Profile user={currentUser}/>}></Route>
                      <Route path="/Suche" element={<Search user={currentUser}/>}></Route>
                      <Route path="/Merkliste" element={<FavoriteProfileBoxList user={currentUser}/>}></Route>
                      <Route path="/Sperrliste" element={<BlockProfileBoxList user={currentUser}/>}></Route>
                      <Route element={<ChatProfileBox user={currentUser}/>}></Route>
                      <Route path="/Chats" element={<ChatProfileBoxList user={currentUser}/>}></Route>
                      <Route path="/ChatWindow/:eigeneID/:andereID" element={<ChatWindow user={currentUser}/>}></Route>
                      <Route path="/AboutUs" element={<AboutUs/>}></Route>
                    </Route>
                </Routes>
            </Router>
          </div>
          <Footer/>
        </div>
    );
  }
}

export default App;
