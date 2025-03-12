import { useState, useCallback, useEffect } from "react";
import { supabase } from "../lib/initSupabase";
import { useRouter } from "next/router";

import {
  useCalculator,
  useCalculatorUpdate,
} from "../context/calculatorContext";

import MainBanner from "../components/resultsPage/mainBanner";
import Layout from "../components/layouts/layout";
import CookedRawDropDown from "../components/resultsPage/cookedRawDropdown";
import FoodCards from "../components/resultsPage/foodCards";
import TotalStarsCalculation from "../components/resultsPage/starRating";
import ServingSizeSelection from "../components/resultsPage/servingSizeSelection";
import ServingAmountSelection from "../components/resultsPage/servingAmountSelection";
import Image from "next/image";
import colorStyles from "../components/resultsPage/styles/colorMeter.module.css";

import styles from "./styles/resultsPage.module.css";

/*************************************************************************
 * Component: ResultsPage
 * Description: This component displays the carbon/water/nutrition
 * results for each food that the user selected in the calculator.
 *************************************************************************/
const ResultsPage = () => {
  const router = useRouter();

  const calculatorItems = useCalculator();
  const calculatorFunctions = useCalculatorUpdate();

  const [informationCards, setInformationCards] = useState([]);
  const [totalStars, setTotalStars] = useState(0);
  //const [cookedFilter, setCookedRawFilter] = useState("all");

  const onBackClick = useCallback(() => {
    router.push("/mainFoodPage");
  }, [router]);

  const onNewCalcClick = useCallback(() => {
    calculatorFunctions.onClearCalculator();
    router.push("/mainFoodPage");
  }, [calculatorFunctions, router]);

  //function to fetch foods with color information
  const fetchData = async () => {
    try {
      //function in database to fetch foods with color information
      const { data, error } = await supabase.rpc("test_allinfo");

      if (error) {
        throw error;
      }
      console.log("RESULTS PAGE food data: ", calculatorItems);
      //map each food to its own object
      const informationArray = data.map((food) => ({
        id: food.id,
        name: food.food_name,
        carbon_footprint: food.carbon_footprint,
        carbon_footprint_rating: food.carbon_footprint_rating,
        water_footprint: food.water_footprint,
        facts: food.facts,
        stars: food.nutrition_stars,
        food_group: food.food_group,
        serving_size: "half_cup",
        serving_amount: 1,
      }));
      const completeInfo = informationArray.filter((info) =>
        calculatorItems.some((item) => item.id === info.id)
      );

      //iterate over each food in completeInfo arra. Add stars to the the total, with total starting at 0
      const allStars = completeInfo.reduce(
        (total, info) => total + info.stars,
        0
      );

      // Calculate the average and ensure it's capped at 5
      const averageStars = Math.min(allStars / completeInfo.length, 5);

      // Set the average stars to the state
      setTotalStars(averageStars);

      //make a mapping between id and image paths to be able to add image paths to the foods field
      //this could be fixed later by adding image paths to the database
      const mapBetweenIdsandPaths = {};
      for (const item of calculatorItems) {
        mapBetweenIdsandPaths[item.id] = item.imagePath;
      }
      const completeInfoWithImagePath = completeInfo.map((info) => {
        const itemWithPath = { ...info };
        itemWithPath.imagePath = mapBetweenIdsandPaths[info.id];
        return itemWithPath;
      });
      setInformationCards(completeInfoWithImagePath);
      console.log("Information Array", completeInfoWithImagePath);
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const onCookedRawDropdownFrameContainerClick = useCallback((val) => {
  //   //sync to proj
  //   setCookedRawFilter(val);
  // }, []);

  const updateServingSize = (foodId, servingSize) => {
    const updatedCards = informationCards.map((card) => {
      if (card.id === foodId) {
        return { ...card, serving_size: servingSize };
      } else {
        return card;
      }
    });
    setInformationCards(updatedCards);
  };

  const updateServingAmount = (foodId, servingAmount) => {
    const updatedCards = informationCards.map((card) => {
      if (card.id === foodId) {
        return { ...card, serving_amount: servingAmount };
      } else {
        return card;
      }
    });
    setInformationCards(updatedCards);
  };

  function servingSizeConversion(servingSize, servingAmount, waterFootprint, carbonFootprint) {
    let finalVal = 0;
    //this switch case finds how big the servingsize is in comparison to a half cup
    switch (servingSize) {
      case "half_teaspoon":
        finalVal = 1 / 48;
        break;
      case "teaspoon":
        finalVal = 1 / 24;
        break;
      case "tablespoon":
        finalVal = 1 / 8;
        break;
      case "third_cup":
        finalVal = 2 / 3;
        break;
      case "half_cup":
        finalVal = 1;
        break;
      case "cup":
        finalVal = 2;
        break;
      default:
        finalVal = 1;
    }
    finalVal *= servingAmount;
    let roundedWaterVal = Math.round(finalVal * waterFootprint * 100) / 100;
    let roundedCarbonVal = Math.round(finalVal * carbonFootprint * 100) / 100;

    let easy_water_comparison = "";
    let easy_carbon_comparison = "";

    return roundedWaterVal;

    /*

    easy_water_comparison = "That's like showering for " + Math.round(roundedWaterVal / 2.5) + " minutes!";
    easy_carbon_comparison = "That's like driving " + Math.round(roundedCarbonVal / 0.0757576) + " feet!";
    return { gallons: roundedWaterVal, easy_water_comparison: easy_water_comparison, carbon: roundedCarbonVal, easy_carbon_comparison: easy_carbon_comparison };

    */

    // Older comparisons/real-world metrics below. May incorporate in the future. 
    if (roundedWaterVal < 60) {
      easy_water_comparison = "That's like flushing a toilet " + Math.round(roundedWaterVal / 1.6) + " times!";
    }
    else if (roundedWaterVal < 3600) {
      easy_water_comparison = "That's like filling up " + Math.round(roundedWaterVal / 60) + " bathtubs!";
    }
    else if (roundedWaterVal < 18000) {
      easy_water_comparison = "That's like showering for " + Math.round(roundedWaterVal / 3600) + " whole days!";
    }
    else {
      easy_water_comparison = "That's like filling up " + Math.round(roundedWaterVal / 18000) + " swimming pools! ";
    }

    easy_water_comparison = "That's like flushing a toilet " + Math.round(roundedWaterVal / 1.6) + " times!";



    return { gallons: roundedWaterVal, easy_water_comparison: easy_water_comparison };
  }

  function each_servingSizeConversion(servingSize, servingAmount, waterFootprint, carbonFootprint) {
    let finalVal = 0;
    //this switch case finds how big the servingsize is in comparison to a half cup
    switch (servingSize) {
      case "half_teaspoon":
        finalVal = 1 / 48;
        break;
      case "teaspoon":
        finalVal = 1 / 24;
        break;
      case "tablespoon":
        finalVal = 1 / 8;
        break;
      case "third_cup":
        finalVal = 2 / 3;
        break;
      case "half_cup":
        finalVal = 1;
        break;
      case "cup":
        finalVal = 2;
        break;
      default:
        finalVal = 1;
    }
    finalVal *= servingAmount;
    let roundedWaterVal = Math.round(finalVal * waterFootprint * 100) / 100;
    let roundedCarbonVal = Math.round(finalVal * carbonFootprint * 100) / 100;

    let easy_water_comparison = "";
    let easy_carbon_comparison = "";

    // easy_water_comparison = "That's like showering for " + Math.round(roundedWaterVal / 2.5) + " minutes!";
    if (Math.round(roundedWaterVal / 60) == 1) {
      easy_water_comparison = "That's like filling up " + Math.round(roundedWaterVal / 60) + " bathtub!";
    }
    else {
      easy_water_comparison = "That's like filling up " + Math.round(roundedWaterVal / 60) + " bathtubs!";
    }
    if (Math.round(roundedCarbonVal / 567) == 1) {
      easy_carbon_comparison = "That's like being on the school bus for " + Math.round(roundedCarbonVal / 567) + " minute!";
    }
    else {
      easy_carbon_comparison = "That's like being on the school bus for " + Math.round(roundedCarbonVal / 567) + " minutes!";
    }
    return { gallons: roundedWaterVal, easy_water_comparison: easy_water_comparison, carbon: roundedCarbonVal, easy_carbon_comparison: easy_carbon_comparison };


    // Alternative conversion, using balloons full of CO2 as a metric. 

    if (Math.round(roundedCarbonVal / 30) == 1) {
      easy_carbon_comparison = "That's like filling up " + Math.round(roundedCarbonVal / 30) + " balloon with CO₂!";
    }
    else {
      easy_carbon_comparison = "That's like filling up " + Math.round(roundedCarbonVal / 30) + " balloons with CO₂!";
    }
    return { gallons: roundedWaterVal, easy_water_comparison: easy_water_comparison, carbon: roundedCarbonVal, easy_carbon_comparison: easy_carbon_comparison };



    // Older comparisons/real-world metrics below. May incorporate in the future. 
    if (roundedWaterVal < 60) {
      easy_water_comparison = "That's like flushing a toilet " + Math.round(roundedWaterVal / 1.6) + " times!";
    }
    else if (roundedWaterVal < 3600) {
      easy_water_comparison = "That's like filling up " + Math.round(roundedWaterVal / 60) + " bathtubs!";
    }
    else if (roundedWaterVal < 18000) {
      easy_water_comparison = "That's like showering for " + Math.round(roundedWaterVal / 3600) + " whole days!";
    }
    else {
      easy_water_comparison = "That's like filling up " + Math.round(roundedWaterVal / 18000) + " swimming pools! ";
    }

    easy_water_comparison = "That's like flushing a toilet " + Math.round(roundedWaterVal / 1.6) + " times!";



    return { gallons: roundedWaterVal, easy_water_comparison: easy_water_comparison };
  }

  // Define some sample colors
  const colors = ["#FF0000", "#FFA500", "#FFFF00", "#90EE90", "#008000"];
  // Define corresponding values (just for demonstration)
  const values = [1, 2, 3, 4, 5]; // These values should add up to 100%

  // Calculate total value
  const totalValue = values.reduce((acc, value) => acc + value, 0);

  return (
    <Layout>
      {/* THIS IS FOR THE TOP BAR W/ BACK BUTTON AND NEW CALCULATION BUTTON*/}
      <div className={styles.resultsContainer}>
        <div style={{ marginLeft: "1%" }} className={styles.topBtnBar}>
          <div onClick={onBackClick}>
            <div className={styles.topBtnsBar}>
              <b>⬅ Back</b>
            </div>
            {/* we have to make sure the data between the mainFoodPage and resultsPage is consistent/same */}
          </div>

          <div className={styles.topBtnBarSubDiv}>
            <div className={styles.topBtnsBar} onClick={onBackClick}>
              <b onClick={onNewCalcClick}>
                New Calculation
              </b>
            </div>
          </div>
        </div>
        {/* Color bar legend 
        <div className={styles.legend}>
          <p className={styles.legendText}>Star Ratings:</p>
          <div className={styles.legendItems}>
            <div className={styles.legendItem}>
              <div
                className={styles.legendColor}
                style={{ backgroundColor: colors[0] }}
              ></div>
              <p className={styles.legendDescription}>{"<"} 20% of Stars</p>
            </div>
            <div className={styles.legendItem}>
              <div
                className={styles.legendColor}
                style={{ backgroundColor: colors[1] }}
              ></div>
              <p className={styles.legendDescription}>{"<"} 40% of Stars</p>
            </div>
            <div className={styles.legendItem}>
              <div
                className={styles.legendColor}
                style={{ backgroundColor: colors[2] }}
              ></div>
              <p className={styles.legendDescription}>{"<"} 60% of Stars</p>
            </div>
            <div className={styles.legendItem}>
              <div
                className={styles.legendColor}
                style={{ backgroundColor: colors[3] }}
              ></div>
              <p className={styles.legendDescription}>{"<"} 80% of Stars</p>
            </div>
            <div className={styles.legendItem}>
              <div
                className={styles.legendColor}
                style={{ backgroundColor: colors[4] }}
              ></div>
              <p className={styles.legendDescription}>{">"} 80% of Stars</p>
            </div>
          </div>
        </div>
*/}
        {/* Color bar 
        <div className={styles.colorDisplay}>
          {values.map((value, index) => (
            <div
              key={index}
              className={styles.colorSegment}
              style={{
                backgroundColor: colors[index],
                width: `${(value / totalValue) * 100}%`,
              }}
            ></div>
          ))}
        </div>
        */}

        {/*THIS IS TO GO THROUGH EACH CALCULATED FOOD AND DISPLAY IT IN THE FOODRESULT COMPONENT*/}

        {/* <ColorDisplay colors={colors} values={values} /> */}
        <MainBanner
          foods={informationCards}
          numOfStars={totalStars}
          servingSizeConversion={servingSizeConversion}
          maxStars={informationCards.length * 5}
        />

        <div className={styles.individualResultsContainer}>
          {informationCards.map((card) => (
            <FoodResult
              key={card.id}
              currentFood={card}
              updateServingSize={updateServingSize}
              updateServingAmount={updateServingAmount}
              each_servingSizeConversion={each_servingSizeConversion}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

function FoodResult({
  currentFood,
  updateServingSize,
  updateServingAmount,
  each_servingSizeConversion,
}) {
  //this function returns how many half cups the amount is that the user inputs

  function ChooseColor(carbonRating) {
    switch (carbonRating) {
      case "very low":
        return { color: "lightgreen" };
      case "low":
        return { color: "greenyellow" };
      case "medium":
        return { color: "orange" };
      case "high":
        return { color: "red" };
      default:
        return { color: "black" };
    }
  }

  const water_carbon_Data = each_servingSizeConversion(
    currentFood.serving_size,
    currentFood.serving_amount,
    currentFood.water_footprint,
    currentFood.carbon_footprint
  );

  return (
    <div className={styles.individualResultsCard}>
      <div className={styles.imageAndFoodName}>
        <Image
          src={`/${currentFood.imagePath}`}
          alt={currentFood.name}
          width={470}
          height={520}
        />
        <h2 className={styles.currentFoodName}>{currentFood.name}</h2>
      </div>
      <div className={styles.AmountAndFootprint}>
        <div className={styles.amountBox}>
          <p className={styles.nutritionBoxTitle}>Amount</p>
          <div className={styles.amountInput}>
            <ServingAmountSelection
              curFood={currentFood}
              updateServingAmount={updateServingAmount}
            />
            <p className={styles.servingsOfText}>serving(s) of</p>
            <ServingSizeSelection
              curFood={currentFood}
              updateServingSize={updateServingSize}
            />
          </div>
        </div>
        <div className={styles.footprintContainer}>
          <div className={styles.footprintBox}>
            <p className={styles.footprintText}>Water Footprint </p>
            <p className={styles.waterFootprintText}>
              {water_carbon_Data.gallons} gallon(s)
            </p>
            <p className={styles.comparisonText}>
              {water_carbon_Data.easy_water_comparison}
            </p>
          </div>
          <div className={styles.footprintBox}>
            <p className={styles.footprintText}>Carbon Footprint</p>
            <p
              className={styles.carbonFootprintText}
              style={ChooseColor(currentFood.carbon_footprint_rating)}
            >
              {water_carbon_Data.carbon} grams CO₂e
            </p>
            <p className={styles.comparisonText}>
              {water_carbon_Data.easy_carbon_comparison}
            </p>

          </div>
        </div>
      </div>
      <div className={styles.nutritionAndFunFacts}>
        <div className={styles.nutritionBox}>
          <p className={styles.nutritionBoxTitle}>Nutrition Value</p>
          <TotalStarsCalculation numOfStars={currentFood.stars} />
        </div>
        <div className={styles.funFactBox}>
          <p className={styles.funFactText}> {currentFood.facts}</p>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
