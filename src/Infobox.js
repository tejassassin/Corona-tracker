import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./Infobox.css";
import numeral from "numeral";

function Infobox({ title, cases, total, onClick, active, caseType, updated }) {
  // console.log("cases ", cases);
  // if(updated){

  //   updated = updated.substr(0, 3) + "0" + updated.substr(3);
  // }
  // console.log(updated);
  return (
    <div
      onClick={onClick}
      className={`infobox ${active && "infobox__active"} ${caseType}`}
    >
      <Card>
        <CardContent>
          <Typography className="infobox__title" color="textPrimary">
            {title}
          </Typography>
          <h2 className="infobox__cases">{numeral(total).format("0.0a")}</h2>
          {/* <CountUp end={total} duration={2.75} /> */}

          <Typography className="infobox__total" color="textSecondary">
            {cases
              ? cases > 0
                ? "+" + numeral(cases).format("0.0a")
                : numeral(cases).format("0.0a")
              : "+0"}
          </Typography>
          <Typography className="infobox__updated" color="textPrimary">
            {new Date(updated).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Infobox;
