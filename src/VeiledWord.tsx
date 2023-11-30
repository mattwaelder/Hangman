import React from "react";

type VeiledWordProps = {
  word: string;
  steps: number;
  guessed: string[];
};

const VeiledWord = ({ word, steps, guessed }: VeiledWordProps) => {
  return (
    <div className="word-container">
      {word.split("").map((letter) => {
        return guessed.includes(letter) ? (
          <div className="word-char">{letter.toUpperCase()}</div>
        ) : (
          <div className="word-char"></div>
        );
      })}
    </div>
  );
};

export default VeiledWord;
