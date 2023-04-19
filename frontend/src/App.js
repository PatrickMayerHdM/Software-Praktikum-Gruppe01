import './App.css';
import BlockNode from "./BlockNode";
import FavoriteNode from "./FavoriteNode";
import {Route, Link, Routes} from "react-router-dom";


function App() {
  return (
    <div className="App">
        Home

      <Routes>
          <Route path="/BlockNode" element={<BlockNode/>}/>
          <Route path="/FavoriteNode" element={<FavoriteNode/>}/>
      </Routes>

    </div>
  );
}

export default App;

/*Die Firebase Authentifizierung ist bei Kunz in App.js */

/*Die Inhaltsstruktur findet sich auch in App.js (Siehe Bankprojekt)*/