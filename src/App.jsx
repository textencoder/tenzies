import "./App.css";
import { useState } from "react";

function App() {
  const [dice, setDice] = useState(generateAllNewDice());

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map(() => ({ value: Math.ceil(Math.random() * 6), isHeld: false }));
  }

  const diceElements = dice.map((el, index) => {
    return <Die key={index} value={el.value} isHeld={el.isHeld} />;
  });

  function rollDice() {
    setDice(generateAllNewDice());
  }

  return (
    <>
      <main>
        <div className="dice-wrapper">{diceElements}</div>

        <button className="new-dice-btn" onClick={rollDice}>
          Roll Dice
        </button>
      </main>
    </>
  );
}

function Die(props) {
  return <button className="die">{props.value}</button>;
}

export default App;
