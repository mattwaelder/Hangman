import React from "react";
import { alphabet } from "./helpers";
import "./App.css";

const Keyboard = () => {
  return (
    <div className="keyboard-container">
      <div className="keyboard">
        {alphabet.split("").map((letter) => {
          return <div className="keyboard-key">{letter}</div>;
        })}
      </div>
    </div>
  );
};

export default Keyboard;
