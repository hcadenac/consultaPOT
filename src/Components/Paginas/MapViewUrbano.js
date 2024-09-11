
///compOnente princiapl de la aplicacion/////////
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Tooltip } from '@mui/material';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { point } from '@turf/helpers';
import L, { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef, useState } from 'react';
import { LayersControl, MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import Control from 'react-leaflet-custom-control';
import dataUsos from "../Capas/areasActividad.json";
import dataSuelo from "../Capas/clasesuelo.json";
import dataTratamiento from "../Capas/tratamiento.json";
import dataUdp from "../Capas/udp.json";
import ResultadoDialog from './DialogoResultado'; // Importar el nuevo componente
import MapaSuelo from './MapaSuelo';
import MapaTratamiento from './MapaTratamientos';
import MapaUdp from './MapaUdp';
import MapaUsos from './MapaUsos';

const MapViewUrbano = () => {
    

  ////////ICONO PARA MOSTRAR EL MARCADOR///////////
  const icono = new Icon ({
    iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
    iconSize: [25, 41]
  });

  ///crea las referencias para cada una de las capas/////
  const sueloRef = useRef(null);
  const usoRef = useRef(null);
  const tratamientoRef = useRef(null);
  const udpRef = useRef(null);
  
  const mapRef = useRef(null);
  const map = mapRef.current;
  //crea los estados para almacenar los datos de las capas y las cordenadas////
  
  const [open, setOpen] = useState(false);
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [error, setError] = useState('');

  const [sueloData, setSueloData] = useState(null);
  const [usoData, setUsoData] = useState(null);  
  const [tratamientoData, setTratamientoData] = useState(null);
  const [modalidadData, setModalidadData]= useState(null);
  const [udpData, setUdpData] = useState(null);
  const [comunaData, setComunaData]= useState(null);
  const [latitud, setLatitud]= useState('');
  const [longitud, setLongitud]= useState('');

  //const [posicion, setPosicion] = useState(null);

  const punto = Object.freeze({
    latitud: latitud,
    longitud: longitud,
  });

  //ASIGNA ESTADO AL DAR CLIC EN EL BOTON DE CONSULTA POR UBICACION///
  const [isCursorCliked, setIsCursorCliked] = useState(false);

  //estado para abrir dialogo//////
  const [openD, setOpenD] = useState(false);

  // Calcular la extensión del GeoJSON
  const calculateGeoJsonBounds = (geoJson) => {
    const bounds = L.geoJSON(geoJson).getBounds();
    return bounds;
  };
  const geoJsonBounds = calculateGeoJsonBounds(dataSuelo);

  ////obtiene la referencia a cada capa y crea funcion para obtener la interseccion////
  /// de las coordenadss con la capa a consultar//////////////////////////////////
  useEffect(() => {
    if (sueloRef.current) {
      sueloRef.current.clearLayers();
      sueloRef.current.addData(dataSuelo);
    }
    if (usoRef.current) {
      usoRef.current.clearLayers();
      usoRef.current.addData(dataUsos);
    }
    if (tratamientoRef.current) {
      tratamientoRef.current.clearLayers();
      tratamientoRef.current.addData(dataTratamiento);
    }
    if (udpRef.current) {
      udpRef.current.clearLayers();
      udpRef.current.addData(dataUdp);
    }
  }, []);

  ////funcion para obtener los atributos segun las coordenadas/////
  //// utiliza libreria turf.js point in polygon ////////////////
  const getFeatureByCoordinates = (lat, lng, geoJsonLayer) => {
    const pt = point([lng, lat]);
    let foundFeature = null;
    //setLatitud(lat)
    geoJsonLayer.eachLayer(layer => {
      if (layer.feature) {
        const geometry = layer.feature.geometry;
  
        if (geometry.type === 'Polygon' || geometry.type === 'MultiPolygon') {
          if (booleanPointInPolygon(pt, geometry)) {
            foundFeature = layer.feature;
          }
        }
      }
    });
  
    return foundFeature;
  };

  ////funcion para encontrar el valor del atributo que se intersecta con///// 
  //// las coordenadas introducidas por el usuario usando libreria turf.js////
  const handleFindFeature = () => {
    if (!lat || !lng) {
      setLat('');
      setLng('');
      setError('Por favor, introduce coordenadas válidas.');
      return;
    }
    console.log(lat, lng)
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    
    const coordenadasPunto = Object.freeze({ latitud: latNum, longitud: lngNum });
    setLatitud(coordenadasPunto.latitud.toString())
    setLongitud(coordenadasPunto.longitud.toString())
    //setPosicion(coordenadasPunto)

    // Verificar si las coordenadas están dentro de la extensión del GeoJSON
    if (!geoJsonBounds.contains([latNum, lngNum])) {
      setError('Las coordenadas están fuera de la extensión del municipio.');
      return;
    }

    /////realiza la consulta por coordenadas y selecciona las carateristics///
    ////que se intersectan con e punto y obtien sus atributos/////////////////
    const foundUsosFeature = getFeatureByCoordinates(lat, lng, usoRef.current);
    const foundSuelosFeature = getFeatureByCoordinates(lat, lng, sueloRef.current);
    const foundTratamientosFeature = getFeatureByCoordinates(lat, lng, tratamientoRef.current);
    const foundUdpFeature = getFeatureByCoordinates(lat, lng, udpRef.current);

    //// Almacena en los estados los datos obtenidos de los atributos de las capas/////
    setUsoData(foundUsosFeature ? foundUsosFeature.properties.Name : null);
    setTratamientoData(foundTratamientosFeature ? foundTratamientosFeature.properties.Tratamient : null);
    setModalidadData(foundTratamientosFeature ? foundTratamientosFeature.properties.Modalidad : null);
    setSueloData(foundSuelosFeature ? foundSuelosFeature.properties.TIPO_SUELO : null);
    setUdpData(foundUdpFeature ? foundUdpFeature.properties.NOMBRE : null);
    setComunaData(foundUdpFeature ? foundUdpFeature.properties.NMG : null);
    
    if (foundUsosFeature) {
      console.log('Feature found:', foundUsosFeature);
      
    
    } else {
      console.log('No feature found at this location...gonorrea');
    }

    handleClose();
    map.flyTo([lat, lng], 17);
  //setOpenD(true);
  };

  //// se almacenan los datos obtenidos de la consulta //////////////
  const datos = {
    Suelo: sueloData,
    Uso: usoData,
    Tratamiento: tratamientoData,
    Modalidad: modalidadData,
    Comuna: comunaData,
    Udp: udpData,
  };
 
  /////abre y cierra el dialogo para introducir coordenadas///////////////////
  const handleOpen = () => {
    setLat('');
    setLng('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError('')
  };

  const handleopenD = () => {  
    setOpenD(true);
  };

  const handlecloseD = () => {
    setOpenD(false);
  };

  const handleControlClick = () => {
    setIsCursorCliked(true);
    changeCursor();
    //setMarkerActive(true);
    
  };

  ////funcion para ubicar el punto con las coordenadas digitadas/////

/* useEffect(() => {
  const zoom = 17;
  const map = mapRef.current;
  
  if (map) {
    map.flyTo([lat, lng], zoom);
  }
}, [lat, lng]);  */
//////////////////////

const handleMapClick = (e) => {
  if (!isCursorCliked) return; // Evitar ejecución si el cursor no está activado
  setCursorChanged(false);
  const { lat, lng } = e.latlng;

  setLat(lat);
  setLng(lng);
  setOpen(true);
  
  console.log(lat, lng)
  setIsCursorCliked(false); // Reinicia el estado del cursor clicado
  //map.flyTo([lat, lng], 17);
};

const MapClickHandler = () => {
  useMapEvents({
    click: handleMapClick,
  });
  return null;
};

const [cursorChanged, setCursorChanged] = useState(false);

/* const handleClick = () => {
  changeCursor(); // Cambia el estado del puntero
}; */

const changeCursor = () => {
  setCursorChanged(!cursorChanged);
};

useEffect(() => {
  const mapElement = document.querySelector('.leaflet-container');
  if (cursorChanged) {
    mapElement.style.cursor = 'crosshair'; // Cambia el puntero
  } else {
    mapElement.style.cursor = ''; // Vuelve al puntero predeterminado
  }
}, [cursorChanged]);




///////////////////////////////////////////
  return (
    <>
      <MapContainer center={[8.7498, -75.8776]} zoom={12} ref={mapRef} scrollWheelZoom={true}>
        <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="OpenStreetMap">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Google Satellite">
                  <TileLayer
                  url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
                />
            </LayersControl.BaseLayer>
            <LayersControl.Overlay checked name="Comunas">
              <MapaUdp data={dataUdp} layerRef={udpRef} />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Areas de Actividad">
              <MapaUsos data={dataUsos} layerRef={usoRef} />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Clasificación Suelo">
              <MapaSuelo data={dataSuelo} layerRef={sueloRef} />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Tratamiento Urbanístico">
              <MapaTratamiento data={dataTratamiento} layerRef={tratamientoRef} />
            </LayersControl.Overlay>
        </LayersControl>
        if (lat && lng){
            <Marker position={{lat, lng}} icon={icono}></Marker>
        }
     
          <Control position='topleft'>
            <ButtonGroup orientation="vertical" variant="contained">
              <Tooltip placement="left" title="CONSULTAR PUNTO INGRESANDO COORDENADAS">
                <Button color='success'
                  variant="contained"
                  onClick={handleOpen}
                > 
                  <GpsFixedIcon /> 
                </Button>
              </Tooltip>
              <Tooltip placement="left" title="CONSULTAR PUNTO DANDO CLIC EN EL MAPA">
                <Button color='primary' 
                  variant="contained"
                  onClick={handleControlClick}
                > 
                  <AddLocationAltIcon /> 
                </Button>
              </Tooltip>
            </ButtonGroup>

          </Control>
          <Control position='topleft'>
            <ButtonGroup orientation="vertical" variant="contained">
              <Tooltip placement="left" title="GENERAR REPORTE">
              <Button color='secondary' 
                  variant="contained"
                  onClick={ handleopenD }
                > 
                  <ListAltIcon />
              </Button>
              </Tooltip> 
            </ButtonGroup>
          </Control>
          <MapClickHandler />
      </MapContainer>
      
        {/* Dialogo Modal para introducuir las coordenadas de busqueda */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Consulta por Coordenadas</DialogTitle>
          <DialogContent>
            <DialogContentText>
            Introduce las coordenadas de latitud y longitud en formato Decimal (Ejemplo: 8.75645; -75.894445).
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="lat"
              label="Latitud"
              type="number"
              fullWidth
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
            <TextField
              margin="dense"
              id="lng"
              label="Longitud"
              type="number"
              fullWidth
              value={lng}
              onChange={(e) => setLng(e.target.value)}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleFindFeature} color="primary">
              Buscar
            </Button>
          </DialogActions>
        </Dialog>
        <ResultadoDialog openD={openD} handleCloseD={handlecloseD} datos={datos} punto={punto}  />
          {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
      );
}
export default MapViewUrbano