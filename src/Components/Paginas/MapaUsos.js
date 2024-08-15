////Componente que contiene los estilos de visualizacion y seleccion/////
/// de la capa de clasificacion de la capa areas de actividad////////////
import { useMap, GeoJSON } from 'react-leaflet';

const MapaUsos = ({ data, layerRef }) => {
  
  const map = useMap();

  ///estilo por defecto para la capa /////////////////////////
  const defaultStyle = {
    color: 'blue',
    weight: 2,
    fillOpacity: 0.3,
  };

  ///asigna colores para las categorias de la smbologia de la capa/////////
  const getColorA = {
    'Ejes múltiples': '#a04000',
    'Área de actividad central': '#f48fb1',
    'Área de actividad dotacional': '#1e88e5',
    'Área de actividad residencial mixto': '#FF9933',
    'Área de actividad residencial con zonas de actividad económica': '#FFFF00',
    'Área urbana integral': '#ffe0b2',
    'Espacio Publico': '#4caf50',
  };

  ////crea el estilo con la simbologia de visualizacion de la capa////////////
  const usoStyle = (feature) => {
    return {
      fillColor: getColorA[feature.properties.Name],
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
      fillOpacity: 0.7,
    });
    layer.bringToFront();
  }

  ////borra los estilos resaltados cuando el mouse no esta por encima del elemento//////
  function ResetHighlight(e) {
    var layer = e.target;
    layer.setStyle(defaultStyle)
    //geoJSONRef.current.resetStyle(e.target);
  }

  ////aplica un zoom al elemento seleccionado al dar clic en el mapa///////
  function ZoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  ///muestra el valor del campo tratamiento cuando se da clic en el mapa/////
  const onEachA = (feature, layer) => {
    let texto = feature.properties.Name;
    layer.bindPopup('Actividad: ' + texto);
    layer.on({
      mouseover: highlightFeature,
      mouseout: ResetHighlight,
      click: ZoomToFeature,
    });
  };

  return (
    <GeoJSON
      data={data}
      style={usoStyle}
      onEachFeature={onEachA}
      ref={layerRef}
    />
  );
};

export default MapaUsos;
