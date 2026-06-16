import Styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useCities } from "../context/Citycontext.jsx";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation.js";
import Spinner from "./Spinner.jsx";
import Button from "./Button.jsx";
import { map } from "leaflet";
import useUrlPosition from "../hooks/useUrlPosition.js";
function Map() {
  const [mapPosition, setmapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const {
    isLoading,
    position: geolocationposition,
    getPosition,
  } = useGeolocation();

  const [lat, lng] = useUrlPosition();

  useEffect(() => {
    if (lat && lng) setmapPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geolocationposition)
      setmapPosition([geolocationposition.lat, geolocationposition.lng]);
  }, [geolocationposition]);

  return (
    <div className={Styles.mapContainer}>
      {!geolocationposition && (
        <Button type="position" onClick={getPosition}>
          {isLoading ? "isLoading..." : "View your Locattion"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={Styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.cityName}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span>
              <h3>{city.cityName}</h3>
            </Popup>
          </Marker>
        ))}
        <MapPosition position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function MapPosition({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const Navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      Navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
