import { useState } from "react";
import styles from "./styles/amountSelection.module.css";

export default function ServingAmountSelection({ curFood, updateServingAmount }) {
  const [inputValue, setInputValue] = useState(curFood.serving_amount.toString());
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const newValue = e.target.value.trim();

    // Always update inputValue to reflect what's in the input
    setInputValue(newValue);

    if (newValue === "") {
      setError("");
      return;
    }

    const validNumberRegex = /^\d*\.?\d*$/;

    if (validNumberRegex.test(newValue)) {
      setError("");
    } else {
      // For consecutive invalid inputs, we need to "reset" the error to trigger the animation
      setError(""); // First clear the error
      setTimeout(() => {
        setError("Oops! Only numbers are allowed."); // Then set it again
      }, 10); // Small timeout to ensure React renders the change
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

  // Update this part in your component
  return (
    <div className={styles.inputWrapper}>
      {error && (
        <div className={styles.errorPopup}>
          ! {error}
        </div>
      )}
      <input
        className={`${styles.inputBox} ${error ? styles.inputError : ""}`}
        type="text"
        value={inputValue}
        placeholder="Type a number"
        onChange={handleInputChange}
        onBlur={handleSelectionChange}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleSelectionChange(e);
          }
        }}
      // Only clear error on focus if you want to remove the message immediately
      // If you want the animation to complete, remove this line
      // onFocus={() => setError("")}
      />
    </div>
  );

}