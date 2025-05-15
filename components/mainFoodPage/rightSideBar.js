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
  const food_groups = foods.reduce((total, food) => {
    console.log("food.food_group:", food.food_group, "parsed:", parseFloat(food.food_group));
    return total + (parseFloat(food.food_group) || 0);
  }, 0);

  const water_footprint = foods.reduce((total, food) => total + (parseFloat(food.water_footprint) || 0), 0);
  const carbon_footprint = foods.reduce((total, food) => total + (parseFloat(food.carbon_footprint) || 0), 0);
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

  const uniqueFoodGroups = Array.from(
    new Set(
      foods
        .map((food) => food.food_group)
        .filter((group) => typeof group === "string")
        .map((group) => group.toLowerCase())
    )
  );

  console.log("Unique Food Groups:", uniqueFoodGroups);

  // Update food group image map for all groups
  const foodGroupImageMap = {
    fruit: "/foodPlate_fruitPlate.png",
    vegetable: "/foodPlate_vegetablePlate.png",
    grain: "/foodPlate_grainPlate.png",
    protein: "/foodPlate_proteinPlate.png",
    dairy: "/foodPlate_dairyPlate.png",
  };

  // Determine the image to display based on the first food group in the uniqueFoodGroups array
  const plateImage = uniqueFoodGroups
    .map((group) => foodGroupImageMap[group]) // Try to match food groups
    .find((image) => image); // Find the first valid image

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
        
        {/* Food Plate */}
        <div className={styles.tooltipContainer}>
          <div className={styles.imageContainer}>
            <Image
              className={styles.myPlateIcon}
              src="/foodPlate_names.png"
              alt="Food Plate"
              width={200}
              height={200}
              />
            {uniqueFoodGroups.includes("fruit") && (
            <Image
              className={styles.myPlateIcon}
              src="/foodPlate_fruitsPlate.png"
              alt="Fruit"
              width={200}
              height={200}
              />
            )}
            {uniqueFoodGroups.includes("vegetable") && (
            <Image
              className={styles.myPlateIcon}
              src="/foodPlate_vegetablesPlate.png"
              alt="Vegetable"
              width={200}
              height={200}
              />
            )}
            {uniqueFoodGroups.includes("grains") && (
            <Image
              className={styles.myPlateIcon}
              src="/foodPlate_grainsPlate.png"
              alt="Grain"
              width={200}
              height={200}
              />
            )}
            {uniqueFoodGroups.includes("protein") && (
            <Image
              className={styles.myPlateIcon}
              src="/foodPlate_proteinPlate.png"
              alt="Protein"
              width={200}
              height={200}
              />
            )}
            {uniqueFoodGroups.includes("dairy") && (
            <Image
              className={styles.myPlateIcon}
              src="/foodPlate_dairyPlate.png"
              alt="Dairy"
              width={200}
              height={200}
              />
            )}
          </div>
          <div className={styles.titleName}>
            Food Groups
            <span className={styles.tooltipText}>
              Ideally, include all 5 food groups in your meals.
            </span>
          </div>
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