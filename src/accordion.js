import React from "react";
import "./Table.css";
import numeral from "numeral";
import "./accordion.css";
var x={
    cases,
    active,
    recovered,
    deaths,
    tcases,
    trecovered,
    tdeaths,
    name
  };

function Accordion({ dangerouslySetInnerHTML }) {


    console.log(dangerouslySetInnerHTML,"hi")
  return (
    <div name={name} className={`row accordion_content`}>
      <div
        style={{ width: "140px", color: "white" }}
        className="cells"
        name={name}
      >
        {name}
      </div>
      <div style={{ color: "#cc1034 " }} className="cells" name={name}>
        {numeral(cases).format("0,0")}
      </div>
      <div style={{ color: "pink" }} className="cells" name={name}>
        {numeral(tcases).format("0,0")}
      </div>

      <div style={{ color: " orange " }} className="cells" name={name}>
        {numeral(active).format("0,0")}
      </div>
      <div style={{ color: "yellow" }} className="cells" name={name}>
        {numeral(
          parseInt(tcases) - parseInt(trecovered) - parseInt(tdeaths)
        ).format("0,0")}
      </div>
      <div style={{ color: " #7dd71d" }} className="cells" name={name}>
        {numeral(recovered).format("0,0")}
      </div>
      <div style={{ color: "lightgreen" }} className="cells" name={name}>
        {numeral(trecovered).format("0,0")}
      </div>
      <div style={{ color: "grey" }} className="cells" name={name}>
        {numeral(deaths).format("0,0")}
      </div>
      <div style={{ color: "lightgrey" }} className="cells" name={name}>
        {numeral(tdeaths).format("0,0")}
      </div>
    </div>
  );
}

export default Accordion;
