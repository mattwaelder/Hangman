import React from "react";

const DifficultySelect = () => {
  return (
    <>
      <div className="difficultySelector">
        <input type="radio" id="low" name="difficulty" value="12"></input>
        <label htmlFor="low">Easy</label>
        <input type="radio" id="medium" name="difficulty" value="8"></input>
        <label htmlFor="medium">Normal</label>
        <input type="radio" id="high" name="difficulty" value="5"></input>
        <label htmlFor="high">Challenging</label>
      </div>
    </>
  );
};

export default DifficultySelect;
