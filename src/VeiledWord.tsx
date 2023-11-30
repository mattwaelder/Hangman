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
      {word.split("").map((letter, i) => {
        return guessed.includes(letter) || gameOver ? (
          <div className="word-char" key={i}>
            {letter.toUpperCase()}
          </div>
        ) : (
          <div className="word-char" key={i}></div>
        );
      })}
    </div>
  );
};

export default VeiledWord;
