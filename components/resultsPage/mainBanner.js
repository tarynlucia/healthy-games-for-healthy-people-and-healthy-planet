import React, { useState } from "react";
import ColorMeter from "./colorMeter";
import Image from "next/image";

import styles from "../../pages/styles/resultsPage.module.css";

const MainBanner = ({ foods, numOfStars, servingSizeConversion }) => {
  const [isDropdownCollapsed, setIsDropdownCollapsed] = useState(true);

  const toggleDropdown = () => {
    setIsDropdownCollapsed(!isDropdownCollapsed);
  };

  const maxStars = 5;
  const starPercentage = (numOfStars / maxStars) * 100;
  /*
  let color;
  if (starPercentage <= 19) {
    color = "red";
  } else if (starPercentage <= 39) {
    color = "orange";
  } else if (starPercentage <= 59) {
    color = "yellow";
  } else if (starPercentage <= 79) {
    color = "lightgreen";
  } else {
    color = "green";
  }
*/
  const totalStarsText = `${Math.floor(numOfStars)}/${maxStars} Stars`;

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
          <div className={styles.dropdownColumn}>Diversity🥗: {TotalDiversity()} group(s)</div>
          <div className={styles.dropdownColumn}>Water Footprint💧: {TotalWaterFootprint()} gallons</div>
          <div className={styles.dropdownColumn}>Carbon Footprint💨: {TotalCarbonFootprint()} gallons</div>
          <div className={styles.dropdownColumn}>Nutrition⭐: {totalStarsText}</div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;

