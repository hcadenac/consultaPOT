////Componente que contiene los estilos de visualizacion y seleccion/////
/// de la capa de comuna y UDP///////////////////////////////

//import React, { useRef } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';

const MapaUdp = ({ data, layerRef }) => {
  //const geoJSONRef = useRef();
  const map = useMap();

  ///asigna colores para las categorias de la smbologia de la capa///////////
  const getColorUdp ={
    'Comuna 1' : '#CEF6EC',
    'Comuna 2'  : '#F5DA81',
    'Comuna 3' : '#F8E6E0',
    'Comuna 4' : '#FC4E2A',
    'Comuna 5' : '#F3F781',
    'Comuna 6' : '#FF9900',
    'Comuna 7' : '#FC4E2A',
    'Comuna 8' : '#F3F781',
    'Comuna 9' : '#FF9900',
    'Comuna 2 (futura)': '#F5DA81',
    'Comuna 4 (futura)': '#F3F781',
    'Comuna 8 (OU)': '#F8E6E0',
    'Comuna 9 (OU)': '#F8E6E0',
    'Comuna 10 (futura)': '#F5DA81',
    'Comuna 11 (futura)':'#FFFF00',
    'Comuna 12 (futura)':'#F1948A',
    'Garzones': '#F5DA81',
};

  ///estilo por defecto para la capa /////////////////////////
const defaultStyle = {
    color: 'blue',
    weight: 2,
    fillOpacity: 0.3,
};

  ////crea el estilo con la simbologia de visualizacion de la capa////////////
const udpStyle = (feature) => {
return {
    fillColor: getColorUdp[feature.properties.NMG],
    weight: 2,
    opacity: 1,
    dashArray: '3',
    fillOpacity: 0.4,
};
};

  ////resalta la informacion de la capa cuando el mouse pasa por encima//////
  function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
      weight: 3,
      color: '#F7FE2E',
      dashArray: '',
      //fillOpacity: 0.7,
    });
    layer.bringToFront({
        weight: 2,
        opacity: 1,
        dashArray: '3',
        fillOpacity: 0.4,
    });
  }

  ////borra los estilos resaltados cuando el mouse no esta por encima del elemento//////
  function ResetHighlight(e) {
    const layer = e.target;
    layer.setStyle(defaultStyle);
    //geoJSONRef.current.resetStyle(e.target);
  }

  ////aplica un zoom al elemento seleccionado al dar clic en el mapa///////
  function ZoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  ///muestra el valor del campo TIPO_SUELO cuando se da clic n el mapa/////
  const onEachUdp = (feature, layer) => {
    let texto = feature.properties.NMG;
    layer.bindPopup('Comuna: ' + texto);
    layer.on({
      mouseover: highlightFeature,
      mouseout: ResetHighlight,
      click: ZoomToFeature,
    });
  };

  return (
    <GeoJSON
      data={data}
      style={udpStyle}
      onEachFeature={onEachUdp}
      ref={layerRef}
    />
  );
};

export default MapaUdp;