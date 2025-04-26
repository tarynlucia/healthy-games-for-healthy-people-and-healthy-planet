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
    easy_water_comparison = "(That's like filling up 1 bathtub!)";
  } else {
    easy_water_comparison = `(That's like filling up ${Math.round(roundedWaterVal / 60)} bathtubs!)`;
  }

  // Carbon comparison
  let easy_carbon_comparison = "";
  if (Math.round(roundedCarbonVal / 567) === 1) {
    easy_carbon_comparison = "(That's like being on the school bus for 1 minute!)";
  } else {
    easy_carbon_comparison = `(That's like being on the school bus for ${Math.round(roundedCarbonVal / 567)} minutes!)`;
  }

  return {
    water: roundedWaterVal,
    waterText: easy_water_comparison,
    carbon: roundedCarbonVal,
    carbonText: easy_carbon_comparison
  };
}

const { water, waterText, carbon, carbonText } = getEnvironmentalImpact();

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
          <div className={styles.dropdownColumn}>Diversity 🥗: {TotalDiversity()} group(s)</div>
          <div className={styles.dropdownColumn}><div>Water Footprint 💧: {water} gallons</div>
          <div style={{ fontWeight: "normal", fontSize: "16px" }}>{waterText}</div>
          </div>
          <div className={styles.dropdownColumn}>Carbon Footprint 💨: {carbon} kg<br />
          <span style={{ fontWeight: "normal", fontSize: "16px" }}>{carbonText}</span>
          </div>
          <div className={styles.dropdownColumn}>Nutrition ⭐: {totalStarsText}</div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;

