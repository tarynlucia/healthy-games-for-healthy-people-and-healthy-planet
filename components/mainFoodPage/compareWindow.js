import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles/compareWindow.module.css";
import { useCalculator } from "../../context/calculatorContext";
import Image from "next/image";
import { useEffect, useState } from "react";

/*************************************************************************
 * Component: CompareWindow
 * Description: This component displays a comparison window for selected food items.
 *************************************************************************/
export default function CompareWindow({ onClose }) {
// export default function CompareWindow({ foods, onClose }) {
  const foods = useCalculator(); // Get selected foods from context
  const [isVisible, setIsVisible] = useState(false);

  // Auto-close if no foods are selected
  useEffect(() => {
    if (foods.length < 1) {
      handleClose();
    }
  }, [foods.length]);

  // Trigger slide-in animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle closing the window
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 800);
  };

  return (
    <div className={`${styles.compareWindowFrame} ${isVisible ? styles.slideIn : styles.slideOut}`}>
      <div className={styles.compareWindowHeader}>
        <b>Compare</b>
        <button className={styles.closeButton} onClick={handleClose}>
          <i className="fa-solid fa-xmark"></i>
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
 * Description: This component displays an individual food item in the comparison window.
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
            <b>{foodItem.food_group}</b>
          </div>

          <div className={styles.nutrition}>
            <h3 className={styles.nutrition}>Nutritional Value:</h3>
            <b>{foodItem.stars}</b>
          </div>

          <div className={styles.water}>
            <h3>Water Footprint:</h3>
            <b>{foodItem.water_footprint} gallons</b>
          </div>

          <div className={styles.carbon}>
            <h3>Carbon Footprint:</h3>
            <b>{foodItem.carbon_footprint} CO2e ({foodItem.carbon_footprint_rating})</b>
          </div>

          <h3 className={styles.facts}>Facts</h3>
          <b>{foodItem.facts}</b>
        </div>
      </div>
    </li>
  );
}
