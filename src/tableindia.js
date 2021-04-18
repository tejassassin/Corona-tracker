import React, { useState, useRef } from "react";
import "./Table.css";
import numeral from "numeral";
import Districts from "./disticts";
import { Accordion } from "@material-ui/core";
import { maxHeight } from "@material-ui/system";

function Tableindia({ filteredItems, onStateChange }) {
  // console.log(filteredItems);
  const [curr, setCurr] = useState();

  function toggle(index) {
    if (curr === index) {
      setCurr(null);
    } else {
      setCurr(index);
    }
  }

  return (
    <div className="side">
      <div className="table2">
        <div className="sheader srow">
          <div
            style={{
              margin: "0",
              padding: "8px 8px",
              borderBottom: "1px solid white",
              color: "white",
              width: "10px",
              height: "18px"
            }}
          ></div>
          <div
            style={{ width: "120px", color: "white", paddingLeft: "0" }}
            className="scells"
          >
            State
          </div>
          <div className="scells">Confirmed</div>
          <div className="scells">T_confirmed</div>

          <div className="scells">Active</div>
          <div className="scells">T_active</div>

          <div className="scells">Recovered</div>
          <div className="scells">T_recoverd</div>

          <div className="scells">Deaths</div>
          <div className="scells">T_deaths</div>
        </div>

        {filteredItems.map(
          (
            {
              districts,
              cases,
              active,
              recovered,
              deaths,
              tcase,
              trecovered,
              tdeaths,
              name
            },
            index
          ) => (
            <div key={index} className="accordion_section" name={name}>
              <div
                key={index}
                onClick={e => {
                  toggle(index);
                  onStateChange(e);
                }}
                name={name}
                className={`srow state accordion`}
              >
                {/* <div name={name}> */}
                <div
                  style={{
                    margin: "0",
                    padding: "8px 8px",
                    borderBottom: "1px solid white",
                    color: "white",
                    width: "10px",
                    height: "18px"
                  }}
                  name={name}
                >
                  {curr === index ? "- " : "+"}
                </div>

                <div
                  style={{ width: "120px", color: "white", paddingLeft: "0" }}
                  className="scells"
                  name={name}
                  title={name}
                >
                  {name}
                </div>
                <div
                  style={{ color: "#cc1034 " }}
                  className="scells"
                  name={name}
                >
                  {numeral(cases).format("0,0")}
                </div>
                <div style={{ color: "pink" }} className="scells" name={name}>
                  {numeral(tcase).format("0,0")}
                </div>

                <div
                  style={{ color: " orange " }}
                  className="scells"
                  name={name}
                >
                  {numeral(active).format("0,0")}
                </div>
                <div style={{ color: "yellow" }} className="scells" name={name}>
                  {numeral(
                    parseInt(tcase) - parseInt(trecovered) - parseInt(tdeaths)
                  ).format("0,0")}
                </div>
                <div
                  style={{ color: " #7dd71d" }}
                  className="scells"
                  name={name}
                >
                  {numeral(recovered).format("0,0")}
                </div>
                <div
                  style={{ color: "lightgreen" }}
                  className="scells"
                  name={name}
                >
                  {numeral(trecovered).format("0,0")}
                </div>
                <div style={{ color: "grey" }} className="scells" name={name}>
                  {numeral(deaths).format("0,0")}
                </div>
                <div
                  style={{ color: "lightgrey" }}
                  className="scells"
                  name={name}
                >
                  {numeral(tdeaths).format("0,0")}
                </div>
              </div>
              {curr === index ? (
                <div style={{}} className={"vis"}>
                  <div className="district row">
                    <div className="cells">District</div>
                    <div className="cells">Confirmed</div>
                    <div className="cells">T_confirmed</div>

                    <div className="cells">Active</div>
                    <div className="cells">T_active</div>

                    <div className="cells">Recovered</div>
                    <div className="cells">T_recoverd</div>

                    <div className="cells">Deaths</div>
                    <div className="cells">T_deaths</div>
                  </div>
                  {districts.map(
                    ({
                      cases,
                      active,
                      recovered,
                      deaths,
                      tcases,
                      trecovered,
                      tdeaths,
                      name
                    }) => (
                      // <Accordion dangerouslySetInnerHTML={{ __html: district }} />
                      <div 
                      key={name}
                      name={name} className={`row accordion_content`}>
                        <div
                          style={{ width: "140px", color: "white" }}
                          className="cells"
                          name={name}
                        >
                          {name}
                        </div>
                        <div
                          style={{ color: "#cc1034 " }}
                          className="cells"
                          name={name}
                        >
                          {numeral(cases).format("0,0")}
                        </div>
                        <div
                          style={{ color: "pink" }}
                          className="cells"
                          name={name}
                        >
                          {numeral(tcases).format("0,0")}
                        </div>

                        <div
                          style={{ color: " orange " }}
                          className="cells"
                          name={name}
                        >
                          {numeral(active).format("0,0")}
                        </div>
                        <div
                          style={{ color: "yellow" }}
                          className="cells"
                          name={name}
                        >
                          {numeral(
                            parseInt(tcases) -
                              parseInt(trecovered) -
                              parseInt(tdeaths)
                          ).format("0,0")}
                        </div>
                        <div
                          style={{ color: " #7dd71d" }}
                          className="cells"
                          name={name}
                        >
                          {numeral(recovered).format("0,0")}
                        </div>
                        <div
                          style={{ color: "lightgreen" }}
                          className="cells"
                          name={name}
                        >
                          {numeral(trecovered).format("0,0")}
                        </div>
                        <div
                          style={{ color: "grey" }}
                          className="cells"
                          name={name}
                        >
                          {numeral(deaths).format("0,0")}
                        </div>
                        <div
                          style={{ color: "lightgrey" }}
                          className="cells"
                          name={name}
                        >
                          {numeral(tdeaths).format("0,0")}
                        </div>
                      </div>
                    )
                  )}
                  {/* <Districts districts={districts} /> */}
                </div>
              ) : null}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Tableindia;
