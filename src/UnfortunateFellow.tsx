import React from "react";

const UnfortunateFellow = () => {
  let step: number = 0;

  const HEAD = (
    <div
      style={{
        height: "20px ",
        width: "20px",
        background: "black",
        position: "absolute",
        left: `calc(30vw - 7px)`,
        top: `40px`,
        borderRadius: "50%",
        border: "none",
        transform: `translateX(${0})`,
      }}
    ></div>
  );

  const BODY = (
    <div
      style={{
        height: "50px",
        width: "5px",
        background: "black",
        position: "absolute",
        left: `30vw`,
        top: `50px`,
        transform: `translateX(${0})`,
      }}
    ></div>
  );

  const L_ARM = (
    <div
      style={{
        height: "5px",
        width: "20px",
        background: "black",
        position: "absolute",
        left: `calc(30vw - 20px)`,
        top: `70px`,
        transform: `rotate(15deg) translateX(${0})`,
        transformOrigin: "bottom right",
      }}
    ></div>
  );

  const R_ARM = (
    <div
      style={{
        height: "5px",
        width: "20px",
        background: "black",
        position: "absolute",
        left: `calc(30vw + 5px)`,
        top: `70px`,
        transform: `rotate(-15deg) translateX(${0}`,
        transformOrigin: "bottom left",
      }}
    ></div>
  );

  const L_LEG = (
    <div
      style={{
        height: "25px",
        width: "5px",
        background: "black",
        position: "absolute",
        left: `calc(30vw - 8px)`,
        top: `120px`,
        transform: `rotate(210deg) translateX(${0}`,
        transformOrigin: "top left",
      }}
    ></div>
  );

  const R_LEG = (
    <div
      style={{
        height: "25px",
        width: "5px",
        background: "black",
        position: "absolute",
        left: `calc(30vw + 8px)`,
        top: `120px`,
        transform: `rotate(150deg) translateX(${0}`,
        transformOrigin: "top right",
      }}
    ></div>
  );

  const PLANK = (
    <div
      style={{
        width: "200px",
        height: "10px",
        background: "black",
        position: "absolute",
        top: "120px",
        left: "30vw",
      }}
    ></div>
  );
  return (
    <div className="image-container">
      {PLANK}
      {HEAD}
      {L_ARM}
      {R_ARM}
      {BODY}
      {L_LEG}
      {R_LEG}
    </div>
  );
};

export default UnfortunateFellow;
