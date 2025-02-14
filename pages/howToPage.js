import Layout from "../components/layouts/layout";

import styles from "./styles/howToPage.module.css";

/*************************************************************************
 * Component: How-To
 * Description: This is a place holder for the How To page. This page
 * provides instructions on how the user can navigate through the
 * calculator
 *************************************************************************/
const HowToPage = () => {
  return (
    <Layout>
      <div className={styles.layout}>
        <p>Insert user instruction manual for navigating the web application</p>
      </div>
    </Layout>
  );
};

export default HowToPage; 