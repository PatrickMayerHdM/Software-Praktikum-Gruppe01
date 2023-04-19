import logo from './logo.svg';
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
