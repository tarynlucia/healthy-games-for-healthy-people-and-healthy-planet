import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles/rightSideBar.module.css";
import {
  useCalculator,
  useCalculatorUpdate,
} from "../../context/calculatorContext";
import Image from "next/image";

export default function RightSideBar({ onCalcClick }) {
  const foods = useCalculator();
  const calculatorFunctions = useCalculatorUpdate();

  const water_footprint = foods.reduce((total, food) => total + (parseFloat(food.water) || 0), 0);
  const carbon_footprint = foods.reduce((total, food) => total + (parseFloat(food.carbon) || 0), 0);
  const stars_rating = foods.reduce((total, food) => total + (parseFloat(food.stars) || 0), 0);

  const getWaterImage = (water) => {
    if (water < 20) return "/waterbottle.png";
    if (water < 50) return "/waterbottle1.png";
    if (water < 100) return "/waterbottle2.png";
    if (water < 200) return "/waterbottle3.png";
    if (water < 300) return "/waterbottle4.png";
    return "/waterbottle5.png";
  };

  const getCarbonImage = (carbon) => {
    if (carbon < 20) return "/gas-01.png";
    if (carbon < 50) return "/gas-02.png";
    if (carbon < 100) return "/gas-03.png";
    if (carbon < 200) return "/gas-04.png";
    if (carbon < 300) return "/gas-05.png";
    return "/gas-06.png";
  };

  const getStarsImage = (stars_rating, foodsLength) => {
    if (foodsLength === 0) return "/stars-01.png";
    const normalizedStar = stars_rating / foodsLength;
    if (normalizedStar <= 0.5) return "/stars-02.png";
    if (normalizedStar <= 1) return "/stars-03.png";
    if (normalizedStar <= 1.5) return "/stars-04.png";
    if (normalizedStar <= 2) return "/stars-05.png";
    if (normalizedStar <= 2.5) return "/stars-06.png";
    if (normalizedStar <= 3) return "/stars-07.png";
    if (normalizedStar <= 3.5) return "/stars-08.png";
    if (normalizedStar <= 4) return "/stars-09.png";
    if (normalizedStar <= 4.5) return "/stars-10.png";
    return "/stars-11.png";
  };

  return (
    <div className={styles.calculatorsidebarframe}>
      <div className={styles.headers}>
        {/* Food Groups */}
        <div className={styles.tooltipContainer}>
          <Image
            className={styles.myPlateIcon}
            src="/myPlate.png"
            alt=""
            width={200}
            height={200}
          />
          <div className={styles.titleName}>
            Food Groups
            {/* <Image
              className={styles.information}
              src="/information.png"
              alt=""
              width={200}
              height={200}
            /> */}
          </div>
          <span className={styles.tooltipText}>
            Ideally, include all 5 food groups in your meals.
          </span>
        </div>

        {/* Water Footprint */}
        <div className={styles.tooltipContainer}>
          <Image
            className={styles.waterIcon}
            src={getWaterImage(water_footprint)}
            alt=""
            width={200}
            height={200}
          />
          <div className={styles.titleName}>
            Water Footprint
            {/* <Image
              className={styles.information}
              src="/information.png"
              alt=""
              width={200}
              height={200}
            /> */}
          </div>
          <span className={styles.tooltipText}>
            Ideally, have a water footprint less than 50 gallons.
          </span>
        </div>

        {/* Carbon Footprint */}
        <div className={styles.tooltipContainer}>
          <Image
            className={styles.carbonIcon}
            src={getCarbonImage(carbon_footprint)}
            alt=""
            width={200}
            height={200}
          />
          <div className={styles.titleName}>
            Carbon Footprint
            {/* <Image
              className={styles.information}
              src="/information.png"
              alt=""
              width={200}
              height={200}
            /> */}
          </div>
          <span className={styles.tooltipText}>
            Ideally, have a carbon footprint less than 50 gallons.
          </span>
        </div>

        {/* Stars Rating */}
        <div className={styles.tooltipContainer}>
          <Image
            className={styles.starsIcon}
            src={getStarsImage(stars_rating, foods.length)}
            alt=""
            width={200}
            height={200}
          />
          <div className={styles.titleName}>
            Rating
            {/* <Image
              className={styles.information}
              src="/information.png"
              alt=""
              width={200}
              height={200}
            /> */}
          </div>
          <span className={styles.tooltipText}>
            Ideally, have a rating of 5 stars.
          </span>
        </div>
      </div>
    </div>
  );
}