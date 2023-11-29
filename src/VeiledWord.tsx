import React from "react";

type VeiledWordProps = {
  word: string;
  steps: number;
};

const VeiledWord = ({ word, steps }: VeiledWordProps) => {
  return (
    <div className="word-container">
      {word.split("").map((letter) => {
        return <div className="word-char">{letter.toUpperCase()}</div>;
      })}
    </div>
  );
};

export default VeiledWord;
