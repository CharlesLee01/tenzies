import { useState } from "react";
import Dice from "../components/Dice.jsx";
import { nanoid } from "nanoid";
import React from "react";
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [gameStart, setGameStart] = React.useState(false);
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const [startTime, setStartTime] = React.useState(null);


  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const sameNumber = dice.every(die => die.value === firstValue);

    if (allHeld && sameNumber) {
      setTenzies(true);
      setGameStart(false);
      setStartTime(null);
      console.log("You won!");
    }

    if (gameStart) {
        console.log("hi");
        const intervalId = setInterval(() => {
        const currentTime = new Date();
        const elapsed = Math.floor((currentTime - startTime) / 1000); // in seconds
        setElapsedTime(elapsed);
      }, 10);
      return () => clearInterval(intervalId);
    }
  }, [dice, gameStart])


  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function holdDie(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );

    if (!gameStart) {
      setGameStart(true);
      setStartTime(new Date());
    }
  }

  function roll() {
    if (tenzies) {
      setTenzies(false);
      setDice(allNewDice);
      setElapsedTime(0);
    } else {
      setDice((prevDice) => {
        return prevDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        });
      });
    }    
  }


  const diceElements = dice.map((die) => {
    return <Dice key={die.id} {...die} holdDie={holdDie} />;
  });

  return (
    <div className="header">
      {tenzies && <Confetti />}
      <p className="title">Tenzies</p>
      <p className="description">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="button" onClick={roll}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      <p className="time">Time taken: {Math.floor(elapsedTime / 60)} minute(s) {elapsedTime % 60} second(s)</p>
    </div>
  );
}

export default App;
