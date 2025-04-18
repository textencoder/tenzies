import "./App.css";
import { useState } from "react";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = useState(generateAllNewDice());

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  const diceElements = dice.map((el) => {
    return <Die hold={hold} key={el.id} id={el.id} value={el.value} isHeld={el.isHeld} />;
  });

  function rollDice() {
    setDice(oldDice => {
      return oldDice.map(die => !die.isHeld ? {...die, value: Math.ceil(Math.random() * 6)} : die)
    });
  }

  function hold(id) {
    console.log(id)
    setDice(oldDice => {
      return oldDice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die)
    })
  }

  return (
    <>
      <main>
        <div className="game-info">
          <h1>Tenzies</h1>
          <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </div>

        <div className="dice-wrapper">{diceElements}</div>

        <button className="new-dice-btn" onClick={rollDice}>
          Roll Dice
        </button>
      </main>
    </>
  );
}

function Die(props) {
  return (
    <button
    onClick={() => props.hold(props.id)}
      className="die"
      style={props.isHeld ? { backgroundColor: "#59e391" } : {backgroundColor: "white"}}
    >
      {props.value}
    </button>
  );
}

export default App;
