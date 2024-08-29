import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
//import MapView from './Components/Paginas/MapViewUrbano';
import './App.css';
import {NavBar}  from './Components/Navegacion/NavBar';
import MapaUrbano from './Components/Paginas/MapViewUrbano';
import MapaRural from './Components/Paginas/MapViewRural';
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
                  <Route path='/' element={<Inicio />} />
                  <Route path="/MapaRural" element={<MapaRural />} />
                  <Route path="/MapaUrbano" element={<MapaUrbano />} /> 
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
