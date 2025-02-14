import Layout from "../components/layouts/layout";

import styles from "./styles/dictionaryPage.module.css";

/*************************************************************************
 * Component: Dictionary
 * Description: This is a place holder for the Dictionary page. This page
 * provides vocabulary words used throughout the application and defines
 * them for clarity and educational purposes.
 *************************************************************************/
const HowToPage = () => {
  return (
    <Layout>
      <div className={styles.layout}>
        <p>Insert dictionary containing web application vocabulary and their definitions</p>
      </div>
    </Layout>
  );
};

export default HowToPage; 