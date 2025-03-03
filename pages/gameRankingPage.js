import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layouts/layout'; // Import Layout component
import styles from './styles/gameRankingPage.module.css';
import foods from '../data/food_images'; // Import food data

const GameRankingPage = () => {
  const [randomFoods, setRandomFoods] = useState([]);
  const [slots, setSlots] = useState([null, null, null, null]);
  const [timer, setTimer] = useState(0);
  const [incorrectChoices, setIncorrectChoices] = useState([]); // Track incorrect selections
  const [validationMessage, setValidationMessage] = useState(""); // To show validation message if slots aren't filled
  const router = useRouter();
  const { mode } = router.query; // Extract mode from query parameter

  useEffect(() => {
    setRandomFoods(getRandomFoods());

    const timerInterval = setInterval(() => {
      setTimer((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const getRandomFoods = () => {
    const shuffled = [...foods].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };

  const reshuffleFoods = () => {
    setRandomFoods(getRandomFoods());
    setSlots([null, null, null, null]);
    setTimer(0);
    setIncorrectChoices([]); // Reset incorrect choices when reshuffling
    setValidationMessage(""); // Clear validation message when reshuffling
  };

  const onBackClick = () => {
    router.push("/gameModePage");
  };

  const endGame = () => {
    // Check if any slots are empty
    if (slots.some(slot => slot === null)) {
      setValidationMessage("Please fill all slots before submitting!"); // Show validation message
      return; // Prevent further actions if slots are not filled
    }

    setValidationMessage(""); // Clear the validation message if all slots are filled
    const { isWin, incorrectFoods } = calculateWinCondition();
    if (isWin) {
    router.push({
      pathname: '/gameResult',
        query: { isWin: 'true' }
    });
    } else {
      setIncorrectChoices(incorrectFoods); // Display the incorrect foods on the page
    }
  };

  // Calculate the win condition and return incorrect foods if any
  const calculateWinCondition = () => {
    const sortedFoods = [...randomFoods].sort((a, b) => {
      return mode === 'Carbon'
        ? a.carbonFootprint - b.carbonFootprint
        : a.waterFootprint - b.waterFootprint;
    });

    // Check if the slots array is in the same order as the sortedFoods array
    const selectedFoods = slots.map((slot) => randomFoods.find(food => food.id === parseInt(slot)));
    
    const incorrectFoods = selectedFoods.filter((food, index) => food?.id !== sortedFoods[index]?.id);
    
    return {
      isWin: incorrectFoods.length === 0, // If no incorrect foods, user won
      incorrectFoods: incorrectFoods.map(food => food.name) // Return names of incorrect foods
    };
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const foodId = e.dataTransfer.getData("foodId");

    const newSlots = [...slots];

    const foodIndex = newSlots.findIndex((slot) => slot === foodId);
    if (foodIndex !== -1) {
      newSlots[foodIndex] = null;
    }

    newSlots[index] = foodId;
    setSlots(newSlots);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e, foodId) => {
    e.dataTransfer.setData("foodId", foodId);
  };

  // Dynamic class for color based on mode
  const modeClass = mode === "Water" ? styles.waterColor : mode === "Carbon" ? styles.carbonColor : "";

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.heading}>Your Food Cards</h1>
        {/* Display dynamic text with colored "footprint" */}
        <h2 className={styles.h2}>
          Rank the foods from smallest footprint to largest based on their 
          <span className={modeClass}> {mode ? mode : "selected"} </span>
          footprint!
        </h2>
        <div className={styles.timer}>Timer: {formatTime(timer)}</div>

        {/* New Box Container for Food Items and Slots */}
        <div className={styles.modeBox}>
          {/* Display Random Foods with Name Tags */}
          <div className={styles.foodsContainer}>
            {randomFoods.map((food) => (
              <div
                key={food.id}
                className={styles.foodItem}
                draggable
                onDragStart={(e) => handleDragStart(e, food.id)}
              >
                <div className={styles.foodNameTag}>{food.name}</div>
                <img src={`/${food.image}`} alt={food.name} className={styles.foodImage} />
              </div>
            ))}
          </div>

          {/* Slots */}
          <div className={styles.slotsContainer}>
            {slots.map((slot, index) => (
              <div
                key={index}
                className={styles.slot}
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={handleDragOver}
              >
                <div className={styles.slotNumber} data-rank={index + 1}>
                  {index + 1}
                </div>
                {slot ? (
                  <div className={styles.slotContent} draggable onDragStart={(e) => handleDragStart(e, slot)}>
                    <div className={styles.foodNameTag}>
                      {randomFoods.find((food) => food.id === parseInt(slot))?.name}
                    </div>
                    <img
                      src={`/${randomFoods.find((food) => food.id === parseInt(slot))?.image}`}
                      alt={randomFoods.find((food) => food.id === parseInt(slot))?.name}
                      className={styles.slotImage}
                    />
                  </div>
                ) : (
                  <p className={styles.emptySlot}>Empty</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <button onClick={endGame} className={styles.submitButton}>Submit</button>
        <button onClick={onBackClick} className={styles.backButton}>Back</button>
        <button onClick={reshuffleFoods} className={styles.reshuffleButton}>Reshuffle</button>

            {/* LEOS NEW PART */}
        {incorrectChoices.length > 0 && (
          <div className={styles.incorrectFeedback}>
            <h3>Try Changing These Items :)</h3>
            <ul>
              {incorrectChoices.map((food, index) => (
                <li key={index}>{food}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Display the validation message if slots aren't filled */}
        {validationMessage && (
          <div className={styles.validationMessage}>{validationMessage}</div>
        )}
        {/* HIS PART ENDS HERE */}
      </div>
    </Layout>
  );
};

export default GameRankingPage;
