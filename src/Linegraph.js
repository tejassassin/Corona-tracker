import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { constructChartData } from "./util.js";
// import { constructChartData1 } from "./util.js";

import { generateActiveCases } from "./util.js";

// const constructChartData = (data, caseType = "cases") => {
//     let chartData = [];
//     let lastDataPoint;

//     for (let date in data[caseType]) {
//         if (lastDataPoint) {
//             let newDataPoint = {
//                 x: date,
//                 y: data[caseType][date] - lastDataPoint,
//             }
//             chartData.push(newDataPoint);
//         }
//         lastDataPoint = data[caseType][date];
//     }
//     console.log("chartData ", chartData);
//     return chartData;
// }

// const generateActiveCases = (data) =>{
//     let active = {};
//     for(let date in data["cases"]){
//         active[date] = data["cases"][date] - data["recovered"][date] - data["deaths"][date];
//     }
//     return active;
// }

function Linegraph({ countryCode, caseTypes = "cases" }) {
  // console.log(caseTypes);
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
            format: "MM/DD/YYYY",
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

  let url =
    countryCode === "worldwide"
      ? "https://disease.sh/v3/covid-19/historical/all?lastdays=100"
      : `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=100`;

  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      await fetch(url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          let data1 = countryCode === "worldwide" ? data : data.timeline;
          // console.log("data",data)
          if (caseTypes === "activecase") {
            let activeCases = generateActiveCases(data1);
            //console.log("active ", data1);
            data1["active"] = activeCases;
            //console.log("active ", data1);

            caseTypes = "active";
            setData(constructChartData(data1, caseTypes));

            //  return;
          }
          else {
            setData(constructChartData(data1, caseTypes));
          }
        });
    };
    fetchData();
  }, [caseTypes, countryCode]);

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
