////Componente que contiene los estilos de visualizacion y seleccion/////
/// de la capa de clasificacion del tratamiento urbanistico//////////////
import { useMap, GeoJSON } from 'react-leaflet';

const MapaTratamientos = ({ data, layerRef }) => {

const map = useMap();

///estilo por defecto para la capa /////////////////////////
const defaultStyle = {
    color: 'blue',
    weight: 2,
    fillOpacity: 0.3,
};

 ///asigna colores para las categorias de la smbologia de la capa/////////
const getColorTratamiento ={
    'Mejoramiento integral' : '#9c27b0',
    'Conservacion'  : '#641e16',
    'Parque' : '#FE9A2E',
    'Desarrollo' : '#fff9c4',
    'Renovacion' : '#64b5f6 ',
    'Consolidacion' :' #f9a825',
};


const tratamientoStyle = (feature) => {
return {
    fillColor: getColorTratamiento[feature.properties.Tratamient],
    weight: 2,
  ////crea el estilo con la simbologia de visualizacion de la capa////////////  opacity: 1,
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
    layer.bringToFront();
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
  
  ///muestra el valor del campo tratamiento cuando se da clic n el mapa/////
  const onEachtratamiento = (feature, layer) => {
    let texto = feature.properties.Tratamient;
    layer.bindPopup('Tratamiento: ' + texto);
    layer.on({
      mouseover: highlightFeature,
      mouseout: ResetHighlight,
      click: (e) => {
        ZoomToFeature(e); // Realiza el zoom al hacer clic
        const { lat, lng } = e.latlng; // Obtiene las coordenadas del punto de clic
        console.log("Coordenadas del punto clicado:", lat, lng);

        // Aquí puedes hacer algo más con las coordenadas, como almacenarlas en un estado
      },
    });
  };

  return (
    <GeoJSON
      data={data}
      style={tratamientoStyle}
      onEachFeature={onEachtratamiento}
      ref={layerRef}
    />
  );
};

export default MapaTratamientos;