import React from "react";
import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import UnfortunateFellow from "./UnfortunateFellow";
import VeiledWord from "./VeiledWord";
import Keyboard from "./Keyboard";
import { alphabet } from "./helpers";
import axios, { AxiosResponse } from "axios";

function App() {
  //states
  let [word, setWord] = useState<string>("");
  let [steps, setSteps] = useState<number>(0);
  let [guessed, setGuessed] = useState<string[]>([]);
  let [gameOver, setGameOver] = useState<boolean>(false);
  let [win, setWin] = useState<boolean>(false);
  let [difficulty, setDifficulty] = useState<number>(8);

  //fetch word, update state
  useEffect(() => {
    axios
      .get("https://random-word-api.herokuapp.com/word")
      .then((res) => {
        console.log(res.data[0], res.data[0].split("").length);
        setWord(res.data[0]);
      })
      .catch((error) => console.warn(error));
  }, []);

  //user makes a guess
  const handleGuess = (e: any) => {
    e.preventDefault();
    let currChar: string = e.target.dataset.char;
    console.log(`guessed ${currChar}`);

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
      if (currSteps > 7) {
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
      <div className="step-counter">{steps}</div>
      {gameOver ? <div className="game-over">GAME OVER</div> : ""}
      {win ? <div className="win">WINNER</div> : ""}
    </div>
  );
}

export default App;

/*
start
http req for random word (no space, no characters)
(loading spinner?)
set random word state
render default state of hangman visualization
dynamically render underscores for each character in word
show full alphabet in caps
as user clicks letters they visably change
if letter is in word, render letter (all occurances)
if letter is NOT in word, ++ guess counter - dynamically updating game image
if guess counter gets too high, issue game over and ask to play again

provide option to reset w/ new word
provide definition of the word?
rather than hang man, what other image could i draw that makes sense?

if i do plank, the amount of steps to fail will change w/ the word. ill need to get a step variable and make set positions based on that variable on the plank

maybe set a difficulty option which determines the length of the word?



TODO
add difficulty selection
make plank walking better-er
add "reset" button on win/loss screen
add "word lookup" on win/loss screen
add title and sassy blurb?

exs:
~~
a hangman game without a hanging man,
with a cracked api,
will make you feel dumb,
totally fair and valid words
~~
*/
