import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@material-ui/core";
import "./Table.css";
import Infobox from "./Infobox";
import Map2 from "./map2";
import Tableindia from "./tableindia";
import data from "./states.json";
import { sortData } from "./util.js";
import LinegraphIndia from "./LinegraphIndia";
import "leaflet/dist/leaflet.css";
import { Link } from "react-scroll";
import LoadCountriesTask from "../src/tasks/load";
import { Link as LLink } from "react-router-dom";
import Legend from "./legend.js";
import legendItems from "./legenditems.js";

function India() {
  const [boundaries, setBoundaries] = useState();
  const [stateinfo, setStateinfo] = useState({});
  const [state, setState] = useState("TOTAL");
  const [newdata, setNewdata] = useState({});

  const [tableData, setTableData] = useState([]);
  const [caseType, setCaseType] = useState("cases");
  const [mapCenter, setmapCenter] = useState({
    lat: 34.80746,
    lng: -40.4796
  });
  const [mapZoom, setmapZoom] = useState(3);
  const [mapCountries, setmapCountries] = useState([]);
  const [value, setValue] = useState("");

  const [placeholder, setPlaceholder] = useState("Hi");
  const [filteredItems, setFilteredItems] = useState([...tableData]);
  const legendItemsReverse = [...legendItems].reverse();

  //   console.log(filteredItems);
  // console.log(data);
  var total = {};
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  total.updated = date + " " + time;

  let url =
    state === "total"
      ? "https://disease.sh/v3/covid-19/historical/all?lastdays=100"
      : `https://disease.sh/v3/covid-19/historical/${state}?lastdays=100`;

  const [tCases, setTcases] = useState({});
  const [tDeaths, setTdeaths] = useState({});
  const [tRecovered, setTrecovered] = useState({});

  const onSearch = userInput => {
    setValue(userInput);
    const filteredOptions = tableData.filter(
      state => state.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    setFilteredItems(filteredOptions);
  };

  useEffect(() => {
    setFilteredItems(filteredItems);
  }, [filteredItems]);

  const load = () => {
    const loadCountriesTask = new LoadCountriesTask();
    loadCountriesTask.load(setBoundaries);
  };

  useEffect(load, []);

  useEffect(() => {
    const getstates = async () => {
      // console.log(data);
      setTableData(sortData(data.states));
      setFilteredItems(sortData(data.states));
      var total = {};
      total.cases = data.cases;
      total.recovered = data.recovered;
      total.active = data.active;
      total.deaths = data.deaths;
      total.tcase = data.tcases;
      total.trecovered = data.trecovered;
      total.tdeaths = data.tdeaths;
      total.tactive =
        parseInt(data.tcases) -
        parseInt(data.trecovered) -
        parseInt(data.tdeaths);

      // console.log(total);
      // console.log(total.updated);
      setStateinfo(total);
    };
    const fetchData = async () => {
      const loadCountriesTask = new LoadCountriesTask();
      setNewdata(loadCountriesTask.data());
    };
    fetchData();
    getstates();
  }, []);

  function onStateChange(event) {
    // setValue("");
    // setFilteredItems(tableData);
    // const stateCode = event.target.getAttribute("value");
    let stateName = event.target.getAttribute("name");
    const data = tableData.filter(
      state => state.name.toLowerCase().indexOf(stateName.toLowerCase()) > -1
    );
    // console.log(stateName);
    console.log(data);
    // console.log();
    setStateinfo(data[0]);
    // console.log(stateinfo.lastupdatedtime);

    //   setCountry(countryCode);

    setState(stateName.toUpperCase());
    // let lat = data.countryInfo ? data.countryInfo.lat : 20;
    // let long = data.countryInfo ? data.countryInfo.long : 70;

    // setmapCenter([lat, long]);
    // setmapZoom(4);
  }

  function onInfoboxClick(caseType) {
    if (caseType === "cases") {
      setCaseType("cases");
    } else if (caseType === "recovered") {
      setCaseType("recovered");
    } else if (caseType === "activecase") {
      setCaseType("activecase");
      return;
    } else {
      setCaseType("deaths");
    }
  }
  return (
    <div className="parallax">
      <div className="app">
        <div className="app__left">
          {/* <p>Flask says {placeholder}</p> */}
          <div className="parallax"></div>
          <div id="title">
            <h2>{state}</h2>

            <ul
              style={{
                display: "flex",
                listStyle: "none",
                marginLeft: "auto"
              }}
            >
              <Link className="li" to="map" spy={true} smooth={true}>
                <li>Map</li>
              </Link>
              <Link className="li" to="graph" spy={true} smooth={true}>
                <li>Graph</li>
              </Link>
              <Link className="li" to="forecast" spy={true} smooth={true}>
                <li>Forecast</li>
              </Link>
            </ul>
          </div>
          <br />

          <div className="app__stats">
            <Infobox
              title="Confirmed"
              active={caseType === "cases"}
              cases={stateinfo.tcase}
              total={stateinfo.cases}
              caseType="cases"
              updated={total.updated}
              onClick={() => onInfoboxClick("cases")}
            />
            <Infobox
              title="Active"
              active={caseType === "activecase"}
              cases={
                parseInt(stateinfo.tcase) -
                parseInt(stateinfo.trecovered) -
                parseInt(stateinfo.tdeaths)
              }
              total={stateinfo.active}
              caseType="activecase"
              updated={total.updated}
              onClick={() => onInfoboxClick("activecase")}
            />
            <Infobox
              title="Recovered"
              active={caseType === "recovered"}
              cases={stateinfo.trecovered}
              total={stateinfo.recovered}
              caseType="recovered"
              updated={total.updated}
              onClick={() => onInfoboxClick("recovered")}
            />
            <Infobox
              title="Deaths"
              active={caseType === "deaths"}
              cases={stateinfo.tdeaths}
              caseType="deaths"
              total={stateinfo.deaths}
              updated={total.updated}
              onClick={() => onInfoboxClick("deaths")}
            />
          </div>
          <div id="map"></div>

          <div className="mapcontainer">
            <h2 className="title">Cases Visualization on Map</h2>
            <Map2 boundaries={boundaries} />
            <Legend legendItems={legendItemsReverse} />
          </div>
          <br />
          <br />

          <div id="graph"></div>
          <br />
          <br />
          <br />

          <div className="graphcontainer">
            <h3 className="title">
              {state} new {caseType}
            </h3>
            <LinegraphIndia newdata={newdata} statename={state} caseTypes={caseType} />
          </div>
          <br />
          <br />
          <div id="forecast"></div>

          <br />
          <br />

          <div className="predictions">
            <h2 className="title">Forecast</h2>
          </div>
          <br />
          <br />
        </div>

        <Card style={{ backgroundColor: "#2c3531" }} className="app__right">
          <br />
          <CardContent>
            <div className="app__header">
              <h2 className="title">Covid-19 Tracker</h2>
              <div>
                <ul
                  style={{
                    display: "flex",
                    listStyle: "none",
                    justifyContent: "space-around"
                  }}
                >
                  <li>
                    <LLink to="/worldwide">Worldwide</LLink>
                  </li>
                  <li>
                    <LLink to="/india">India</LLink>
                  </li>
                </ul>
              </div>
            </div>
            <hr style={{ margin: "8px 0" }} />

            <input
              className="input"
              placeholder="Search country..."
              className="input"
              type="text"
              value={value}
              onChange={event => onSearch(event.target.value)}
            ></input>

            <Tableindia
              filteredItems={filteredItems}
              onStateChange={onStateChange}
            />

            <br />
            <br />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default India;
