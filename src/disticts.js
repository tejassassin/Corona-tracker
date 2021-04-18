import React from 'react';
import numeral from "numeral";


export default function Disticts(districts) {

    console.log(districts);
    return (
        <div>
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
            <div className={`row district`}>
              <div style={{ color: "white" }} name={name}>
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
          )
        )}
      </div>
      
    )
}
