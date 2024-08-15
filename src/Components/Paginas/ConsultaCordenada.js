// StyledGeoJSON.js
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import L from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import myGeoJsonData from "../Capas/municipios.json";

const ConsultaCordenada = ({openD, onCloseD, style, onCoordenadasChange}) => {
  const geoJsonLayerRef = useRef(null);
  //const map = useMap();
  //const [open, setOpen] = useState(false);

  ////obtiene los datos del dialogo ////
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  
  const ObtenerDatos= () => {
    const coordenadas = {
      lat: latitude,
      lng: longitude,
    };
      console.log(coordenadas)
      onCoordenadasChange(coordenadas);
      //console.log(onCoordenadasChange)
      //onDatosChange(results);
      onCloseD();
  };
  
  ///realiza la consulta para obtener los atributos del elemento seleccionado////
  //const [lat, setLat] = useState('');
  //const [lng, setLng] = useState('');

  /*useEffect(() => {
    if (geoJsonLayerRef.current) {
      geoJsonLayerRef.current.clearLayers();
      geoJsonLayerRef.current.addData(myGeoJsonData);
    }
  }, []);
    //console.log(lat)
    //console.log(lng)
  const getFeatureByCoordinates = (lat, lng) => {
    const point = L.latLng(lat, lng);
    let foundFeature = null;

    geoJsonLayerRef.current.eachLayer(layer => {
      if (layer.feature && layer.getBounds().contains(point)) {
        foundFeature = layer.feature;
        //console.log(layer.feature.properties.NOMBRE_ENT)
      }
    });

    return foundFeature;
  };*/

  /* const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }; */

  /*const handleFindFeature = () => {
    const feature = getFeatureByCoordinates(parseFloat(lat), parseFloat(lng));
    if (feature && onFeatureFound) {
      onFeatureFound(feature);
    }
    console.log(lat)
    console.log(lng)
  };*/
  //console.log(lat)
  //console.log(lng)
  return (
    <>
      {/* <Button variant="contained" color="primary" onClick={handleOpen}>
        Introducir Coordenadas
      </Button> */}
      <Dialog open={openD} onClose={onCloseD}>
        <DialogTitle>Introducir Coordenadas</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Introduce las coordenadas de latitud y longitud para consultar los atributos.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="lat"
            label="Latitud"
            type="number"
            fullWidth
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
          <TextField
            margin="dense"
            id="lng"
            label="Longitud"
            type="number"
            fullWidth
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseD} color="primary">
            Cancelar
          </Button>
          <Button onClick={ObtenerDatos} color="primary">
            Buscar
          </Button>
        </DialogActions>
      </Dialog>
      <GeoJSON data={myGeoJsonData} style={style} ref={geoJsonLayerRef} />
    </>
  );
};

export default ConsultaCordenada;
