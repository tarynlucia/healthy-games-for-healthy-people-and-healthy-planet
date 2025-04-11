import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles/rightSideBar.module.css";
import {
  useCalculator,
  useCalculatorUpdate,
} from "../../context/calculatorContext";
import Image from "next/image";

/*************************************************************************
 * Component: CalculatorSideBar
 * Description: This component displays the calculator, which is a sidebar
 * that displays the foods that the user has selected for their
 * calculation. It has buttons to clear the calculator and to calculate
 *************************************************************************/
export default function RightSideBar({ onCalcClick }) {
  const foods = useCalculator();
  const calculatorFunctions = useCalculatorUpdate();
  const water_footprint = foods.reduce((total, food) => {
    console.log("food.water:", food.water, "parsed:", parseFloat(food.water));
    return total + (parseFloat(food.water) || 0);
  }, 0);
  
  const carbon_footprint = foods.reduce((total, food) => {
    console.log("food.carbon:", food.carbon, "parsed:", parseFloat(food.carbon));
    return total + (parseFloat(food.carbon) || 0);
  }, 0);
  
  const stars_rating = foods.reduce((total, food) => {
    console.log("food.stars:", food.stars, "parsed:", parseFloat(food.stars));
    return total + (parseFloat(food.stars) || 0);
  }, 0);
  
  
  // Determine which water image to display based on the water footprint value
  const getWaterImage = (water) => {
    if (water < 20) {
      return "/waterbottle.png";  
    } else if (water < 50) {
      return "/waterbottle1.png"; 
    } else if (water < 100) {
      return "/waterbottle2.png"; 
    } else if (water < 200) {
      return "/waterbottle3.png"; 
    } else if (water < 300) {
      return "/waterbottle4.png";  
    } else {
      return "/waterbottle5.png";  
    }
  };

  const getCarbonImage = (carbon) => {
    if (carbon < 20) {
      return "/gas-01.png";  
    } else if (carbon < 50) {
      return "/gas-02.png"; 
    } else if (carbon < 100) {
      return "/gas-03.png";  
    } else if (carbon < 200) {
      return "/gas-04.png";  
    } else if (carbon < 300) {
      return "/gas-05.png";  
    } else {
      return "/gas-06.png";  
    }
  };

  const getStarsImage = (stars_rating, foodsLength) => {
    if (foodsLength === 0) return "/stars-01.png"; // prevent division by zero
  
    const normalizedStar = stars_rating / foodsLength;
  
    if (normalizedStar <= 0.5) {
      return "/stars-02.png"; // 0 stars
    } else if (normalizedStar <= 1) {
      return "/stars-03.png"; // 0.5 stars
    } else if (normalizedStar <= 1.5) {
      return "/stars-04.png"; // 1 star
    } else if (normalizedStar <= 2) {
      return "/stars-05.png"; // 1.5 stars
    } else if (normalizedStar <= 2.5) {
      return "/stars-06.png"; // 2 stars
    } else if (normalizedStar <= 3) {
      return "/stars-07.png"; // 2.5 stars
    } else if (normalizedStar <= 3.5) {
      return "/stars-08.png"; // 3 stars
    } else if (normalizedStar <= 4) {
      return "/stars-09.png"; // 3.5 stars
    } else if (normalizedStar <= 4.5) {
      return "/stars-10.png"; // 4 stars
    } else {
      return "/stars-11.png"; // 5 stars
    }
  };
  
  console.log("Foods array:", foods);

  console.log("Water Footprint:", water_footprint);
  console.log("Carbon Footprint:", carbon_footprint);
  console.log("Stars Rating:", stars_rating);


  return (
    <div className={styles.calculatorsidebarframe}>
      <div className={styles.headers}>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&family=Nerko+One&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&family=Nerko+One&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"></link>
        <Image
          className={styles.myPlateIcon}
          src="/myPlate.png"
          alt={""}
          width={200}
          height={200}
        />
        <div className={styles.titleName}>
          Food Groups
          <div className={styles.tooltipContainer}>
            <Image
              className={styles.information}
              src="/information.png"
              alt={""}
              width={200}
              height={200}
            />  
            <span className={styles.tooltipText}>Ideally, include all 5 food groups in your meals.</span>
          </div>
        </div>
        <Image
          className={styles.waterIcon}
          src={getWaterImage(water_footprint)}
          alt={""}
          width={200}
          height={200}
        />
        <div className={styles.titleName}>
          Water Footprint
          <div className={styles.tooltipContainer}>
            <Image
              className={styles.information}
              src="/information.png"
              alt={""}
              width={200}
              height={200}
            />  
            <span className={styles.tooltipText}>Ideally, have a water footprint less than 50 gallons.</span>
          </div>
        </div>
        <Image
          className={styles.carbonIcon}
          src={getCarbonImage(carbon_footprint)}
          alt={""}
          width={200}
          height={200}
        />
        <div className={styles.titleName}>
          Carbon Footprint
          <div className={styles.tooltipContainer}>
            <Image
              className={styles.information}
              src="/information.png"
              alt={""}
              width={200}
              height={200}
            />  
            <span className={styles.tooltipText}>Ideally, have a carbon footprint less than 50 gallons.</span>
            </div>
        </div>
        <Image
          className={styles.starsIcon}
          src={getStarsImage(stars_rating, foods.length)}
          alt={""}
          width={200}
          height={200}
        />
        <div className={styles.titleName}>
          Rating
          <div className={styles.tooltipContainer}>
            <Image
              className={styles.information}
              src="/information.png"
              alt={""}
              width={200}
              height={200}
            />  
            <span className={styles.tooltipText}>Ideally, have a rating of 5 stars.</span>
          </div>
        </div>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&family=Nerko+One&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&family=Nerko+One&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"></link>
      </div>
    </div>
  );
}