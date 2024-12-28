import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

export function SelectedMovie() {
  const delay = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const [movieInfos, poster] = useSelector((state) => [
    state.MovieReducer.movieInfos,
    state.MovieReducer.poster,
  ]);

  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    async function makeRequest() {
      await delay(2000);
      setCoordinates(movieInfos);
      console.log(coordinates);
    }
    makeRequest();

  }, [movieInfos, coordinates]);

  const defaultCenter = coordinates.length > 0 && coordinates[0].Ycoor && coordinates[0].Xcoor
    ? [coordinates[0].Ycoor, coordinates[0].Xcoor]
    : [55, 60];

  return (
    <div>
      {coordinates.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <iframe
            src="https://giphy.com/embed/VI2UC13hwWin1MIfmi"
            width="480"
            height="322"
            style={{ border: "none" }}
            frameBorder="0"
            allowFullScreen
            title="Loading Animation"
          ></iframe>
          <p>
            <a href="https://giphy.com/gifs/VI2UC13hwWin1MIfmi" target="_blank" rel="noopener noreferrer">
              via GIPHY
            </a>
          </p>
        </div>
  ) : (
    <MapContainer
      center={defaultCenter}
      zoom={3}
      minZoom={0}
      maxZoom={12}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
      />
      {coordinates.map((elem, index) =>
        elem.Ycoor === undefined || elem.Xcoor === undefined ? null : (
          <Marker
            key={index}
            position={[elem.Ycoor, elem.Xcoor]}
            icon={
              new Icon({
                iconUrl: `https://image.tmdb.org/t/p/original/${poster}`,
                iconSize: [37.5, 61.5],
                iconAnchor: [12, 41],
              })
            }
          >
            <Popup className="leaflet-popup">
              <b>{movieInfos[index].place}</b>
              <br />
              {movieInfos[index].desc === undefined ? null : (
                <div>
                  <span style={{ color: "red" }}>Description:</span>
                  {" " + movieInfos[index].desc}
                </div>
              )}
            </Popup>
          </Marker>
        )
      )}
    </MapContainer>
  )
}
    </div >
  );
}

export default SelectedMovie;
