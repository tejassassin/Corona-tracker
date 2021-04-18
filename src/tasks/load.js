// import { features } from "./countries.json";
// import { features } from "./json.json";
import { features } from "./india_state_geo.json";
import data from "../states.json";
import legendItems from "../legenditems";
import papa from "papaparse";

// var Features=JSON.parse(features)

var states = {
  TT: "Total",
  AN: "Andaman and Nicobar Islands",
  AP: "Andhra Pradesh",
  AR: "Arunachal Pradesh",
  AS: "Assam",
  BR: "Bihar",
  CH: "Chandigarh",
  CT: "Chhattisgarh",
  DN: "Dadra and Nagar Haveli and Daman and Diu",
  DD: "Daman and Diu",
  DL: "Delhi",
  GA: "Goa",
  GJ: "Gujarat",
  HR: "Haryana",
  HP: "Himachal Pradesh",
  JK: "Jammu and Kashmir",
  JH: "Jharkhand",
  KA: "Karnataka",
  KL: "Kerala",
  LA: "Ladakh",
  LD: "Lakshadweep",
  MP: "Madhya Pradesh",
  MH: "Maharashtra",
  MN: "Manipur",
  ML: "Meghalaya",
  MZ: "Mizoram",
  NL: "Nagaland",
  OR: "Odisha",
  PY: "Puducherry",
  PB: "Punjab",
  RJ: "Rajasthan",
  SK: "Sikkim",
  TN: "Tamil Nadu",
  TG: "Telangana",
  TR: "Tripura",
  UP: "Uttar Pradesh",
  UT: "Uttarakhand",
  WB: "West Bengal"
};

let newdata = {};

class LoadCountriesTask {
  covurl = "https://api.covid19india.org/csv/latest/state_wise_daily.csv";
  // covurl = "states.csv";

  setState = null;

  data = () => {
    papa.parse(this.covurl, {
      download: true,
      header: true,
      complete: result => {
        this.processCovidData(result.data);
        
      }
    });
    // console.log(newdata, "2");
    return newdata;
  };
  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  processCovidData = covs => {
    let data = covs.splice(-3 * 10);

    if (Object.keys(newdata).length === 0) {
      // console.log(data)
      for (let item in data) {
        for (let state in states) {
          if (data[item].Status === "Confirmed") {
            let newp = {
              x: this.formatDate(new Date(data[item].Date_YMD)),
              y: parseInt(data[item][state])
            };
            if (!newdata[state]) {
              newdata[state] = {};
            }
            if (!newdata[state].cases) {
              newdata[state].cases = [];
            }
            newdata[state].cases.push(newp);
          }

          if (data[item].Status === "Recovered") {
            let newp = {
              x: this.formatDate(new Date(data[item].Date_YMD)),
              y: parseInt(data[item][state])
            };
            if (!newdata[state]) {
              newdata[state] = {};
            }
            if (!newdata[state].recovered) {
              newdata[state].recovered = [];
            }
            newdata[state].recovered.push(newp);
          }

          if (data[item].Status === "Deceased") {
            let newp = {
              x: this.formatDate(new Date(data[item].Date_YMD)),
              y: parseInt(data[item][state])
            };
            if (!newdata[state]) {
              newdata[state] = {};
            }
            if (!newdata[state].deaths) {
              newdata[state].deaths = [];
            }
            newdata[state].deaths.push(newp);
          }
        }
      }
      //ACTIVE CASES
      for (let state in newdata) {
        let lastDataPoint;
        newdata[state].activecase = [];

        for (let i in newdata[state].cases) {
          // console.log(date,"date")

          // console.log("hiieeee", lastDataPoint);

          if (lastDataPoint != undefined) {
            let newDataPoint = {
              x: newdata[state].cases[i].x,
              y:
                newdata[state].cases[i].y -
                newdata[state].recovered[i].y -
                newdata[state].deaths[i].y
            };
            newdata[state].activecase.push(newDataPoint);
          } else {
            lastDataPoint = {
              x: newdata[state].cases[i].x,
              y:
                newdata[state].cases[i].y -
                newdata[state].recovered[i].y -
                newdata[state].deaths[i].y
            };
            newdata[state].activecase.push(lastDataPoint);
          }
        }

        // console.log(active);
      }
    }
    // console.log(newdata, "1");
    // return(newdata);
  };

  load = setState => {
    this.setState = setState;
    var states = features;
    // console.log(data.states);
    for (let i = 0; i < states.length; i++) {
      var state = states[i];
      var covstate = data.states.find(x => x.name === state.properties.NAME_1);
      state.properties.cases = 0;

      if (covstate != null) {
        var cases = covstate.cases;
        var active = covstate.active;
        var recovered = covstate.recovered;
        var deaths = covstate.deaths;
        var t_cases = covstate.tcase;
        var t_recovered = covstate.trecovered;
        var t_deaths = covstate.tdeaths;

        state.properties.cases = Number(cases);
        state.properties.active = Number(active);
        state.properties.recovered = Number(recovered);
        state.properties.deaths = Number(deaths);
        state.properties.t_cases = Number(t_cases);
        state.properties.t_recoverd = Number(t_recovered);
        state.properties.t_deaths = Number(t_deaths);
      }

      // console.log(state.properties.cases);
      // console.log(legendItems);

      const legenditem = legendItems.find(legenditem =>
        legenditem.isFor(state.properties.cases)
      );
      // console.log("hooo",legenditem)

      if (legenditem != null) {
        state.properties.color = legenditem.color;
      }
      // console.log(state);
    }

    setState(states);
  };
}
export default LoadCountriesTask;
