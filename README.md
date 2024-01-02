# Walk the Plank!
A game of hangman, sans gallows.

* Live site available at: https://walktheplank.netlify.app

<img width="400" alt="walktheplank" src="https://github.com/mattwaelder/hangman/assets/74801942/e7640a78-d7c2-44f1-8520-725b775762b1">

## About

I initially set out to use TypeScript and React to make a game. At first I was going to make a game of hangman, but I found the premise to be a bit... much. So I asked my cooworkers to help me brainstorm some alternative game ideas which shared elements of the original hangman game, and this is what we came up with!

## Technical Challenges

  * The bulk of the technical challenges were a result of my inexperience with TypeScript
    
  - Setup of a TS / React app as well as the TS config file, which was a bit of a foreign concept at first.
  - While setting up the components, I ran into issues with passing state down to subcomponents. I found that the props typing had to be declared as if they were an object in TS. This makes sense now but classing out the props seemed a little unecessary at the time since I had typing for all of the states already.
  - At first I found the game to be too difficult. Hangman typically is much easier because the person who picks the word doesnt truly pick a random word as an API would. This required me to implement some game logic for hints, which balanced things nicely I think.
  - The act of walking down the plank was a really fun technical challenge, in the normal game of hangman you add additional limbs, but in my version you walk down a plank, so I set up a "step" system which is a function of difficulty / word length. The more words there are the more steps you get, and I translate the unfortunate pirate man by different amounts for each word length.
  - At one point I went down a whole rabbit whole of how to properly implement hints. My first itteration involved a lot of additional code, but after a good sleep I revised an existing function to take an additional parameter which declares of the guess was from the keyboard or from the hint button.
  - I also had to do some revising to use sets rather than arrays to account for words with multiples of the same characters.

## How does the app work?

  - Upon game load an http request is sent to a random word generator. This returns of word of appropriate length depending on what the player selects.
  - Many React states are filled with default values as well as values derived from the current word.
  - As the user selects characters a function finds out if the character was in the word or not, and fills the word out as you would expect.
  - Revealing a character is functionally the same as clicking on the keyboard, excpet that hints become disabled at the end game.
  - If the set of guessed characters includes the set of the word before your chances (steps) reach 0, you win!
  - If your steps reach 0, you lose :(
  - When the game resets it keeps all of the selections the same by simply resetting the necessary states and calling a new word from the API.
          

## Author

Matthew Waelder

[![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/mattwaelder/)](https://www.linkedin.com/in/mattwaelder/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/mattwaelder)](https://github.com/mattwaelder)

My Portfolio Website: https://mattwaelder.com

## Technology Used

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)![Axios](https://img.shields.io/badge/axios-5a29e4.svg?style=for-the-badge&logo=axios&logoColor=white)

## Thanks for Reading!
If you've made it all the way down here, I would like to thank you for reading. I hope that you have as much fun playing this game as I have!
