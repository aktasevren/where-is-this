import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";


export function SelectedMovie() {

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const [movieInfos, poster] = useSelector((state) => [
    state.MovieReducer.movieInfos,
    state.MovieReducer.poster,
  ]);

  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    async function makeRequest() {
      await delay(2000);
      setCoordinates(movieInfos)
      console.log(coordinates)

    }
    makeRequest()
  }, [movieInfos, coordinates]);

  return (
    <MapContainer center={[55, 60]} zoom={3} minZoom={0} maxZoom={12} scrollWheelZoom={true} >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      />
      {
        coordinates.map((elem, index) => (
          elem.Ycoor === undefined || elem.Xcoor === undefined ?
            <div>
            </div> :
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
                <b>{movieInfos[index].place}</b><br />
                {movieInfos[index].desc === undefined ? <div></div> : <div><span style={{ color: 'red' }}>Description :
                </span>{" " + movieInfos[index].desc}</div>}
              </Popup>
            </Marker>

        ))
      }
    </MapContainer>
  )
}

export default SelectedMovie;