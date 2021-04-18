import React, { useState, useRef } from "react";
import "./Table.css";
import numeral from "numeral";
import Districts from "./disticts";

function Tableindia({ filteredItems, onStateChange }) {
  // console.log(filteredItems);
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  // const content = useRef(null);

  function toggleAccordion(e, name) {
    if (setActive === name) {
      setActiveState("");
    } else {
      setActiveState(name);
    }
    // setHeightState(
    //   setActive === "active" ? "0px" : `100px`
    // );
    console.log(name);
  }

  return (
    <div className="table" style={{}}>
      <div className="sheader state row">
        <div className="cells">State</div>
        <div className="cells">Confirmed</div>
        <div className="cells">T_confirmed</div>

        <div className="cells">Active</div>
        <div className="cells">T_active</div>

        <div className="cells">Recovered</div>
        <div className="cells">T_recoverd</div>

        <div className="cells">Deaths</div>
        <div className="cells">T_deaths</div>
      </div>

      {filteredItems.map(
        ({
          districts,
          cases,
          active,
          recovered,
          deaths,
          tcase,
          trecovered,
          tdeaths,
          name
        }) => (
          <div>
            <div
              key={name}
              onClick={onStateChange}
              className={`row state accordion`}
            >
              {/* <div name={name}> */}
              <div style={{ color: "white" }} className="cells" name={name}>
                {name}
              </div>
              <div style={{ color: "#cc1034 " }} className="cells" name={name}>
                {numeral(cases).format("0,0")}
              </div>
              <div style={{ color: "pink" }} className="cells" name={name}>
                {numeral(tcase).format("0,0")}
              </div>

              <div style={{ color: " orange " }} className="cells" name={name}>
                {numeral(active).format("0,0")}
              </div>
              <div style={{ color: "yellow" }} className="cells" name={name}>
                {numeral(
                  parseInt(tcase) - parseInt(trecovered) - parseInt(tdeaths)
                ).format("0,0")}
              </div>
              <div style={{ color: " #7dd71d" }} className="cells" name={name}>
                {numeral(recovered).format("0,0")}
              </div>
              <div
                style={{ color: "lightgreen" }}
                className="cells"
                name={name}
              >
                {numeral(trecovered).format("0,0")}
              </div>
              <div style={{ color: "grey" }} className="cells" name={name}>
                {numeral(deaths).format("0,0")}
              </div>
              <div style={{ color: "lightgrey" }} className="cells" name={name}>
                {numeral(tdeaths).format("0,0")}
              </div>
            </div>

            <div
            className="disttable"
              style={{
                marginLeft: "20px",
                border: "1px solid black",
                width:"100%"
              }}
            >
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
                  <div
                    className={`row district`}
                    style={{ marginLeft: "40px" }}
                  >
                    <div name={name}>{name}</div>
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
          </div>
        )
      )}
    </div>
  );
}

export default Tableindia;
