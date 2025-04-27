/**
 * GameIntroPage Component
 * 
 * This page serves as the introduction to the Footprint Test Game.
 * 
 * Key Features:
 * - Displays the game title and a "Start Game" button.
 * - On clicking "Start Game," navigates the user to the GameModePage
 * 
 */

import { useRouter } from "next/router";
import Layout from "../components/layouts/layout"; // Assuming you still want to include the Layout component
import styles from "./styles/gameIntroPage.module.css";

const GameIntroPage = () => {
  const router = useRouter();

  const onStartGameClick = () => {
    const button = document.querySelector(`.${styles.startButton}`);
      router.push("/gameModePage"); // Redirect to the actual game page
  };

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <header className={styles.header}>
        </header>
        
        <div className={styles.mainContent}>
          <div className={styles.titleBox}>
            <h2>Footprint Test Game</h2>
          </div>
          
          <button className={styles.startButton} onClick={onStartGameClick}>
            Start Game
          </button>
        </div>

        <footer className={styles.footer}>
        </footer>
      </div>
    </Layout>
  );
};

export default GameIntroPage;
