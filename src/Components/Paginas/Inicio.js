import React from 'react';
import imagen from '../Assets/monteria.jpg';

const Inicio = () => {
  return (
    <>
      <div className="observatorio-page">
      <h1 className="titulo">OBSERVATORIO INMOBILIARIO MONTERIA</h1>
      <p className="descripcion">
        Un observatorio inmobiliario es una plataforma que recopila y analiza
        datos relacionados con el mercado inmobiliario de una región o área
        geográfica específica. Su objetivo es proporcionar información actualizada
        y análisis para ayudar a profesionales y tomadores de decisiones a entender
        las tendencias del mercado.
      </p>
      <div className="imagen-container">
        <img
          src={imagen}
          alt="Observatorio Inmobiliario Monteria"
          className="imagen"
        />
      </div>
      <br></br>
      <p className="beneficios">
        <h4>BENEFICIOS</h4>
      </p>
      <ul className="lista-beneficios">
        <li>Acceso a datos actualizados del mercado.</li>
        <li>Identificación de tendencias y oportunidades de inversión.</li>
        <li>Apoyo en la toma de decisiones estratégicas.</li>
        <li>Mejor comprensión de la dinámica del mercado inmobiliario.</li>
        <li>Información para la evaluación de proyectos inmobiliarios.</li>
      </ul>
    </div>
    </>
  );
}

export default Inicio