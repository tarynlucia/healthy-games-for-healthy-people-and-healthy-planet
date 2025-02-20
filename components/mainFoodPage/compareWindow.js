import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles/compareWindow.module.css";
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
export default function CompareWindow ({ onClose }) {
  const foods = useCalculator();

  return (
    <div className={styles.compareWindowFrame}>
      <div className={styles.compareWindowHeader}>
        <b>Compare</b>
        <button className={styles.closeButton} onClick={onClose}>
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className={styles.itemsInCompareFrame}>
        <ul className={styles.foodsInCalculator}>
          {foods.map((food) => (
            <CompareFoodItem key={food.id} foodItem={food} />
          ))}
        </ul>
      </div>
    </div>
  );
}

/*************************************************************************
 * Component: CompareFoodItem
 * Description: This component displays an individual calculator item.
 * It has a trash can button so it can be removed from the calculator.
 * It displays the name and an image of the food.
 *************************************************************************/
function CompareFoodItem({ foodItem }) {
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
      </div>
    </li>
  );
}
