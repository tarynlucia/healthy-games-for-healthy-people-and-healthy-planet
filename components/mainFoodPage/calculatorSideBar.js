import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles/calculatorSideBar.module.css";
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
export default function CalculatorSideBar({ onCalcClick }) {
  const foods = useCalculator();
  const calculatorFunctions = useCalculatorUpdate();

  return (
    <div className={styles.calculatorsidebarframe}>
      <div className={styles.myCalculatorHeader}>
        <Image
          className={styles.calculatoricon}
          src="/calculatorMascot.png"
          alt={""}
          width={200}
          height={200}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&family=Nerko+One&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&family=Nerko+One&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"></link>
        <b className={styles.myCalculatorTitle}>My Calculator</b>
      </div>
      <div className={styles.itemsInCalculatorFrame}>
        {foods.length === 0 ? (
          <div className={styles.nothingInCalculator}>
            <p>You currently have nothing in your calculator!</p>
            <p>Hover over a food card to add it to the calculator</p>
          </div>
        ) : (
          <ul className={styles.foodsInCalculator}>
            {foods.map((food) => (
              <CalculatorFoodItem key={food.id} foodItem={food} />
            ))}
          </ul>
        )}
      </div>
      <div className={styles.bottomButtonsContainer}>
        {foods.length > 1 && (
          <div className={styles.compareButton} onClick={calculatorFunctions.onCompare}>
            Compare 
          </div>
        )}
        {foods.length > 0 && (
          <div className={styles.calculateButton} onClick={onCalcClick}>
            Calculate
          </div>
        )}
        <div className={styles.clearCalcButton} onClick={calculatorFunctions.onClearCalculator}>
          Clear
        </div>
      </div>
    </div>
  );
}

/*************************************************************************
 * Component: CalculatorFoodItem
 * Description: This component displays an individual calculator item.
 * It has a trash can button so it can be removed from the calculator.
 * It displays the name and an image of the food.
 *************************************************************************/
function CalculatorFoodItem({ foodItem }) {
  const calculatorFunctions = useCalculatorUpdate();
  return (
    <li key={foodItem.id}>
      <div>
        <Image
          src={`/${foodItem.imagePath}`}
          alt={foodItem.name}
          width={100}
          height={100}
        />
        <p>{foodItem.name}</p>
        <button
          onClick={() =>
            calculatorFunctions.onRemoveFromCalculator(foodItem.id)
          }
        >
          <FontAwesomeIcon
            icon={faTrashCan}
            className={styles.removeButtonTrashIcon}
          />
        </button>
      </div>
    </li>
  );
}
