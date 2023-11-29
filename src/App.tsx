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
  let [word, setWord] = useState("");
  let [steps, setSteps] = useState(0);

  //use effect is triggered twice in development, but in prod should trigger once
  useEffect(() => {
    //fetch word
    //render spinner
    //as word promise fulfilled, render game
    axios
      .get("https://random-word-api.herokuapp.com/word")
      .then((res) => {
        console.log(res.data[0], res.data[0].split("").length);
        setWord(res.data[0]);
        setSteps(res.data[0].split("").length);
      })
      .catch((error) => console.warn(error));
  }, []);

  return (
    <div className="App">
      <UnfortunateFellow />
      <VeiledWord word={word} steps={steps} />
      <Keyboard />
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
*/
