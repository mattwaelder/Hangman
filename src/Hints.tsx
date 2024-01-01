type hintsProps = {
  hintCount: number;
  handleHint: any;
  isRandom: boolean;
  setIsRandom: any;
  disableHints: boolean;
};

const Hints = ({
  hintCount,
  handleHint,
  isRandom,
  setIsRandom,
  disableHints,
}: hintsProps) => {
  return (
    <div className="hintContainer">
      <button
        id="random"
        className={` hintBtn randomizeBtn ${isRandom ? "toggledOn" : ""}`}
        defaultChecked={isRandom ? true : false}
        onClick={() => setIsRandom(!isRandom)}
      >
        Random Length
      </button>
      <button
        className="hintBtn"
        disabled={disableHints || hintCount <= 0 ? true : false}
        value="show"
        onClick={(e) => handleHint(e)}
      >
        Reaveal
      </button>
      <button
        className="hintBtn"
        disabled={disableHints || hintCount <= 0 ? true : false}
        value="define"
        onClick={(e) => handleHint(e)}
      >
        Define
      </button>
    </div>
  );
};

export default Hints;
