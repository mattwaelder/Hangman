import React from "react";
import { useState, useEffect } from "react";
import { FaRedo } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaShoePrints } from "react-icons/fa6";
import "./App.scss";
import UnfortunateFellow from "./UnfortunateFellow";
import VeiledWord from "./VeiledWord";
import Keyboard from "./Keyboard";
import DifficultySelect from "./DifficultySelect";
import Hints from "./Hints";
import { randomInt } from "./helpers";
import axios, { AxiosResponse } from "axios";
import { setSyntheticLeadingComments } from "typescript";

function App() {
  //states
  let [word, setWord] = useState<string>("");
  let [steps, setSteps] = useState<number>(0);
  let [guessed, setGuessed] = useState<string[]>([]);
  let [gameOver, setGameOver] = useState<boolean>(false);
  let [win, setWin] = useState<boolean>(false);
  let [difficulty, setDifficulty] = useState<number>(7);
  let [displayLookup, setDisplayLookup] = useState<boolean>(false);
  let [wordInfo, setWordInfo] = useState<any>("");
  let [hintCount, setHintCount] = useState<number>(2);
  let [disableHints, setDisableHints] = useState<boolean>(false);
  let [isRandom, setIsRandom] = useState<boolean>(false);
  //rather than an async fn to get new word using a state to trigger new word
  let [reset, setReset] = useState<boolean>(false);

  //fetch word, update state
  useEffect(() => {
    // axios
    //   .get("https://random-word-api.herokuapp.com/word")
    //   .then((res) => {
    //     console.log(res.data[0], res.data[0].split("").length);
    //     setWord(res.data[0]);
    //   })
    //   .catch((error) => {
    //     console.warn(error.message);
    //   });

    axios
      .get(
        `https://random-word-api.vercel.app/api?words=1&length=${
          isRandom ? randomInt(3, 9) : difficulty
        }`
      )
      .then((res) => {
        console.log(res.data[0], res.data[0].split("").length);
        setWord(res.data[0]);
      })
      .catch((error) => {
        console.warn(error.message);
      });
  }, [reset, difficulty, isRandom]);

  //user makes a guess
  //if keybpress, isHint == f, else e becomes a character rather than event
  const handleGuess = (e: any, isHint = false) => {
    // e.preventDefault();

    let currChar: string;

    if (isHint) {
      currChar = e;
    } else {
      currChar = e.target.dataset.char;
    }

    //if already guessed, return
    if (guessed.includes(currChar)) return;

    //deep copy of guess pool
    let currGuessPool: string[] = JSON.parse(JSON.stringify(guessed));
    currGuessPool.push(currChar);

    //if guess is not in word
    if (!word.split("").includes(currChar)) {
      let currSteps = steps;
      currSteps++;

      //if game over (x wrong guesses)
      if (currSteps > difficulty - 1) {
        console.warn("game over");
        setGameOver(true);
        return;
      }
      setSteps(currSteps);
    } else {
      //if the guess is correct
      //array of correct guesses so far
      let correctGuesses = currGuessPool.filter((guess, i) =>
        word.split("").includes(guess)
      );

      //set of correct characters
      let correctSet = new Set(word.split(""));

      //near end, disable help
      if (correctSet.size - correctGuesses.length < 2) {
        setDisableHints(true);
      }

      //if guessed chars match set of correct chars (win)
      if (correctGuesses.length === correctSet.size) {
        setWin(true);
      }
    }

    //update states
    setGuessed(currGuessPool);
  };

  //get dictionary definition
  const wordLookup = () => {
    console.log("looking up");
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((res) => {
        let topDefinition =
          res.data[0].meanings[0].definitions[0].definition || undefined;

        if (topDefinition) {
          setWordInfo(topDefinition);
        }
      })
      .catch((error) => {
        setWordInfo("Failed to locate definition :(");
        console.warn(error.message);
      });
    setDisplayLookup(true);
  };

  //user requests a hint
  const handleHint = (e: any) => {
    let hintType: string = e.target.value;

    //pulling this logic from handleGuess (very bad ik)
    let currGuessPool: string[] = JSON.parse(JSON.stringify(guessed));
    let correctGuesses = currGuessPool.filter((guess, i) =>
      word.split("").includes(guess)
    );
    let correctSet = new Set(word.split(""));
    //cant desctructure bc ts is set to compile to es5 >:(
    let neededChars = Array.from(correctSet).filter(
      (letter) => !correctGuesses.includes(letter)
    );

    if (hintType === "show") {
      let randomIndex = Math.floor(Math.random() * neededChars.length);
      let revealedChar = neededChars[randomIndex];
      //call guess w/ hint param === true
      handleGuess(revealedChar, true);
    }

    if (hintType === "define") {
      wordLookup();
    }

    //reduce hint count as fn of difficulty
    let currHintCount = hintCount;
    difficulty === 5
      ? setHintCount(currHintCount - 2)
      : setHintCount(currHintCount - 1);
  };

  //reset pressed
  const handleReset = () => {
    //reset everything but the difficulty
    setWin(false);
    setGameOver(false);
    setSteps(0);
    setGuessed([]);
    setDisplayLookup(false);
    setWordInfo("");
    setHintCount(2);
    //this is for useEffect to get new word
    setReset(!reset);
  };

  const handleDifficultyChange = (e: any) => {
    let newDifficulty: number = parseInt(e.target.value);
    //if hard set hints to 1
    setDifficulty(newDifficulty);
    handleReset();
  };

  return (
    <div className="App">
      <UnfortunateFellow steps={steps} difficulty={difficulty} />

      <VeiledWord
        word={word}
        steps={steps}
        guessed={guessed}
        gameOver={gameOver}
      />

      <Keyboard guessed={guessed} handleGuess={handleGuess} />

      <div className="step-counter">
        <p id="stepTitle">steps remaining</p>
        <div className="stepIconCountWrapper">
          <FaShoePrints id="stepIcon" />
          <p id="stepCount">{difficulty - steps}</p>
        </div>
      </div>

      <DifficultySelect
        difficulty={difficulty}
        handleDifficultyChange={handleDifficultyChange}
      />

      <Hints
        hintCount={hintCount}
        handleHint={handleHint}
        isRandom={isRandom}
        setIsRandom={setIsRandom}
        disableHints={disableHints}
      />

      {gameOver ? <div className="game-over">GAME OVER</div> : ""}

      {win ? <div className="win">WINNER</div> : ""}

      {win || gameOver ? (
        <>
          <button className="redoBtn" onClick={() => handleReset()}>
            <FaRedo size="25px" />
          </button>
          <button className="lookupBtn" onClick={() => wordLookup()}>
            {word}?
          </button>
        </>
      ) : (
        ""
      )}

      {displayLookup ? (
        <div className="definitionContainer">
          <IoMdClose
            className="lookupCloseBtn"
            size="30px"
            onClick={() => setDisplayLookup(false)}
          />
          <h2>{win || gameOver ? word.toUpperCase() : ""}</h2>
          <ul className="definitionList">
            <li>
              <p>{wordInfo}</p>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;

/*
TODO
add title and sassy blurb?
adjust app size to account for mobile browser searchbar
improve visuals of plank?
add spinner for site regen / word lookup
remove invalid words from being chosen (or filter words to only letters in alphabet)
change images from png to webp
break up the code into more components, move functions and api calls
redo layout with all the new buttons and such (maybe w/ grid? or stick to easy stuff)
*/
