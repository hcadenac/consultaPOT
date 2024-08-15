import L from 'leaflet';
import { useState } from 'react';
import { Marker, useMapEvents } from 'react-leaflet';

const ConsultaPunto = ({ active, onDeactivate, onCoordinateSelect  }) => {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      if (active) {
        const latLng = e.latlng;
        setPosition(latLng);
        //onCoordinateSelect(latLng.lat, latLng.lng); // Enviar las coordenadas al componente principal
        onCoordinateSelect(latLng); // Enviar las coordenadas al componente principal
        onDeactivate(); // Desactivar la funcionalidad después de dibujar el punto
      }
    },
  });

  return position ? <Marker position={position} icon={L.icon({ iconUrl: 'marker-icon.png' })} /> : null;
};

export default ConsultaPunto;
