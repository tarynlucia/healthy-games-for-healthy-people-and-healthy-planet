import { useState, useCallback, useEffect } from "react";
import { supabase } from "../lib/initSupabase";
import { useRouter } from "next/router";

import Layout from "../components/layouts/layout";
import ColorDropDown from "../components/mainFoodPage/colorDropDown";
import CalculatorSideBar from "../components/mainFoodPage/calculatorSideBar";
import FoodCards from "../components/mainFoodPage/foodCards";
import SearchBar from "../components/mainFoodPage/search";
import CompareWindow from "../components/mainFoodPage/compareWindow";
import Image from "next/image";
import RightSideBar from "../components/mainFoodPage/rightSideBar";

import styles from "./styles/mainFoodPage.module.css";

/*************************************************************************
 * Component: MainFoodCardsPage
 * Description: This component is responsible for displaying the main
 * food cards page. It displays the calculator, all of the foods in the
 * database, and allows for filtering options (color and name)
 *************************************************************************/
const MainFoodCardsPage = () => {
  const router = useRouter();

  const [foodCards, setFoodCards] = useState([]);

  const [colorArray, setColorArray] = useState([]);

  const [colorFilter, setColorFilter] = useState("all");

  const [colorFilterId, setColorFilterId] = useState(-1);

  const [searchInput, setSearchInput] = useState("");

  const [filteredFoodCards, setFilteredFoodCards] = useState([]);

  const [showCompare, setShowCompare] = useState(false);

  const onCalculatorClick = useCallback(() => {
    router.push("/resultsPage");
  }, [router]);

  //function to fetch foods with color information
  const fetchData = async () => {
    try {
      //function in database to fetch foods with color information
      const { data, error } = await supabase.rpc("test_allinfo");

      if (error) {
        throw error;
      }

      // Sort the data alphabetically by food_name
      const sortedData = data.sort((a, b) => a.food_name.localeCompare(b.food_name));

      //map each food to its own object
      const foodsArray = data.map((food) => ({
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
      setFoodCards(foodsArray);
      console.log("Main Food Cards Page -> Food Data:", foodsArray);
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //function to fetch color data
  useEffect(() => {
    const fetchColorData = async () => {
      try {
        //grab colors table from database
        const { data, error } = await supabase.from("colors").select("*");

        if (error) {
          throw error;
        }

        //map each color to a color object
        const colorArray = data.map((color) => ({
          id: color.color_id,
          name: color.color,
        }));
        setColorArray(colorArray);
        console.log("Main Food Cards Page -> Color Data:", colorArray);
      } catch (error) {
        console.error("Error fetching data from Supabase:", error.message);
      }
    };
    fetchColorData();
  }, []);

  const onColorsDropdownFrameContainerClick = useCallback((val, id) => {
    setColorFilter(val);
    setColorFilterId(id);
  }, []);

  const handleSearch = useCallback(
    (input) => {
      // Update search input state
      setSearchInput(input);

      // Filter food cards based on search input
      const filteredFoods = foodCards.filter((food) => {
        const nameMatches = food.name
          .toLowerCase()
          .includes(input.toLowerCase());
        // const colorMatches = colorFilter === "all" || food.color === colorFilter;
        return nameMatches; // && colorMatches;
      });
      // Update filtered food cards
      setFilteredFoodCards(filteredFoods);
    },
    [foodCards]
  );

  const resetFilter = () => {
    setSearchInput(""); // Reset search input
    setFilteredFoodCards([]); // Reset filtered food cards
  };

  const handleReset = () => {
    setSearchInput(""); // Reset search input
    //fetchData(); // Refetch data to ensure you have the latest
  };

  const onCompareClick = () => {
    setShowCompare(true);
  };

  const onCloseCompare = () => {
    setShowCompare(false);
  };

  return (
    <Layout>
      <div className={styles.mainFoodCardsPage}>
      <div className={styles.backgroundframe}>
        <Image
          className={styles.backgroundimageIcon}
          alt="Background Image"
          src="/outsideLong.png"
          width={1920}
          height={1080}
        />
        </div>
        <CalculatorSideBar onCalcClick={onCalculatorClick} onCompareClick={onCompareClick} onClose={onCloseCompare} />
        <div className={styles.rightOfSidebar}>
          {showCompare && <CompareWindow onClose={onCloseCompare} />}
          <div className={styles.dropDownSearchContainer}>
            <ColorDropDown
              colors={colorArray}
              onColorClick={onColorsDropdownFrameContainerClick}
              selectedColor={colorFilter}
            />
            <SearchBar handleSearch={handleSearch} handleReset={handleReset} />
            {/* Reset button to clear the input field */}
            {/* <button className={styles.resetButton} onClick={resetFilter}>
              Reset
            </button> */}
          </div>
          <div className={styles.foodCardsContainer}>
            <FoodCards
              foods={foodCards}
              filteredFoodCards={filteredFoodCards}
              selectedColorId={colorFilterId}
            />
          </div>
        </div>
        <RightSideBar onCalcClick={onCalculatorClick} />
      </div>
    </Layout>
  );
};

export default MainFoodCardsPage;
