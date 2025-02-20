import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles/compareWindow.module.css";
import {
  useCalculator,
  useCalculatorUpdate,
} from "../../context/calculatorContext";
import Image from "next/image";
import { useEffect, useState } from "react";

/*************************************************************************
 * Component: CalculatorSideBar
 * Description: This component displays the calculator, which is a sidebar
 * that displays the foods that the user has selected for their
 * calculation. It has buttons to clear the calculator and to calculate
 *************************************************************************/
export default function CompareWindow ({ onClose }) {
  const foods = useCalculator();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (foods.length < 1) {
      handleClose();
    }
  }, [foods.length]); // Runs when foods.length changes

  useEffect(() => {
    setIsVisible(true); // Small delay to trigger animation
  }, []); // auto runs with every render/change

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 800);
  };

  return (
    <div className={`${styles.compareWindowFrame} ${isVisible ? styles.slideIn : styles.slideOut}`}>
      <div className={styles.compareWindowHeader}>
        <b>Compare</b>
        <button className={styles.closeButton} onClick={handleClose}>
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className={styles.itemsInCompareFrame}>
        <ul className={styles.foodsInCalculator}>
          {foods.map((food) => (
            <CompareFoodItem 
              key={food.id}
              foodItem={food}
            />
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
  return (
    <li key={foodItem.id}>
      <div className={styles.foodItem}>
        <Image
          src={`/${foodItem.imagePath}`}
          alt={foodItem.name}
          width={100}
          height={100}
        />
        <h2 className={styles.name}>{foodItem.name}</h2>
        <div className={styles.information}>
          <div className={styles.group}>
            <h3>Food Group:</h3>
            <b>placeholder</b>
          </div>

          <h3 className={styles.nutrition}>Nutritional Value:</h3>
          <b>stars placeholder</b>

          <div className={styles.water}>
            <h3>Water Footprint:</h3>
            <b>#</b>
          </div>
          <b>real live conversion placeholder</b>

          <div className={styles.carbon}>
            <h3>Carbon Footprint:</h3>
            <b># (rank)</b>
          </div>
          <b>real live conversion placeholder</b>

          <h3 className={styles.facts}>Facts</h3>
          <b>Information</b>
        </div>
      </div>
    </li>
  );
}
