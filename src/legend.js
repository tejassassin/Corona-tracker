import React from "react";

const Legend = ({ legendItems }) => {

  // console.log(legendItems)
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        padding:"10px 8px"
      }}
    >
      {legendItems.map((item) => (
        <div
          key={item.title}
          style={{
            backgroundColor: item.color,
            flex: 1,
            display: "flex",
            alignItems: "center", // vertical
            justifyContent: "center", // horiztontal
            color: item.textColor != null ? item.textColor : "black",
            fontWeight: "bolder",
            fontSize: "0.7em",
            height: "20px",
            opacity:0.9,
            padding:"10px 20px"
          }}
        >
          <span>{item.title}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
