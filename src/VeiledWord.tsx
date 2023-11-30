import React from "react";

type VeiledWordProps = {
  word: string;
  steps: number;
  guessed: string[];
  gameOver: boolean;
};

const VeiledWord = ({ word, steps, guessed, gameOver }: VeiledWordProps) => {
  return (
    <div className="word-container">
      {word.split("").map((letter) => {
        return guessed.includes(letter) || gameOver ? (
          <div className="word-char">{letter.toUpperCase()}</div>
        ) : (
          <div className="word-char"></div>
        );
      })}
    </div>
  );
};

export default VeiledWord;
