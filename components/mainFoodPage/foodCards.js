import { useCalculatorUpdate } from "../../context/calculatorContext";
import foodImages from "../../data/food_images";
import styles from "./styles/foodCards.module.css";

import Image from "next/image";

/*************************************************************************
 * Component: FoodCards
 * Description: This component loops through each food in the database (if
 * there is a filter set then it will only loop through the foods that
 * match the filter) and calls the FoodCard component to render each food
 * on the screen.
 *************************************************************************/
export default function FoodCards({
  foods,
  filteredFoodCards,
  selectedColorId,
}) {
  // If there filteredFoodCards is empty, then all cards should be displayed
  const cardsToRender =
    filteredFoodCards.length > 0 ? filteredFoodCards : foods;

  return (
    <div className={styles.foodcardsframe}>
      {cardsToRender.map(
        (food) =>
          (selectedColorId == -1 || selectedColorId === food.color_id) && (
            <FoodCard 
              key={food.id} 
              id={food.id} 
              name={food.name} 
              food_group={food.food_group} 
              water_footprint={food.water_footprint}
              carbon_footprint={food.carbon_footprint} 
              stars={food.stars}
            />
          )
      )}
    </div>
  );
}

/*************************************************************************
 * Component: FoodCard
 * Description: This renders an individual foodcard on the screen. It
 * uses the CalculatorContext to allow the food to be added and removed
 * from the calculator.
 *************************************************************************/
function FoodCard({ id, name, food_group, water_footprint, carbon_footprint, stars }) {
  //get calculator functions from context
  const calculatorUpdateFunctions = useCalculatorUpdate();
  const food = foodImages.find((foodItem) => foodItem.id === id);

  if (!food) return null;
  const imagePath = food.image;

  return (
    <div className={styles.foodcard}>
      <div className={styles.foodcardInner}>
        <div className={styles.foodcardFront}>
          <Image
            className={styles.foodcardimage}
            src={`/${imagePath}`}
            alt={name}
            width={470}
            height={520}
          />
          <p className={styles.foodcardName}>{name}</p>
          {calculatorUpdateFunctions.isInCalculator(id) ? (
            <div
              className={styles.removeFoodButton}
              onClick={() => calculatorUpdateFunctions.onRemoveFromCalculator(id)}
            >
              <p className={styles.minusSign}>-</p>
            </div>
          ) : (
            <div
              className={styles.addFoodButton}
              onClick={() =>
                calculatorUpdateFunctions.onAddToCalculator({ id, name, imagePath, water:water_footprint, carbon:carbon_footprint, stars })
              }
            >   
              <p className={styles.plusSign}>+</p>
            </div>
          )}
        </div>

        <div className={styles.foodcardBack}>
          <div className={styles.backInfo}>
            <div>Food Group: {food_group}</div>
            <div>Water Footprint:</div> 
            <div>{water_footprint} gallons</div>
            <div>Carbon Footprint:</div>
            <div>{carbon_footprint} CO2e</div>
            <div>Rating: {stars}/5</div>
          </div>
          <p className={styles.foodcardName}>{name}</p>
          {calculatorUpdateFunctions.isInCalculator(id) ? (
            <div
              className={styles.removeFoodButton}
              onClick={() => calculatorUpdateFunctions.onRemoveFromCalculator(id)}
            >
              <p className={styles.minusSign}>-</p>
            </div>
          ) : (
            <div
              className={styles.addFoodButton}
              onClick={() =>
                calculatorUpdateFunctions.onAddToCalculator({ id, name, imagePath, water:water_footprint, carbon:carbon_footprint, stars })
              }
            >   
              <p className={styles.plusSign}>+</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
