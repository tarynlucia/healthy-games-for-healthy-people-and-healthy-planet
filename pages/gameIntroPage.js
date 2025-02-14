import { useRouter } from "next/router";
import Layout from "../components/layouts/layout"; // Assuming you still want to include the Layout component
import styles from "./styles/gameIntroPage.module.css";

const GameIntroPage = () => {
  const router = useRouter();

  // Redirect to the next page when the button is clicked
  const onStartGameClick = () => {
    router.push("/gameModePage"); // Redirect to the actual game page
  };

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <header className={styles.header}>
        </header>
        
        <div className={styles.mainContent}>
          <div className={styles.titleBox}>
            <h2>Foorpint Test Game</h2>
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
