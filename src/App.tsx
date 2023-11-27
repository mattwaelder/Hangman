import React from "react";
import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import UnfortunateFellow from "./UnfortunateFellow";
import VeiledWord from "./VeiledWord";
import Keyboard from "./Keyboard";
import { alphabet } from "./helpers";

function App() {
  //states
  let [word, setWord] = useState("secret");

  useEffect(() => {
    //fetch word
    //render spinner
    //as word promise fulfilled, render game
    console.log(alphabet);
  }, []);

  return (
    <div className="App">
      <UnfortunateFellow />
      <VeiledWord />
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
*/
