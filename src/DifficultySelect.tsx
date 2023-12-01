import React from "react";

type DifficultySelectProps = {
  difficulty: number;
  handleDifficultyChange: any;
};

const DifficultySelect = ({
  difficulty,
  handleDifficultyChange,
}: DifficultySelectProps) => {
  return (
    <>
      <div
        className="difficultySelector"
        onChange={(e) => handleDifficultyChange(e)}
      >
        <input
          type="radio"
          id="low"
          name="difficulty"
          value="12"
          defaultChecked={difficulty === 12 ? true : false}
        ></input>
        <label htmlFor="low">Easy</label>
        <input
          type="radio"
          id="medium"
          name="difficulty"
          value="8"
          defaultChecked={difficulty === 8 ? true : false}
        ></input>
        <label htmlFor="medium">Normal</label>
        <input
          type="radio"
          id="high"
          name="difficulty"
          value="5"
          defaultChecked={difficulty === 5 ? true : false}
        ></input>
        <label htmlFor="high">Challenging</label>
      </div>
    </>
  );
};

export default DifficultySelect;
