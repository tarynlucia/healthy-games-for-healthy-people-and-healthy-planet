import Head from "next/head";
import Layout from "../components/layouts/landing-layout";
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
            alt="Background Image"
            src="/outsideLong.png"
            width={1920}
            height={1080}
          />
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
          <link href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&family=Nerko+One&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&family=Nerko+One&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"></link>
          <b className={styles.juniorOutdoorFoodContainer}>
            <p>Food<br></br>Calculator</p>
          </b>
        </div>
        <Image
          className={styles.pepper}
          alt="Pepper"
          src="/pepper.png"
          width={175}
          height={160}
        />
        <Image
          className={styles.pizza}
          alt="Pizza"
          src="/pizza.png"
          width={175}
          height={160}
        />
        <Image
          className={styles.carrot}
          alt="Carrot"
          src="/carrot.png"
          width={175}
          height={160}
        />
        <Image
          className={styles.watermelon}
          alt="Watermelon"
          src="/watermelon.png"
          width={175}
          height={160}
        />
        <Image
          className={styles.apple}
          alt="Apple"
          src="/apple.png"
          width={175}
          height={160}
        />
        <Image
          className={styles.cookie}
          alt="Cookie"
          src="/cookie.png"
          width={175}
          height={160}
        />
        <Image
          className={styles.eggplant}
          alt="Eggplant"
          src="/eggplant.png"
          width={175}
          height={160}
        />
        <div className={styles.calculatorframe} onClick={onCalculatorClick}>
          <div>
            <div className={styles.calculatorbutton}>
              <Image
                className={styles.calculatoricon}
                alt="Calculator"
                src="/rotatedCalculator.png"
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
