import { useState } from "react";
import Dice from "../components/Dice.jsx";
import { nanoid } from "nanoid";
import React from "react";
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);


  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const sameNumber = dice.every(die => die.value === firstValue);

    if (allHeld && sameNumber) {
      setTenzies(true);
      console.log("You won!");
    }
  }, [dice])
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
  }

  function roll() {
    if (tenzies) {
      setTenzies(false);
      setDice(allNewDice);
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
    </div>
  );
}

export default App;
