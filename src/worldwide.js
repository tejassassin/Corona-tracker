import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@material-ui/core";
// import { MenuItem } from "@material-ui/core";
import "./App.css";
import "./Table.css";
// import numeral from "numeral";
import Infobox from "./Infobox";
import Map from "./Map";
// import Map2 from "./map2";
import Table from "./Table";
// import { sortData } from "./util.js";
import { sortDataw } from "./util.js";

import Linegraph from "./Linegraph";
import "leaflet/dist/leaflet.css";
import { constructChartData } from "./util.js";
import { generateActiveCases } from "./util.js";
// import { scroller } from "react-scroll";
import { Link } from "react-scroll";
import { Link as LLink } from "react-router-dom";

// import LoadCountriesTask from "../src/tasks/load";
// import { features } from "./tasks/countries.json";
// import { features } from "./tasks/json.json";

function Worldwide() {
  const [countryInfo, setCountryInfo] = useState([]);

  // const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryName, setCountryname] = useState("WORLDWIDE");

  const [tableData, setTableData] = useState([]);
  const [caseType, setCaseType] = useState("cases");
  const [mapCenter, setmapCenter] = useState({
    lat: 20.59,
    lng: 78.56
  });
  const [mapZoom, setmapZoom] = useState(3);
  const [mapCountries, setmapCountries] = useState([]);
  const [value, setValue] = useState("");

  const [placeholder, setPlaceholder] = useState("Hi");
  const [filteredItems, setFilteredItems] = useState([...tableData]);

  // console.log(filteredItems);
  // console.log(cases);

  let url =
    country === "worldwide"
      ? "https://disease.sh/v3/covid-19/historical/all?lastdays=100"
      : `https://disease.sh/v3/covid-19/historical/${country}?lastdays=100`;

  const [tCases, setTcases] = useState({});
  const [tDeaths, setTdeaths] = useState({});
  const [tRecovered, setTrecovered] = useState({});

  const onSearch = userInput => {
    setValue(userInput);
    const filteredOptions = tableData.filter(
      country =>
        country.country.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    setFilteredItems(filteredOptions);
  };

  // const handleInput = value => {
  //   if (value) {
  //     setValue(value);
  //   }
  // };

  useEffect(() => {
    setFilteredItems(filteredItems);
  }, [filteredItems]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          let data1 = country === "worldwide" ? data : data.timeline;

          // console.log(data);
          let activeCases = generateActiveCases(data1);
          data1["active"] = activeCases;
          //  return;

          let tCases = constructChartData(data1, "cases");
          let tRecovered = constructChartData(data1, "recovered");
          let tDeaths = constructChartData(data1, "deaths");

          //console.log(tRecovered);
          setTcases(tCases[tCases.length-1].y);
          setTrecovered(tRecovered[tCases.length-1].y);
          setTdeaths(tDeaths[tCases.length-1].y);
        });
    };
    fetchData();
  }, [country]);

  // const load = () => {
  //   const loadCountriesTask = new LoadCountriesTask();
  //   loadCountriesTask.Load(setBoundaries);
  // };

  // useEffect(load, []);

  // useEffect(() => {
  //   setBoundaries(features);
  // }, []);

  useEffect(() => {
    fetch("/hello")
      .then(res => res.json())
      .then(data => {
        setPlaceholder(data.result);
      });
  }, []);

  useEffect(() => {
    const getCountryInfo = async () => {
      await fetch("https://disease.sh/v3/covid-19/all")
        .then(response => response.json())
        .then(data => {
          // console.log(data);
          setCountryInfo(data);
        });
    };
    getCountryInfo();
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())
        .then(data => {
          // const countries = data.map(country => ({
          //   name: country.country,
          //   value: country.countryInfo.iso2
          // }));
          // setCountries(countries);
          console.log(data,"yoyoy");
          setTableData(sortDataw(data));
          setFilteredItems(sortDataw(data));
          setmapCountries(data);
        });
    };
    getCountries();
  }, []);

  function onCountryChange(event) {
    setValue("");
    setFilteredItems(tableData);
    const countryCode = event.target.getAttribute("value");
    let countryName = event.target.getAttribute("name");
    // console.log("hiii", event.target);
    let url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    const getCountryInfo = async () => {
      await fetch(url)
        .then(response => response.json())
        .then(data => {
          setCountryInfo(data);
          //console.log(countryInfo);

          setCountry(countryCode);
          setCountryname(countryName.toUpperCase());
          let lat = data.countryInfo ? data.countryInfo.lat : 20;
          let long = data.countryInfo ? data.countryInfo.long : 70;
// console.log(lat,long);
          setmapCenter([lat, long]);
          setmapZoom(4);
        });
    };
    getCountryInfo();
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
    // console.log("hi");
  }
  return (
    <div className="parallax">
      <div className="app">
        <div className="app__left">
          {/* <p>Flask says {placeholder}</p> */}
          <div className="parallax"></div>
          <div>
            <div id="title">
              <h2>
                {countryName}
                <img
                  style={
                    countryName === "WORLDWIDE"
                      ? {}
                      : { border: "solid white 0.1px", margin: "0px 30px" }
                  }
                  src={`${
                    countryName === "WORLDWIDE"
                      ? ""
                      : countryInfo.countryInfo.flag
                  }`}
                  height="18"
                />
              </h2>

              <ul
                style={{
                  display: "flex",
                  listStyle: "none",
                  marginLeft: "auto"
                }}
              >
                <li>
                  <Link activeClass="active" to="map" spy={true} smooth={true}>
                    Map
                  </Link>
                </li>
                <li>
                  <Link to="graph" spy={true} smooth={true}>
                    Graph
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <br />

          <div className="app__stats">
            <Infobox
              title="Confirmed"
              active={caseType === "cases"}
              cases={tCases}
              total={countryInfo.cases}
              caseType="cases"
              updated={countryInfo.updated}
              onClick={() => onInfoboxClick("cases")}
            />
            <Infobox
              title="Active"
              active={caseType === "activecase"}
              cases={tCases - tRecovered - tDeaths}
              total={countryInfo.active}
              caseType="activecase"
              updated={countryInfo.updated}
              onClick={() => onInfoboxClick("activecase")}
            />
            <Infobox
              title="Recovered"
              active={caseType === "recovered"}
              cases={tRecovered}
              total={countryInfo.recovered}
              caseType="recovered"
              updated={countryInfo.updated}
              onClick={() => onInfoboxClick("recovered")}
            />
            <Infobox
              title="Deaths"
              active={caseType === "deaths"}
              cases={tDeaths}
              caseType="deaths"
              total={countryInfo.deaths}
              updated={countryInfo.updated}
              onClick={() => onInfoboxClick("deaths")}
            />
          </div>
          <div id="map"></div>
          <br />

          <div className="mapcontainer">
            <h2  className="title">
              Cases Visualization on Map
            </h2>
            <Map
              center={mapCenter}
              zoom={mapZoom}
              countries={mapCountries}
              caseType={caseType}
            />
            {/* <Map2 boundaries={boundaries}/> */}
          </div>
          <br />
          <br />
          <div id="graph"></div>
          <br />
          <br />
          <br />

          <div className="graphcontainer">
            <h2 style={{ textAlign: "center" }} className="title">
              {countryName} new {caseType}
            </h2>
            <Linegraph countryCode={country} caseTypes={caseType} />
          </div>
          <br />
          <br />

          {/* <div className="predictions" id="ml">
            <h2 className="mltitle">Forecast</h2>
          </div> */}
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
            <hr style={{margin:"8px 0"}}/>

            <input
              className="input"
              placeholder="Search country..."
              className="input"
              type="text"
              value={value}
              onChange={event => onSearch(event.target.value)}
            ></input>

            <Table
              filteredItems={filteredItems}
              onCountryChange={onCountryChange}
              tCases={tCases}
              tRecovered={tRecovered}
              tDeaths={tDeaths}
            />

            <br />
            <br />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Worldwide;
