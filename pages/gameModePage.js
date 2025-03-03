import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layouts/layout";
import styles from "./styles/gameModePage.module.css";

const GameModePage = () => {
  const router = useRouter();

  // Function to handle the mode selection
  const handleModeSelection = (mode) => {
    // Navigate to the game ranking page with the selected mode passed as a query parameter
    router.push({
      pathname: "/gameRankingPage", // Ensure this is the correct path to your Game Ranking page
      query: { mode: mode }, // Passing the selected mode as a query parameter
    });
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.modeBox}>
          <h2>Choose A Mode:</h2>
          <div className={styles.buttonContainer}>
            <button
              className={`${styles.modeButton} ${styles.carbonButton}`}
              onClick={() => handleModeSelection("Carbon")}
            >
              Carbon
            </button>
            <button
              className={`${styles.modeButton} ${styles.waterButton}`}
              onClick={() => handleModeSelection("Water")}
            >
              Water
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GameModePage;
