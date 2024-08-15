import React from 'react';
import { GeoJSON } from "react-leaflet";
//import dataMunicipios from "../Capas/municipios.json";


/// funcion para obtener el mapa de udp de la base de datos y guardarlo en un geojson///////
const  MapaMunicipios = ({ style, onEachFeature }) => {

/// metodo para asignar estilos de visualizacion de la capa//////
const mStyle = {
  fillColor: "red",
  fillOpacity: 0.4,
  color: "black",
  weight: 1
}; 

const selectStyle = {
  fillColor: 'yellow',
  fillOpacity: 0.7,
  weight: 1
};
const onEach =(feature,layer) => {
  let texto = feature.properties.NOMBRE_ENT
  layer.bindPopup('Comuna: '+texto)
  layer.on({
    mouseover: (e) => {
      e.target.setStyle(selectStyle);
    },
    mouseout: (e) => {
      e.target.setStyle(mStyle);
    },
  });
}


  return(
    <>
      {/* {dataMunicipios && <GeoJSON data={dataMunicipios} style={mStyle} onEachFeature={onEach} />} */}
      <GeoJSON style={mStyle} onEachFeature={onEach} /> 
    </>
   )
};
export default MapaMunicipios