// import { useState } from "react";
import "./Bar.css";

function Bar(prop) {
  return (
    <>
      <div className="bar1">
        <div className="bar-item">{prop.label}</div>
        <div className="bar-b1">
          <div
            className="Bar-population"
            style={{
              backgroundColor: prop.color,
              width: `${100 * (prop.width / prop.totalValue)}%`,
            }}
          >
            <img
              src={prop.logo}
              style={{
                borderRadius: "100%",
                width: "auto",
                height: "32px",
              }}
            />
            <div
              className="bar-item1"
              style={{ position: "absolute", right: -110 }}
            >
              {parseInt(prop.value).toLocaleString("en-US")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bar;
