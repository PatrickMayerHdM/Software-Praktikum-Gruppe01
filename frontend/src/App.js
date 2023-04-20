import ProfileWindow from "./components/ProfileWindow";
import {Route, Link, Routes} from "react-router-dom";


function App() {
  return (
    <div className="App">
        <ProfileWindow/>

      <Routes>
          <Route path="./components/ProfileWindow.js" element={<ProfileWindow/>}/>
      </Routes>

    </div>
  );
}

export default App;

/*Die Firebase Authentifizierung ist bei Kunz in App.js */

/*Die Inhaltsstruktur findet sich auch in App.js (Siehe Bankprojekt)*/