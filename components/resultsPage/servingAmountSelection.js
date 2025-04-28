import { useState } from "react";
import styles from "./styles/amountSelection.module.css";

export default function ServingAmountSelection({ curFood, updateServingAmount }) {
  const [inputValue, setInputValue] = useState(curFood.serving_amount.toString());
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const newValue = e.target.value.trim();

    setInputValue(newValue);

    if (newValue === "") {
      setError("");
      return;
    }

    const validNumberRegex = /^\d*\.?\d*$/;

    if (validNumberRegex.test(newValue)) {
      setError("");
    } else {
      setError("");
      setTimeout(() => {
        setError("Oops! Only numbers are allowed.");
      }, 10);
    }
  };

  const handleSelectionChange = (e) => {
    if (e.key === "Enter" || e.type === "blur") {
      const newValue = e.target.value.trim();

      if (newValue === "") {
        setInputValue("1");
        updateServingAmount(curFood.id, 1);
        setError("");
        return;
      }

      const floatValue = parseFloat(newValue);
      if (!isNaN(floatValue) && floatValue >= 0) {
        const roundedVal = Math.round(floatValue * 100) / 100;
        updateServingAmount(curFood.id, roundedVal);
        setInputValue(roundedVal.toString());
        setError("");
      } else {
        setError("Please enter a valid positive number.");
      }
    }
  };

  return (
    <div className={styles.inputWrapper}>
      {error && (
        <div className={styles.errorPopup}>
          {error}
        </div>
      )}
      <input
        className={`${styles.inputBox} ${error ? styles.inputError : ""}`}
        type="text"
        value={inputValue}
        placeholder="Type a Number"
        onChange={handleInputChange}
        onBlur={handleSelectionChange}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleSelectionChange(e);
          }
        }}
      />
    </div>
  );

}