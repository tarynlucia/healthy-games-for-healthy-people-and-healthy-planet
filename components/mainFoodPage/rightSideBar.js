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
  const water_footprint = foods.reduce((total, food) => total + parseFloat(food.water), 0);  // Calculate water footprint dynamically
  const carbon_footprint = foods.reduce((total, food) => total + parseFloat(food.carbon), 0);
  const stars_rating = foods.reduce((total, food) => total + parseFloat(food.stars), 0);

  // Determine which water image to display based on the water footprint value
  const getWaterImage = (water) => {
    if (water < 20) {
      return "/waterbottle.png";  // Low water footprint image
    } else if (water >= 20 && water < 50) {
      return "/waterbottle2.png";  // Medium water footprint image
    } else if (water >= 50 && water < 100) {
      return "/waterbottle3.png";  // High water footprint image (medium-high)
    } else {
      return "/waterbottle1.png";  // Very high water footprint image
    }
  };

  const getCarbonImage = (carbon) => {
    if (carbon < 20) {
      return "/gas-01.png";  // Low water footprint image
    } else if (carbon >= 20 && carbon < 50) {
      return "/waterbottle2.png";  // Medium water footprint image
    } else if (carbon >= 50 && carbon < 100) {
      return "/waterbottle3.png";  // High water footprint image (medium-high)
    } else {
      return "/gas-03.png";  // Very high water footprint image
    }
  };

  const getStarsImage = (star) => {
    if (star < 20) {
      return "/stars-01.png";  // Low water footprint image
    } else if (star >= 20 && star < 50) {
      return "/waterbottle2.png";  // Medium water footprint image
    } else if (star >= 50 && star < 100) {
      return "/waterbottle3.png";  // High water footprint image (medium-high)
    } else {
      return "/stars-11.png";  // Very high water footprint image
    }
  };

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
          src={getStarsImage(stars_rating)}
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