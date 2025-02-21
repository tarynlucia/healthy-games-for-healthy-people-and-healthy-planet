import React, { useState } from "react";
import styles from "./styles/game.module.css";

export default function GamePage() {
  const [gameOver, setGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);

  const startGame = () => {
    setGameOver(false);
    setTimeout(() => {
      setIsWin(Math.random() > 0.5); // Randomly determine win or lose
      setGameOver(true);
    }, 2000);
  };

  return (
    <div className={styles.gameContainer}>
      <h1>Placeholder Mini-Game</h1>
      {!gameOver ? (
        <button className={styles.startButton} onClick={startGame}>
          Start Game
        </button>
      ) : (
        <WinLoseScreen isWin={isWin} onRetry={startGame} />
      )}
    </div>
  );
}

function WinLoseScreen({ isWin, onRetry }) {
  return (
    <div className={styles.resultContainer}>
      <h2>{isWin ? "You Win! 🎉" : "You Lose! 😢"}</h2>
      <button className={styles.retryButton} onClick={onRetry}>
        Try Again
      </button>
    </div>
  );
}
