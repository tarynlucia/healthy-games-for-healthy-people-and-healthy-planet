/**
 * GameModePage Component
 * 
 * This page allows users to select a game mode: 
 * either "Carbon" or "Water" footprint ranking.
 * 
 * Key Features:
 * - Displays two buttons for mode selection.
 * - On selection, navigates to the GameRankingPage 
 *   and passes the chosen mode as a query parameter.
 * 
 */

import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layouts/layout";
import styles from "./styles/gameModePage.module.css";

const GameModePage = () => {
  const router = useRouter();

  // Function to handle the mode selection
  const handleModeSelection = (mode) => {
    console.log("Selected Mode:", mode);
    router.push({
      pathname: "/gameRankingPage",
      query: { mode: mode }  // Pass the mode as a query parameter
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