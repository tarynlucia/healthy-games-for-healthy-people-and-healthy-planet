import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layouts/layout";
import styles from "./styles/gameModePage.module.css";

const GameModePage = () => {
  const router = useRouter();

  // Function to handle the mode selection
  const handleModeSelection = (mode) => {
    // Store the selected mode (you can handle this as needed)
    // For example, send it to your backend or just use it for navigation
    console.log("Selected Mode:", mode);
    // Navigate to the ranking game page
    router.push("/gameRakingPage"); // Adjust to your actual ranking game page path
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
