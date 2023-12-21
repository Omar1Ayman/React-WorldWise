import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";
import "./map.css";

import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCities } from "../../context/citiesCoontext.jsx";
import { Button } from "@mui/material";
import { useGeolocation } from "../../hooks/UseGeolocatoin.js";
import { useUrlPostion } from "../../hooks/useUrlPosition.js";

const Map = () => {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [lat, lng] = useUrlPostion();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const { cities } = useCities();
  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <>
      {!geolocationPosition && (
        <Button
          onClick={getPosition}
          variant="contained"
          sx={{
            position: "absolute",
            bottom: "10%",
            zIndex: "999",
            left: "50%",
          }}
        >
          {isLoadingPosition ? "Loading.." : "use your position"}
        </Button>
      )}
      <MapContainer
        className="map"
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((c, idx) => {
          return (
            <Marker key={idx} position={[c.position.lat, c.position.lng]}>
              <Popup>
                <span>{c.emoji}</span>
                <span>{c.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </>
  );
};

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      // console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
