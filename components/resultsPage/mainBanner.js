import React, { useState } from "react";
import ColorMeter from "./colorMeter";
import Image from "next/image";

import styles from "../../pages/styles/resultsPage.module.css";


const MainBanner = ({ foods, numOfStars, servingSizeConversion }) => {
  const [isDropdownCollapsed, setIsDropdownCollapsed] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownCollapsed(!isDropdownCollapsed);
  };

  const maxStars = 5;
  const starPercentage = (numOfStars / maxStars) * 100;
 
  const totalStarsText = `${Math.round(numOfStars * 2) / 2}/${maxStars} Stars`;

  function TotalWaterFootprint() {
    let totalGallons = 0;
    foods.forEach((food) => {
      totalGallons += servingSizeConversion(
        food.serving_size,
        food.serving_amount,
        food.water_footprint
      );
    });
    let roundedWater = Math.round(totalGallons * 100) / 100;
    return roundedWater;
  }
  function TotalCarbonFootprint() {
    let totalCarbon = 0;
    foods.forEach((food) => {
      totalCarbon  += servingSizeConversion(
        food.serving_size,
        food.serving_amount,
        food.carbon_footprint
      );
    });
    let roundedCarbon = Math.round(totalCarbon * 100) / 100;
    return roundedCarbon;
  }

  function TotalDiversity() {
    let uniqueGroups = new Set();
    let totalGroups = 0;
    foods.forEach((food) => {
      console.log("Food", food);
      console.log("Food Group:", food.food_group);
        // If the food group is not already added, add it and increment the counter
        if (!uniqueGroups.has(food.food_group)) {
          uniqueGroups.add(food.food_group);
          totalGroups += 1;
        }
      
    });
  
    return totalGroups; // Return the count of unique food groups
}
function getEnvironmentalImpact() {
  let totalWater = 0;
  let totalCarbon = 0;

  foods.forEach((food) => {
    totalWater += servingSizeConversion(
      food.serving_size,
      food.serving_amount,
      food.water_footprint
    );

    totalCarbon += servingSizeConversion(
      food.serving_size,
      food.serving_amount,
      food.carbon_footprint
    );
  });

  let roundedWaterVal = Math.round(totalWater * 100) / 100;
  let roundedCarbonVal = Math.round(totalCarbon * 100) / 100;

  // Water comparison
  let easy_water_comparison = "";
  if (Math.round(roundedWaterVal / 60) === 1) {
    easy_water_comparison = "That's like filling up 1 bathtub!";
  } else {
    easy_water_comparison = `That's like filling up ${Math.round(roundedWaterVal / 60)} bathtubs!`;
  }

  // Carbon comparison
  let easy_carbon_comparison = "";
  if (Math.round(roundedCarbonVal / 567) === 1) {
    easy_carbon_comparison = "That's like being on the school bus for 1 minute!";
  } else {
    easy_carbon_comparison = `That's like being on the school bus for ${Math.round(roundedCarbonVal / 567)} minutes!`;
  }

  return {
    water: roundedWaterVal,
    waterText: easy_water_comparison,
    carbon: roundedCarbonVal,
    carbonText: easy_carbon_comparison
  };
}

const { water, waterText, carbon, carbonText } = getEnvironmentalImpact();

const getWaterImage = (water) => {
  if (water < 13.2) return "/waterbottle.png";
  if (water < 52.83) return "/waterbottle1.png";
  if (water < 105.6) return "/waterbottle2.png";
  if (water < 211.33) return "/waterbottle3.png";
  if (water < 264.17) return "/waterbottle4.png";
  return "/waterbottle5.png";
};

const getCarbonImage = (carbon) => {
  if (carbon < 100) return "/gas-01.png";
  if (carbon < 500) return "/gas-02.png";
  if (carbon < 1000) return "/gas-03.png";
  if (carbon < 1500) return "/gas-04.png";
  if (carbon < 2000) return "/gas-05.png";
  return "/gas-06.png";
};

const getStarsImage = (stars, foodLength) => {
  const avg = Math.round(numOfStars * 2) / 2;
  if (avg <= 0.5) return "/stars-02.png";
  if (avg <= 1) return "/stars-03.png";
  if (avg <= 1.5) return "/stars-04.png";
  if (avg <= 2) return "/stars-05.png";
  if (avg <= 2.5) return "/stars-06.png";
  if (avg <= 3) return "/stars-07.png";
  if (avg <= 3.5) return "/stars-08.png";
  if (avg <= 4) return "/stars-09.png";
  if (avg <= 4.5) return "/stars-10.png";
  return "/stars-11.png";
};

const foodGroupImageMap = {
  fruit: "/foodPlate_fruitsPlate.png",
  vegetable: "/foodPlate_vegetablesPlate.png",
  grains: "/foodPlate_grainsPlate.png",
  grain: "/foodPlate_grainsPlate.png",
  protein: "/foodPlate_proteinPlate.png",
  dairy: "/foodPlate_dairyPlate.png",
};

// Get unique food groups in lowercase
const uniqueFoodGroups = Array.from(
  new Set(
    foods
      .map((food) => food.food_group)
      .filter((group) => typeof group === "string")
      .map((group) => group.toLowerCase())
  )
);

  return (
    <div>
      <button className={styles.dropdownButton} onClick={toggleDropdown}>
        Your Meal
        <span className={`${styles.arrow} ${isDropdownCollapsed ? "" : styles.collapsed}`}>
          ▼
        </span>
      </button>
      {/* Dropdown Content */}
      <div className={`${styles.dropdownSection} ${isDropdownCollapsed ? styles.hidden : ""}`}>
        <div className={styles.dropdownContent}>
          <div className={styles.dropdownColumn}>
          <div className={styles.tooltipContainer}>
          <div className={styles.myPlateContainer}>
  {/* Base plate image with labels */}
  <Image
    className={styles.plateLayer}
    src="/foodPlate_names.png"
    alt="Food Plate"
    width={200}
    height={200}
  />

  {/* Conditional overlays */}
  {uniqueFoodGroups.includes("fruit") && (
    <Image
      className={styles.plateLayer}
      src="/foodPlate_fruitsPlate.png"
      alt="Fruit"
      width={200}
      height={200}
    />
  )}
  {uniqueFoodGroups.includes("vegetable") && (
    <Image
      className={styles.plateLayer}
      src="/foodPlate_vegetablesPlate.png"
      alt="Vegetable"
      width={200}
      height={200}
    />
  )}
  {uniqueFoodGroups.includes("grains") && (
    <Image
      className={styles.plateLayer}
      src="/foodPlate_grainsPlate.png"
      alt="Grains"
      width={200}
      height={200}
    />
  )}
  {uniqueFoodGroups.includes("protein") && (
    <Image
      className={styles.plateLayer}
      src="/foodPlate_proteinPlate.png"
      alt="Protein"
      width={200}
      height={200}
    />
  )}
  {uniqueFoodGroups.includes("dairy") && (
    <Image
      className={styles.plateLayer}
      src="/foodPlate_dairyPlate.png"
      alt="Dairy"
      width={200}
      height={200}
    />
  )}
</div>
        </div>
          <div>Diversity: {TotalDiversity()}/5  group(s)
          <div className={styles.tooltipContainer}>
            <Image
            className={styles.information}
            src="/information.png"
            alt="info"
             width={15} height={15}/>
             <span className={styles.tooltipText}> Ideally, have all 5 groups. </span>
             </div>
             </div>
             <span style={{ fontWeight: "normal", fontSize: "13px", visibility: "hidden" }}>placeholder</span>
             </div>
          

  <div className={styles.dropdownColumn}>
  <Image src={getWaterImage(water)} alt="Water Footprint" width={40} height={100} />
  <div>Water Footprint: {water} gallon(s)
  <div className={styles.tooltipContainer}>
    <Image
      className={styles.information}
      src="/information.png"
      alt="info"
      width={15} height={15}
    />
    <span className={styles.tooltipText}>
    Ideally, have a water footprint less than 400 gallons.
    </span>
    </div>
    </div>
  <div style={{ fontWeight: "normal", fontSize: "13px" }}>{waterText}</div>
</div>

<div className={styles.dropdownColumn}>
  <Image src={getCarbonImage(carbon)} alt="Carbon Footprint" width={100} height={100} />
  <div>Carbon Footprint: {carbon} grams
  <div className={styles.tooltipContainer}>
    <Image
      className={styles.information}
      src="/information.png"
      alt="info"
      width={15}
      height={15}
    />
    <span className={styles.tooltipText}>
      Ideally, have a carbon footprint less than 500 grams.
    </span>
    </div>
    </div>
  <span style={{ fontWeight: "normal", fontSize: "13px" }}>{carbonText}</span>
</div>

<div className={styles.dropdownColumn}>
  <Image src={getStarsImage(numOfStars, foods.length)} alt="Star Rating" width={100} height={100} />
  <div>Nutrition: {totalStarsText}
  <div className={styles.tooltipContainer}>
    <Image
      className={styles.information}
      src="/information.png"
      alt="info"
      width={15}
      height={15}
    />
    <span className={styles.tooltipText}>
    Ideally, have a rating of 5 stars.
    </span>
    </div>
  </div>
  <span style={{ fontWeight: "normal", fontSize: "13px", visibility: "hidden" }}>placeholder</span>
</div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;

