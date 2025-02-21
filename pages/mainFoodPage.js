import { useState, useCallback, useEffect } from "react";
import { supabase } from "../lib/initSupabase";
import { useRouter } from "next/router";

import Layout from "../components/layouts/layout";
import ColorDropDown from "../components/mainFoodPage/colorDropDown";
import CalculatorSideBar from "../components/mainFoodPage/calculatorSideBar";
import FoodCards from "../components/mainFoodPage/foodCards";
import SearchBar from "../components/mainFoodPage/search";

import styles from "./styles/mainFoodPage.module.css";

const MainFoodCardsPage = () => {
  const router = useRouter();

  const [foodCards, setFoodCards] = useState([]);
  const [colorArray, setColorArray] = useState([]);
  const [colorFilter, setColorFilter] = useState("all");
  const [colorFilterId, setColorFilterId] = useState(-1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredFoodCards, setFilteredFoodCards] = useState([]);

  const onCalculatorClick = useCallback(() => {
    router.push("/resultsPage");
  }, [router]);

  const onGameIntroClick = useCallback(() => {
    // Navigate to gameModePage.js
    router.push("/gameIntroPage");
  }, [router]);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase.rpc("getfoodcardinformation");

      if (error) {
        throw error;
      }

      const sortedData = data.sort((a, b) => a.food_name.localeCompare(b.food_name));

      const foodsArray = data.map((food) => ({
        id: food.id,
        name: food.food_name,
        color_name: food.color_name,
        color_id: food.color_id,
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

  useEffect(() => {
    const fetchColorData = async () => {
      try {
        const { data, error } = await supabase.from("colors").select("*");

        if (error) {
          throw error;
        }

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
      setSearchInput(input);

      const filteredFoods = foodCards.filter((food) => {
        const nameMatches = food.name.toLowerCase().includes(input.toLowerCase());
        return nameMatches;
      });

      setFilteredFoodCards(filteredFoods);
    },
    [foodCards]
  );

  const resetFilter = () => {
    setSearchInput("");
    setFilteredFoodCards([]);
  };

  const handleReset = () => {
    setSearchInput("");
  };

  return (
    <Layout>
      <div className={styles.mainFoodCardsPage}>
        <CalculatorSideBar onCalcClick={onCalculatorClick} />
        <div className={styles.rightOfSidebar}>
          <div className={styles.dropDownSearchContainer}>
            <ColorDropDown
              colors={colorArray}
              onColorClick={onColorsDropdownFrameContainerClick}
              selectedColor={colorFilter}
            />
            <SearchBar handleSearch={handleSearch} handleReset={handleReset} />
          </div>
          <FoodCards
            foods={foodCards}
            filteredFoodCards={filteredFoodCards}
            selectedColorId={colorFilterId}
          />
          {/* Add the button here */}
          <button className={styles.navigateButton} onClick={onGameIntroClick}>
            Go to Game Mode
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default MainFoodCardsPage;
