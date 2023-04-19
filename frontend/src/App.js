import React, { Component } from 'react';
import OnBoarding from "./pages/OnBoarding";
import {Route, Routes} from "react-router-dom";
import LogIn from "./pages/ogIn";

function App() {
  return (
      <div className="App">
          Homepage
          <Routes>
              <Route path="/LogIn" element={<LogIn/>}/>
              <Route path="/OnBoarding" element={<OnBoarding/>}/>
          </Routes>
      </div>
  );
}

export default App;
