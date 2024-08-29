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
    'GUASIMAL' : '#FF9900',
    'GUATEQUE' : '#FC4E2A',
    'JARAQUIEL' : '#F3F781',
    'KILOMETRO 12' : '#FF9900',
    'LA MANTA':'#FF9900',
    'LA VICTORIA':'#FF9900',
    'LAS PALOMAS': '#FC4E2A',
    'LETICIA'  : '#F5DA81',
    'LOMA VERDE' : '#F8E6E0',
    'LOS GARZONES' : '#FC4E2A',
    'MARTINICA' : '#F3F781',
    'MORINDO' : '#FF9900',
    'NUEVA ESPERANZA' : '#FC4E2A',
    'NUEVA LUCIA' : '#F3F781',
    'NUEVO PARAISO' : '#FF9900',
    'PATIO BONITO':'#FF9900',
    'PUEBLO BUJO':'#FF9900',
    'SAN ANTERITO': '#FC4E2A',
    'SAN ISIDRO' : '#FC4E2A',
    'SANTA CLARA' : '#F3F781',
    'SANTA ISABEL' : '#FF9900',
    'SANTA LUCIA':'#FF9900',
    'TRES PALMAS':'#FF9900',
    'TRES PIEDRAS': '#FC4E2A',
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