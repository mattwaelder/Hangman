import React from "react";
import { GiPirateHat } from "react-icons/gi";

type UnfortunateFellowProps = {
  steps: number;
  difficulty: number;
};

const UnfortunateFellow = ({ steps, difficulty }: UnfortunateFellowProps) => {
  const plankWidth: number = 200;
  const stepLength = plankWidth / difficulty;

  //200 / 8 = 25
  //if 8 steps, each step should be 25 px

  const HAT = (
    <div
      style={{
        height: "auto",
        width: "auto",
        position: "absolute",
        left: `calc(30vw - 17px)`,
        top: `9px`,
        color: "black",
        zIndex: "5",
        transform: `translateX(${(steps + 1) * stepLength}px)`,
      }}
    >
      <GiPirateHat size={40} />
    </div>
  );

  const HEAD = (
    <div
      style={{
        height: "15px ",
        width: "20px",
        background: "black",
        position: "absolute",
        left: `calc(30vw - 7px)`,
        top: `40px`,
        borderRadius: "0 0 40px 40px",
        border: "none",
        transform: `translateX(${(steps + 1) * stepLength}px`,
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
        transform: `translateX(${(steps + 1) * stepLength}px)`,
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
        transformOrigin: "bottom right",
        // transform: `rotate(15deg) translateX(${steps * stepLength}px)`,
        transform: `translateX(${(steps + 1) * stepLength}px) rotate(15deg)`,
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
        transform: `translateX(${(steps + 1) * stepLength}px) rotate(-15deg)`,
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
        transform: `translateX(${(steps + 1) * stepLength}px) rotate(210deg)`,
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
        transform: `translateX(${(steps + 1) * stepLength}px) rotate(150deg)`,
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
      {HAT}
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
