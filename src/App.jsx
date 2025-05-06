import "./App.css";
import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const buttonRef = useRef(null);
  const [startTime, setStartTime] = useState(Date.now())

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  useEffect(() => {
    if (gameWon) {
      console.log("You won in " + ((Date.now() - startTime) / 1000).toFixed(2) + " seconds")
      buttonRef.current.focus()
    }
  }, [gameWon])

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  const diceElements = dice.map((el) => {
    return (
      <Die
        hold={hold}
        key={el.id}
        id={el.id}
        value={el.value}
        isHeld={el.isHeld}
      />
    );
  });

  function rollDice() {
    if (gameWon) {
      setDice(() => generateAllNewDice());
      setStartTime(Date.now())
    }
    setDice((oldDice) => {
      return oldDice.map((die) =>
        !die.isHeld ? { ...die, value: Math.ceil(Math.random() * 6) } : die
      );
    });
  }

  function hold(id) {
    //console.log(id)
    setDice((oldDice) => {
      return oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      );
    });
  }

  return (
    <>
      <main>
      {gameWon && <Confetti recycle={false} numberOfPieces={400} />}
      <div
        aria-live="polite"
        className="sr-only"
      >
        {gameWon && <p>Congratulations! You won! Click "New Game" to start again.</p>}
      </div>
        <div className="game-info">
          <h1>Tenzies</h1>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <h3 style={gameWon ? {visibility:"visible"} : {visibility:"hidden"}}>You won in <strong>{((Date.now() - startTime) / 1000).toFixed(2)}</strong> seconds!</h3>
        </div>

        <div className="dice-wrapper">{diceElements}</div>

        <button ref={buttonRef} className="new-dice-btn" onClick={rollDice}>
          {gameWon ? "New Game" : "Roll Dice"}
        </button>
      </main>
    </>
  );
}

function Die(props) {
  return (
    <button
      aria-pressed={props.isHeld}
      aria-label={`Die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`}
      onClick={() => props.hold(props.id)}
      className="die"
      style={
        props.isHeld
          ? { backgroundColor: "#59e391",
            boxShadow: "0 5px 0 rgb(58, 163, 91)"
           }
          : { backgroundColor: "white",
            boxShadow: "0 5px 0 rgb(200, 200, 200)"
           }
      }
    >
      {props.value}
    </button>
  );
}

export default App;
