import React from "react";
import "./Table.css";
import numeral from "numeral";

function Table({
  filteredItems,
  onCountryChange,
  tCases,
  tRrecovered,
  tDeaths
}) {

  // console.log(filteredItems);
  return (
      <div className="wtable">
    <div className="table">
        {/* <table> */}
        {/* <tbody> */}


        <tr
          style={{
            color: "white"
          }}
        >
          <td 
                style={{  width:"180px" }}
          
          >Country</td>
          <td>Confirmed</td>
          <td>Active</td>
          <td>Recovered</td>
          <td>Deaths</td>
          <td>Tests</td>
          <td>Population</td>
        </tr>

        {filteredItems.map(
          ({
            country,
            countryInfo,
            cases,
            deaths,
            recovered,
            tests,
            population,
      
          }) => (
            // <MenuItem

            // >

            <tr
              key={country}
              className="tabledata"
              onClick={onCountryChange}
              value={countryInfo.iso2}
              name={country}
              // style={{
              //   padding: "6px 25px",
              //   borderBottom: "2px solid black"
              // }}
            >
              <td
                style={{ color: "white", width:"180px" }}
                value={countryInfo.iso2}
                name={country}
                title={country}
              >
                {country}
              </td>
              <td
                style={{ color: "#cc1034 " }}
                className="nums"
                value={countryInfo.iso2}
                name={country}
              >
                {numeral(cases).format("0,0")}
              </td>
              {/* <td
                style={{ color: "pink" }}
                className="nums"
                value={countryInfo.iso2}
                name={country}
              >
                {numeral(todayCases).format("0,0")}
               
              </td> */}
              <td
                style={{ color: " orange " }}
                className="nums"
                value={countryInfo.iso2}
                name={country}
              >
                {numeral(cases - (deaths + recovered)).format("0,0")}
              </td>
              <td
                style={{ color: " #7dd71d" }}
                className="nums"
                value={countryInfo.iso2}
                name={country}
              >
                {numeral(recovered).format("0,0")}
              </td>
              <td
                style={{ color: "grey" }}
                className="nums"
                value={countryInfo.iso2}
                name={country}
              >
                {numeral(deaths).format("0,0")}
              </td>
              <td
                style={{ color: " #5ab9ea " }}
                className="nums"
                value={countryInfo.iso2}
                name={country}
              >
                {numeral(tests).format("0,0")}
              </td>
              <td
                style={{ color: " #bc986a" }}
                className="nums"
                value={countryInfo.iso2}
                name={country}
              >
                {numeral(population).format("0,0")}
              </td>
            </tr>
          )
        )}
        {/* </tbody> */}

        {/* </table> */}

      </div>
    </div>
  );
}

export default Table;
