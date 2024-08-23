import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MapView from './Components/Paginas/MapView';
import './App.css';
import {NavBar}  from './Components/Navegacion/NavBar';
import MapaUrbano from './Components/Paginas/MapView';
import Inicio from './Components/Paginas/Inicio';


function App() {
  return (
    <div className="App">
      <Router>
        < NavBar />
        {/* <div className="flex"> */}
         {/*  <div className="sidebar">
            < SideBar />
          </div> */}
            <div className="content">
              <Routes>
                  <Route path='/' element={<MapView />} />
                  <Route path="/Inicio" element={<Inicio />} />
                  <Route path="/MapView" element={<MapView />} /> 
                  {/* <Route path='/Consulta' element={<Consulta />} />
                  <Route path='/Registro' element={<Registro />} />  
                  <Route path='/Login' element={<Login />} />   */}
              </Routes>
            </div> 
        {/* </div> */}
        {/* <Footer/> */}
      </Router>
    </div>
  );
}

export default App;
