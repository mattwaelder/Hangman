import React from "react";
import { alphabet } from "./helpers";
import "./App.css";

type KeyboardProps = {
  handleGuess: any;
};

const Keyboard = ({ handleGuess }: KeyboardProps) => {
  return (
    <div className="keyboard-container">
      <div className="keyboard">
        {alphabet.split("").map((letter) => {
          return (
            <div
              className="keyboard-key"
              data-char={letter}
              onClick={(e) => handleGuess(e)}
            >
              {letter}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Keyboard;
