import React from "react";

const UnfortunateFellow = () => {
  let step: number = 0;

  const BODY = (
    <div
      style={{
        height: "100px",
        width: "10px",
        background: "black",
        position: "absolute",
        left: `${30 + step}vw`,
        top: "90px",
      }}
    ></div>
  );

  const PLANK = (
    <div
      style={{
        width: "250px",
        height: "10px",
        background: "black",
        position: "absolute",
        top: "200px",
        left: "30vw",
      }}
    ></div>
  );
  return (
    <div className="image-container">
      {PLANK}
      {BODY}
    </div>
  );
};

export default UnfortunateFellow;
