////Componente que contiene los estilos de visualizacion y seleccion/////
/// de la capa de areas de actividad rural///////////////////////////////
import { GeoJSON, useMap } from 'react-leaflet';

const MapaActividadRural = ({ data, layerRef }) => {
  //const geoJSONRef = useRef();
  const map = useMap();

  ///asigna colores para las categorias de la smbologia de la capa///////////
  const getColorRural ={
    'Agricola' : '#ff9800',
    'Agropastoril'  : '#ffca28',
    'Agrosilvopastoril' : '#8bc34a',
    'Centros Poblados' : '#424242',
    'Corredor vial suburbano' : '#cfd8dc',
    'Conservación Ambiental' : '#006600',
    'Expansion' : '#FF9900',
    'Forestal productora' : '#339900 ',
    'Industrial' : '#9c27b0 ',
    'Minera' : '#ef5350',
    'Pecuaria':'#ffecb3',
    'Residencial':'#FF9900',
    'Urbano': '#b2ebf2 ',
};

  ///estilo por defecto para la capa /////////////////////////
const defaultStyle = {
    color: 'blue',
    weight: 0.5,
    dashArray: '3',
    fillOpacity: 0.3,
};

  ////crea el estilo con la simbologia de visualizacion de la capa////////////
const actividadRuralStyle = (feature) => {
return {
    fillColor: getColorRural[feature.properties.AREAS_ACT],
    weight: 0.5,
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
    let texto = feature.properties.AREAS_ACT;
    layer.bindPopup('Area Actividad: ' + texto);
    layer.on({
      mouseover: highlightFeature,
      mouseout: ResetHighlight,
      click: ZoomToFeature,
    });
  };

  return (
    <GeoJSON
      data={data}
      style={actividadRuralStyle}
      onEachFeature={onEachSuelo}
      ref={layerRef}
    />
  );
};

export default MapaActividadRural;