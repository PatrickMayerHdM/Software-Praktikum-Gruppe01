import logo from './logo.svg';
import './App.css';
import BlockNode from "./BlockNode";
import FavoriteNode from "./FavoriteNode";
import {Route, Link, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <Routes>
          <Route path="/BlockNode" element={<BlockNode/>}/>
          <Route path="/FavoriteNode" element={<FavoriteNode/>}/>
      </Routes>

    </div>
  );
}

export default App;
