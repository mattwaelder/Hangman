import React from "react";
import { alphabet } from "./helpers";
import "./App.css";

type KeyboardProps = {
  handleGuess: any;
  guessed: string[];
};

const Keyboard = ({ guessed, handleGuess }: KeyboardProps) => {
  return (
    <div className="keyboard-container">
      <div className="keyboard">
        {alphabet.split("").map((letter) => {
          return (
            <div
              className={`${
                guessed.includes(letter) ? "disabled" : ""
              } keyboard-key`}
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
