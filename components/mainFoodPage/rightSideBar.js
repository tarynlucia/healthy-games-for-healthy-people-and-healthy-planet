import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles/rightSideBar.module.css";
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
export default function RightSideBar({ onCalcClick }) {
  const foods = useCalculator();
  const calculatorFunctions = useCalculatorUpdate();

  return (
    <div className={styles.calculatorsidebarframe}>
      <div className={styles.myCalculatorHeader}>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&family=Nerko+One&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&family=Nerko+One&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"></link>
        <Image
          className={styles.myPlateIcon}
          src="/myPlate.png"
          alt={""}
          width={200}
          height={200}
        />
        <div className={styles.titleName}>
          Food Groups
          <Image
            className={styles.information}
            src="/information.png"
            alt={""}
            width={200}
            height={200}
          />  
        </div>
        <Image
          className={styles.waterIcon}
          src="/waterbottle5.png"
          alt={""}
          width={200}
          height={200}
        />
        <div className={styles.titleName}>
          Water Footprint
          <Image
            className={styles.information}
            src="/information.png"
            alt={""}
            width={200}
            height={200}
          />  
        </div>
        <Image
          className={styles.carbonIcon}
          src="/gas-06.png"
          alt={""}
          width={200}
          height={200}
        />
        <div className={styles.titleName}>
          Carbon Footprint
          <Image
            className={styles.information}
            src="/information.png"
            alt={""}
            width={200}
            height={200}
          />  
        </div>
        <Image
          className={styles.starsIcon}
          src="/stars-11.png"
          alt={""}
          width={200}
          height={200}
        />
        <div className={styles.titleName}>
          Rating
          <Image
            className={styles.information}
            src="/information.png"
            alt={""}
            width={200}
            height={200}
          />  
        </div>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&family=Nerko+One&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&family=Nerko+One&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"></link>
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
