import React, { useState, useRef, useEffect } from "react";
import { Map, GeoJSON, TileLayer, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
import "./map2.css";
import numeral from "numeral";

const Map2 = boundaries => {
  // console.log(boundaries, "hi");
  let numMapClicks = 0;
  const mapstyle = {
    fillColor: "red",
    fillOpacity: 0.8,
    opactiy: 0.5,
    weight: 1,
    color: "black"
  };

  // var name, cases, active, recovered, deaths, t_cases, t_recovered, t_deaths;

  const onEachState = (state, layer) => {
    layer.options.fillColor = state.properties.color;
    // name = state.properties.NAME_1;
    // console.log(state.properties.color);
    // console.log(layer);
    // cases = state.properties.cases;
    // active = state.properties.active;
    // recovered = state.properties.recovered;
    // deaths = state.properties.deaths;
    // t_cases = state.properties.t_cases;
    // t_recovered = state.properties.t_recoverd;
    // t_deaths = state.properties.t_deaths;

    //   layer.bindPopup(
    //     `
    //       ${name}/n
    //       ${cases}\n
    //       ${active}\n
    //       ${recovered}\n
    //       ${deaths}\n

    //       ${t_cases}\n
    //       ${t_recovered}\n
    //       ${t_deaths}\n
    //    `
    //   );
  };

  const [pop, setPop] = useState({});

  const addPopup = e => {
    console.log(e);
    setPop({
      name: e.NAME_1,
      cases: e.cases,
      active: e.cases - e.recovered - e.deaths,
      recovered: e.recovered,
      deaths: e.deaths
    });
  };



  return (
    <div className="map">

    <Map zoom={4} center={[20.5937, 78.9629]}>
      <TileLayer
        // url={url}
        style={{zIndex:"2"}}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"


       
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      ></TileLayer>

      {boundaries != undefined && (
        <GeoJSON
          style={mapstyle}
          data={boundaries.boundaries}
          onEachFeature={onEachState}
          onClick={e => addPopup(e.layer.feature.properties)}
        >
          <Popup>
            <div style={{ fontWeight: "400" }}>
              <h3>{`${pop.name}`}</h3>
              <p
                style={{ margin: "5px 0 0 0", color: "red" }}
              >{`Cases : ${numeral(pop.cases).format("0,0")}`}</p>
              <p
                style={{ margin: "5px 0 0 0", color: "orange" }}
              >{`Active : ${numeral(pop.active).format("0,0")}`}</p>
              <p
                style={{ margin: "5px 0 0 0", color: "green" }}
              >{`Recovered : ${numeral(pop.recovered).format("0,0")}`}</p>
              <p
                style={{ margin: "5px 0 0 0", color: "black" }}
              >{`Deaths : ${numeral(pop.deaths).format("0,0")}`}</p>
            </div>
          </Popup>
        </GeoJSON>
      )}
    </Map>
    </div>

  );
};

export default Map2;
