import { Component } from "react";
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from './components/config';
import { Avatar, Menu, MenuItem } from '@mui/material';
import Item from "./theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LogIn from "./pages/LogIn";
import TestProfileList from "./components/TestProfileList";
import BlockProfileBox from "./components/BlockProfileBox";
import FavoriteProfileBox from "./components/FavoriteProfileBox";
import Navbar from "./components/header/Navbar";
import SearchProfile from "./components/SearchProfile";
import Chat from "./components/Chat";
import CreateProfil from "./pages/createProfil";


/** Definition der App-Komponente */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      menuAnchor: null,
    };
  }

  /** Lifecycle-Methode: Wird aufgerufen, sobald die Komponente in den DOM eingefügt wird */

  componentDidMount() {

    /** Firebase-App initialisieren */

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    /** Beim Ändern des Anmelde-Status den Zustand aktualisieren */

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({ currentUser: user });
      } else {
        this.setState({ currentUser: null });
      }
    });
  }

  /** Handler-Funktion, die beim Klicken auf den "Anmelden"-Button aufgerufen wird */

  handleLogIn = () => {

    /** Firebase-App initialisieren und Authentifizierungs-Objekt erstellen */

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    /** Mit Google-Konto anmelden und Zustand aktualisieren */

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

    /** Abmelden und Zustand aktualisieren */

    auth.signOut()
      .then(() => {
        this.setState({ currentUser: null });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /** Handler-Funktion, die beim Klicken auf den Avatar aufgerufen wird */

  handleClick = (event) => {
    this.setState({ menuAnchor: event.currentTarget });
  };

  /** Handler-Funktion, die beim Schließen des Menüs aufgerufen wird */

  handleClose = () => {
    this.setState({ menuAnchor: null });
  };

  /** Die render()-Methode gibt das HTML zurück, das gerendert werden soll */

  render() {
    const { currentUser, menuAnchor } = this.state;
    const open = Boolean(menuAnchor);

    return (
      <div>
        {currentUser && /** Wenn der Benutzer angemeldet ist */
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {currentUser.photoURL ? ( /** Wenn der Benutzer ein Profilbild hat */
                <Avatar alt={currentUser.displayName} src={currentUser.photoURL} onClick={this.handleClick} />
              ) : ( /** Wenn der Benutzer kein Profilbild hat */
                <Avatar alt={currentUser.displayName} onClick={this.handleClick}>
                  {currentUser.displayName[0]}
                </Avatar>
              )}
              <Menu
                anchorEl={menuAnchor} /** Das Element, an dem das Menü angezeigt werden soll */
                open={open} /** gibt an ob das Menü geöffnet ist */
                onClose={this.handleClose} /** der Hanlder für das Schließen des Menüs */
              >
                <MenuItem onClick={this.handleLogOut}> Abmelden </MenuItem>
              </Menu>
            </div>
            <Navbar/>
            <CreateProfil/>
          </div>
        }
        {!currentUser && /** Wenn kein Benutzer angemeldet wird nur das Anmeldeformular gerendert */
          <LogIn onLogIn={this.handleLogIn} />
        }
      </div>
    );
  }
}
export default App;
