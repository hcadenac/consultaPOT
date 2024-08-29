
///compOnente princiapl de la aplicacion/////////
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Tooltip } from '@mui/material';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { point } from '@turf/helpers';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef, useState } from 'react';
import { LayersControl, MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import Control from 'react-leaflet-custom-control';
import dataActividadRural from "../Capas/areaActividadRural.json";
import dataCorregimientos from "../Capas/corregimientos.json";
import ResultadoDialog from './DialogoResultado'; // Importar el nuevo componente
import MapaActividadRural from './MapaActividadRural';
import MapaCorregimientos from './MapaCorregimientos';


const MapViewRural = () => {
  
  ///crea las referencias para cada una de las capas/////
  const actividadRuralRef = useRef(null);
  const corregimientoRef = useRef(null);
  //const tratamientoRef = useRef(null);
  //const udpRef = useRef(null);

  //crea los estados para almacenar los datos de las capas y las cordenadas////
  const [open, setOpen] = useState(false);
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [error, setError] = useState('');

  const [actividadRuralData, setActividadRuralData] = useState(null);
  const [corregimientoData, setCorregimientoData] = useState(null);  
  /*const [tratamientoData, setTratamientoData] = useState(null);
  const [modalidadData, setModalidadData]= useState(null);
  const [udpData, setUdpData] = useState(null);
  const [comunaData, setComunaData]= useState(null);*/
  const [latitud, setLatitud]= useState('');
  const [longitud, setLongitud]= useState(null);

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
  const geoJsonBounds = calculateGeoJsonBounds(dataCorregimientos);

  ////obtiene la referencia a cada capa y crea funcion para obtener la interseccion////
  /// de las coordenadss con la capa a consultar//////////////////////////////////
  useEffect(() => {
    if (actividadRuralRef.current) {
      actividadRuralRef.current.clearLayers();
      actividadRuralRef.current.addData(dataActividadRural);
    }
    if (corregimientoRef.current) {
      corregimientoRef.current.clearLayers();
      corregimientoRef.current.addData(dataCorregimientos);
    }
  }, []);

  ////funcion para obtener los atributos segun las coordenadas/////
  //// utiliza libreria turf.js point in polygon ////////////////
  const getFeatureByCoordinates = (lat, lng, geoJsonLayer) => {
    const pt = point([lng, lat]);
    let foundFeature = null;
    setLatitud(lat)
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
  
  const latNum = parseFloat(lat);
  const lngNum = parseFloat(lng);
  //punto.latitud = lat;
  //punto.longitud = lng;
  const coordenadasPunto = Object.freeze({ latitud: latNum, longitud: lngNum });
  setLatitud(coordenadasPunto.latitud.toString())
  setLongitud(coordenadasPunto.longitud.toString())



  // Verificar si las coordenadas están dentro de la extensión del GeoJSON
  if (!geoJsonBounds.contains([latNum, lngNum])) {
    setError('Las coordenadas están fuera de la extensión de la capa.');
    return;
  }

  /////realiza la consulta por coordenadas y selecciona las carateristics///
  ////que se intersectan con e punto y obtien sus atributos/////////////////
  const foundActividadFeature = getFeatureByCoordinates(lat, lng, actividadRuralRef.current);
  const foundCorregimientoFeature = getFeatureByCoordinates(lat, lng, corregimientoRef.current);
  //const foundTratamientosFeature = getFeatureByCoordinates(lat, lng, tratamientoRef.current);
  //const foundUdpFeature = getFeatureByCoordinates(lat, lng, udpRef.current);

  //// Almacena en los estados los datos obtenidos de los atributos de las capas/////
  setActividadRuralData(foundActividadFeature ? foundActividadFeature.properties.AREAS_ACT : null);
  setCorregimientoData(foundCorregimientoFeature ? foundCorregimientoFeature.properties.CORREGIMIE : null);
  //setModalidadData(foundTratamientosFeature ? foundTratamientosFeature.properties.Modalidad : null);
  //setSueloData(foundSuelosFeature ? foundSuelosFeature.properties.TIPO_SUELO : null);
  //setUdpData(foundUdpFeature ? foundUdpFeature.properties.NOMBRE : null);
  //setComunaData(foundUdpFeature ? foundUdpFeature.properties.NMG : null);
  
  if (foundActividadFeature) {
    console.log('Feature found:', foundActividadFeature);
    
   
  } else {
    console.log('No feature found at this location...gonorrea');
  }

  handleClose();
  setOpenD(true);
  };

  //// se almacenan los datos obtenidos de la consulta //////////////
  const datos = {
    Actividad: actividadRuralData,
    Corregimiento: corregimientoData,
    //Tratamiento: tratamientoData,
    //Modalidad: modalidadData,
    //Comuna: comunaData,
    //Udp: udpData,
  };
 
  /////abre y cierra el dialogo para introducir coordenadas///////////////////
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
   
    setLat('');
    setLng('');
    setError('')
  };
  /////
  const handlecloseD = () => {
    setOpenD(false);
  };

  const handleControlClick = () => {
    setIsCursorCliked(true);
    //setMarkerActive(true);
    
  };

//////////////////////

const handleMapClick = (e) => {
  if (!isCursorCliked) return; 
  const { lat, lng } = e.latlng;
  setLat(lat);
  setLng(lng);
  setOpen(true);
  
  setIsCursorCliked(false);
};

const MapClickHandler = () => {
  useMapEvents({
    click: handleMapClick,
  });
  return null;
};

//////////////////

  return (
    <>
      <MapContainer center={[8.5898, -75.8776]} zoom={10} style={{ height: "100vh", cursor: isCursorCliked ? 'crosshair' : 'default' }} scrollWheelZoom={true}>
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

            <LayersControl.Overlay checked name="Area Actividad Rural">
              <MapaActividadRural data={dataActividadRural} layerRef={actividadRuralRef} />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Corregimientos">
              <MapaCorregimientos data={dataCorregimientos} layerRef={corregimientoRef} />
            </LayersControl.Overlay>


          </LayersControl>
            <Control position='topleft'>
              <ButtonGroup orientation="vertical" variant="contained">
                <Tooltip placement="left" title="CONSULTAR PUNTO POR CORDENADAS">
                  <Button color='success'
                    variant="contained"
                    onClick={handleOpen}
                  > 
                    <GpsFixedIcon /> 
                  </Button>
                </Tooltip>
                <Tooltip placement="left" title="CONSULTAR PUNTO POR UBICACION">
                  <Button color='primary' 
                    variant="contained"
                    onClick={handleControlClick}
                  > 
                    <AddLocationAltIcon /> 
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
              Introduce las coordenadas de latitud y longitud.
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
        {/* <ConsultaDialog openD={openD} handleCloseD={handleCloseD} datos={{ Suelo: sueloData, Uso: usoData, Tratamiento: tratamientoData, Udp: udpData }} />   */}
        <ResultadoDialog openD={openD} handleCloseD={handlecloseD} datos={datos} punto={punto}  />
          {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
      );
}
export default MapViewRural