import React, { Component } from 'react';
import OnBoarding from "./pages/OnBoarding";
import {Route, Routes} from "react-router-dom";
import LogIn from "./pages/ogIn";
import logo from './logo.svg';
import './App.css';
import BlockNode from "./BlockNode";
import FavoriteNode from "./FavoriteNode";
import {Route, Link, Routes} from "react-router-dom";

function App() {
  return (
      <div className="App">
          Homepage
          <Routes>
              <Route path="/LogIn" element={<LogIn/>}/>
              <Route path="/OnBoarding" element={<OnBoarding/>}/>
              <Route path="/BlockNode" element={<BlockNode/>}/>
              <Route path="/FavoriteNode" element={<FavoriteNode/>}/>
      </Routes>

    </div>
  );
}

export default App;
