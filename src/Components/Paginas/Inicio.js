import React from 'react';
import imagen from '../Assets/monteria.jpg';
import imagen1 from '../Assets/imagen1.png';
import imagen2 from '../Assets/imagen2.png';
import imagen3 from '../Assets/imagen3.png';
import imagen4 from '../Assets/imagen5.png';
import logo from '../Assets/logosgi_azul.png';

const Inicio = () => {
  return (
    <>
      <div >
      <div className="logo">
          <img src={logo} alt="Imagen 1" width="100" height="100"/>
      </div>
      <div className="titulo-portafolio">
        <h1>SERVICIOS GEOESPACIALES INTELIGENTES</h1>
        <p>Optimiza tus decisiones con nuestros servicios de consultoría geoespacial y catastral de alta calidad</p>
      </div>
      <div className="card-container">
        <div className="card">
          <img src={imagen4} alt="Imagen 1" />
          <h3 className="titulo-tarjeta">Consultoría Geoespacial</h3>
          <p className="texto-tarjeta">Asesoramos en la toma de decisiones informadas y eficientes basadas en datos y anális espacial.</p>
        </div>
        <div className="card">
          <img src={imagen2} alt="Imagen 1" />
          <h3 className="titulo-tarjeta">Gestión Catastral</h3>
          <p className="texto-tarjeta">Utilizamos tecnologías geoespaciales para mejorar la eficiencia y precision de la información catastral</p>
        </div>
        <div className="card">
          <img src={imagen3} alt="Imagen 1" />
          <h3 className="titulo-tarjeta">Análisis de Datos</h3>
          <p className="texto-tarjeta">Utilizamos tecnologías avanzadas para el análisis de datos geoespaciales, mejorando tus procesos y operaciones.</p>
        </div>
        <div className="card">
          <img src={imagen1} alt="Imagen 1" />
          <h3 className="titulo-tarjeta">Análisis geográficos</h3>
          <p className="texto-tarjeta">Análisis de datos geográficos para facilitar la toma de decisiones en planificación y ordenamiento territorial</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Inicio