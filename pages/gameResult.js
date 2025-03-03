import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./styles/gameResult.module.css";

export default function GameResultPage() {
  const router = useRouter();
  const { isWin } = router.query; // Retrieve the win/lose result from the query string
  const [gameResult, setGameResult] = useState(null); // Track game result state

  useEffect(() => {
    // Ensure isWin is available before updating the result
    if (isWin !== undefined) {
      setGameResult(isWin === "true" ? "You Win! 🎉" : "You Lose! 😢");
    }
  }, [isWin]);

  // Handle retry and exit
  const restartGame = () => {
    router.push("/gameModePage"); // Redirect to the game mode page to start again
  };

  const goHome = () => {
    router.push("/"); // Redirect to the home page
  };

  if (gameResult === null) {
    return <div>Loading...</div>; // Show a loading message while isWin is being fetched
  }

  return (
    <div className={styles.gameContainer}>
      <h1>Game Result</h1>
      <div className={styles.resultContainer}>
        <h2>{gameResult}</h2> {/* Display the result */}
        <div className={styles.buttonContainer}>
          <button className={styles.retryButton} onClick={restartGame}>
            Try Again
          </button>
          <button className={styles.exitButton} onClick={goHome}>
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}