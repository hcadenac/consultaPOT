////Componente que contiene los estilos de visualizacion y seleccion/////
/// de la capa de areas de actividad rural///////////////////////////////
import { GeoJSON, useMap } from 'react-leaflet';

const MapaCorregimientos = ({ data, layerRef }) => {
  //const geoJSONRef = useRef();
  const map = useMap();

  ///asigna colores para las categorias de la smbologia de la capa///////////
  const getColorCorregimiento ={
    'BUENOS AIRES' : '#CEF6EC',
    'CAÑO VIEJO PALOTAL'  : '#F5DA81',
    'CIENAGA DE BETANCI' : '#F8E6E0',
    'EL CERRITO' : '#FC4E2A',
    'EL SABANAL' : '#F3F781',
    'GUASIMAL' : '#0000FF',
    'GUATEQUE' : '#fdd835',
    'JARAQUIEL' : '#f44336',
    'KILOMETRO 12' : '#f5b041',
    'LA MANTA':'#9a7d0a',
    'LA VICTORIA':'#82e0aa',
    'LAS PALOMAS': '#CCFF00 ',
    'LETICIA'  : '#F5DA81',
    'LOMA VERDE' : '#F8E6E0',
    'LOS GARZONES' : '#73c6b6',
    'MARTINICA' : '#F3F781',
    'MORINDO' : '#CCCC33',
    'NUEVA ESPERANZA' : '#21618c',
    'NUEVA LUCIA' : '#f8bbd0',
    'NUEVO PARAISO' : '#5b2c6f',
    'PATIO BONITO':'#d2b4de',
    'PUEBLO BUJO':'#943126',
    'SAN ANTERITO': '#fff176',
    'SAN ISIDRO' : '#996600',
    'SANTA CLARA' : '#F3F781',
    'SANTA ISABEL' : '#9ccc65',
    'SANTA LUCIA':'#b0bec5',
    'TRES PALMAS':'#990099',
    'TRES PIEDRAS': '#ff8f00',
};

  ///estilo por defecto para la capa /////////////////////////
const defaultStyle = {
    color: 'blue',
    weight: 2,
    fillOpacity: 0.3,
};

  ////crea el estilo con la simbologia de visualizacion de la capa////////////
const corregimientoStyle = (feature) => {
return {
    fillColor: getColorCorregimiento[feature.properties.CORREGIMIE],
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
  const onEachSuelo = (feature, layer) => {
    let texto = feature.properties.CORREGIMIE;
    layer.bindPopup('Corregimiento: ' + texto);
    layer.on({
      mouseover: highlightFeature,
      mouseout: ResetHighlight,
      click: ZoomToFeature,
    });
  };

  return (
    <GeoJSON
      data={data}
      style={corregimientoStyle}
      onEachFeature={onEachSuelo}
      ref={layerRef}
    />
  );
};

export default MapaCorregimientos;