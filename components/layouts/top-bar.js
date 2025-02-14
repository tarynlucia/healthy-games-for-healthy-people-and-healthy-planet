import { useRouter } from "next/router";
import { useCalculatorUpdate } from "../../context/calculatorContext";
import styles from "./styles/header-footer.module.css";

import Image from "next/image";

/*************************************************************************
 * Component: TopBar
 * Description: This component renders the header that will appear on
 * every page in the application
 *************************************************************************/
function TopBar() {
  const router = useRouter();
  const calculatorFunctions = useCalculatorUpdate();

  // const handleInformationClick = () => {
  //   // Use the router to navigate to the information page or handle it as needed
  //   router.push("/information");
  // };

  const handleHomeClick = () => {
    // Clear the calculator state when the home button is clicked
    calculatorFunctions.onClearCalculator();

    // Use the router to navigate to the home page
    router.push("/");
  };

  return (
    <div className={styles.headerframe}>
      <a
        href="https://oregonstate.edu/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.osuLink}
      >
        <Image
          className={styles.oregonstateuniversityicon}
          width={480}
          height={10}
          alt=""
          src="/OSU_logo.png"
        />
      </a>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
      <link href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&family=Nerko+One&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&family=Nerko+One&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"></link>
      <div className={styles.navBarOptions}>
        <a href="#">Game</a>
        <a href="#">How To</a>
        <a href="#">Dictionary</a>
        {router.pathname !== "/" && (
          <div className={styles.homebutton} onClick={handleHomeClick}>
            <b>Home</b>
          </div>
        )}
      </div>
    </div>
  );

  
}

export default TopBar;
