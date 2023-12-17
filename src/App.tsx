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
import { alphabet } from "./helpers";
import axios, { AxiosResponse } from "axios";

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
        `https://random-word-api.vercel.app/api?words=1&length=${difficulty}`
      )
      .then((res) => {
        console.log(res.data[0], res.data[0].split("").length);
        setWord(res.data[0]);
      })
      .catch((error) => {
        console.warn(error.message);
      });
  }, [reset, difficulty]);

  //user makes a guess
  const handleGuess = (e: any) => {
    e.preventDefault();
    let currChar: string = e.target.dataset.char;

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
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((res) => {
        let topDefinition = res.data[0].meanings[0].definitions[0].definition;
        console.log(res.data[0].meanings[0].definitions[0].definition);
        console.log(res.data[0].meanings);
        if (topDefinition) {
          setWordInfo(topDefinition);
        } else {
          setWordInfo("OOF");
        }
        setDisplayLookup(true);
        // alert(topDefinition);
      })
      .catch((error) => alert(error.message));
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

    //this is for useEffect to get new word
    setReset(!reset);
  };

  const handleDifficultyChange = (e: any) => {
    let difficulty: number = parseInt(e.target.value);
    setDifficulty(difficulty);
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
        <FaShoePrints />
        {steps}
      </div>
      <DifficultySelect
        difficulty={difficulty}
        handleDifficultyChange={handleDifficultyChange}
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
          {displayLookup ? (
            <div className="definitionContainer">
              <IoMdClose
                className="lookupCloseBtn"
                size="30px"
                onClick={() => setDisplayLookup(false)}
              />
              <h2>{word.toUpperCase()}</h2>
              <ul className="definitionList">
                <li>
                  <p>{wordInfo}</p>
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
        </>
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
improve visuals of plank?
update step icon with x/y count or count down to 0 remaining steps
add spinner for site regen / word lookup
remove invalid words from being chosen (or filter words to only letters in alphabet)
*/
