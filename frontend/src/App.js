import ProfilePreview from "./components/ProfilePreview.js";
import {Route, Link, Routes} from "react-router-dom";


function App() {
  return (
    <div className="App">
        <ProfilePreview/>

      <Routes>
          <Route path="./components/ProfilePreview.js" element={<ProfilePreview/>}/>
      </Routes>

    </div>
  );
}

export default App;

/*Die Firebase Authentifizierung ist bei Kunz in App.js */

/*Die Inhaltsstruktur findet sich auch in App.js (Siehe Bankprojekt)*/