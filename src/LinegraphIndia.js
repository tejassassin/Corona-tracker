import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import LoadCountriesTask from "../src/tasks/load";

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

function Linegraph({ newdata, statename, caseTypes = "cases" }) {
  // console.log(caseTypes);
  const [data, setData] = useState({});

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    let stateCode;
    for (let state in states) {
      let a = String(states[state]);
      let b = String(statename);
      if (a.toLowerCase() === b.toLowerCase()) {
        stateCode = state;
      }
    }
    console.log(newdata, stateCode);
    if (newdata[stateCode]) {
      setData(newdata[stateCode][caseTypes]);
    }
  }, [caseTypes, statename]);

  const options = {
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function(tooltipItem, data) {
          //   if ((caseTypes == "activecase")) {
          //     return numeral(tooltipItem.value).format("0,0");
          //   }
          return numeral(tooltipItem.value).format("+0,0");
        }
      }
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            unit: "day",
            tooptipFormat: "ll"
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: false
          },
          ticks: {
            callback: function(value, index, values) {
              return numeral(value).format("0a");
            }
          }
        }
      ]
    }
  };

  const lineGraphColor = {
    cases: {
      borderColor: "#cc1034",
      backgroundColor: "rgba(204, 16, 52, 0.5)"
    },
    recovered: {
      borderColor: "#7dd71d",
      backgroundColor: "#c3e59d"
    },
    activecase: {
      borderColor: "orange",
      backgroundColor: "rgba(255,165,0,0.5)"
    },
    deaths: {
      borderColor: "#333",
      backgroundColor: "#999"
    }
  };
  return (
    <div className="graph">
      {data && Object.keys(data).length > 0 && (
        <Line
          key={statename}
          data={{
            datasets: [
              {
                borderColor: { caseTypes }
                  ? lineGraphColor[caseTypes].borderColor
                  : "#cc1034",
                backgroundColor: { caseTypes }
                  ? lineGraphColor[caseTypes].backgroundColor
                  : "rgba(204, 16, 52, 0.5)",
                data: data
              }
            ]
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default Linegraph;
