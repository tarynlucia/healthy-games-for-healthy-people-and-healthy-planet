import Head from "next/head";
import Layout from "../components/layouts/layout";
import { useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import styles from "./styles/home.module.css";

/*************************************************************************
 * Component: Home
 * Description: This is the home screen of the application. It provides
 * brief info about the project and lets the user navigate to the
 * calculator
 *************************************************************************/
const Home = () => {
  const router = useRouter();

  const onCalculatorClick = useCallback(() => {
    router.push("/mainFoodPage");
  }, [router]);

  return (
    <Layout>
      <div className={styles.home}>
        <div className={styles.homepagebackgroundframe}>
          <Image
            className={styles.homepagebackgroundimageIcon}
            alt=""
            src="/outsideLong.png"
            width={1920}
            height={1080}
          />
          <b className={styles.juniorOutdoorFoodContainer}>
            <p>Food<br></br>Calculator</p>
          </b>
        </div>
        <div className={styles.calculatorframe} onClick={onCalculatorClick}>
          <div>
            <div className={styles.calculatorbutton}>
              <Image
                className={styles.calculatoricon}
                alt=""
                src="/calculatorMascot.png"
                width={200}
                height={200}
              />
              <b className={styles.calculator}>Calculator</b>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
