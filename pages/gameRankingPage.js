/**
 * GameRankingPage Component
 * 
 * This page allows users to rank four randomly selected food items 
 * from lowest to highest based on either their carbon footprint or 
 * water footprint, depending on the selected game mode.
 * 
 * Key Features:
 * - Randomly selects and displays four food items.
 * - Users drag and drop foods into ranking slots.
 * - A timer tracks how long the user takes.
 * - Validates if the ranking is correct based on the selected footprint.
 * - Highlights incorrect choices if the user submits an incorrect ranking.
 * - Allows reshuffling foods and retrying the ranking.
 * - Navigates to a game result page upon successful ranking.
 * 
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layouts/layout'; // Import Layout component
import styles from './styles/gameRankingPage.module.css';
import foods from '../data/food_images'; // Import food data

const GameRankingPage = () => {
  const [randomFoods, setRandomFoods] = useState([]); // State for holding random foods
  const [slots, setSlots] = useState([null, null, null, null]); // State for holding slot values (food IDs)
  const [timer, setTimer] = useState(0); // Timer state to track time
  const [incorrectChoices, setIncorrectChoices] = useState([]); // Track incorrect selections
  const [validationMessage, setValidationMessage] = useState(""); // To show validation message if slots aren't filled
  const [postSubmitMessage, setPostSubmitMessage] = useState(""); // Message to show after submission
  const [isAlertVisible, setIsAlertVisible] = useState(false); // Control alert visibility
  const [isPostSubmitVisible, setIsPostSubmitVisible] = useState(false); // Control post-submit message visibility
  const router = useRouter();
  const { mode } = router.query; // Extract mode from query parameter

  useEffect(() => {
    setRandomFoods(getRandomFoods()); // Set random foods on component mount

    const timerInterval = setInterval(() => {
      setTimer((prevTime) => prevTime + 1); // Update timer every second
    }, 1000);

    return () => clearInterval(timerInterval); // Clean up timer on component unmount
  }, []);

  const getRandomFoods = () => {
    const shuffled = [...foods].sort(() => 0.5 - Math.random()); // Shuffle the foods array
    return shuffled.slice(0, 4); // Select the first 4 shuffled foods
  };

  const reshuffleFoods = () => {
    setRandomFoods(getRandomFoods()); // Reshuffle foods and reset slots
    setSlots([null, null, null, null]);
    setTimer(0);
    setIncorrectChoices([]); // Reset incorrect choices
    setPostSubmitMessage("");
    setValidationMessage(""); // Clear validation and post-submit messages
  };

  const onBackClick = () => {
    router.push("/gameModePage"); // Navigate to the game mode page
  };

  const endGame = () => {
    if (slots.some(slot => slot === null)) {
      setValidationMessage("Please fill all slots before submitting!"); // Alert if any slot is empty
      setIsAlertVisible(true);
      return;
    }

    setValidationMessage(""); 
    const { isWin, incorrectIndices } = calculateWinCondition();
    if (isWin) {
      router.push({
        pathname: '/gameResult',
        query: { isWin: 'true', timeTaken: timer.toString() }
      }); // Navigate to game result page if the user wins
    } else {
      setIncorrectChoices(incorrectIndices); // Highlight incorrect choices
      setPostSubmitMessage("Double check on the red highlighted foods!"); // Show post-submit message
      setIsPostSubmitVisible(true);
    }
  };

  const calculateWinCondition = () => {
    const sortedFoods = [...randomFoods].sort((a, b) => {
      return mode === 'Carbon'
        ? a.carbonFootprint - b.carbonFootprint // Sort by carbon footprint if mode is Carbon
        : a.waterFootprint - b.waterFootprint; // Sort by water footprint if mode is Water
    });

    const footprintMap = {};
    sortedFoods.forEach((food, index) => {
      const footprint = mode === 'Carbon' ? food.carbonFootprint : food.waterFootprint;
      if (!footprintMap[footprint]) {
        footprintMap[footprint] = [];
      }
      footprintMap[footprint].push(index);
    });

    const selectedFoods = slots.map(slot => randomFoods.find(food => food.id === parseInt(slot))); // Map selected foods
    const incorrectIndices = selectedFoods.map((food, index) => {
      if (!food) return index; // Check for empty slots
      const footprint = mode === 'Carbon' ? food.carbonFootprint : food.waterFootprint;
      return footprintMap[footprint].includes(index) ? -1 : index; // Check if the selected food is in the correct order
    }).filter(index => index !== -1); // Filter incorrect indices

    return {
      isWin: incorrectIndices.length === 0, // Return win condition based on incorrect selections
      incorrectIndices
    };
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600); // Calculate hours
    const minutes = Math.floor((seconds % 3600) / 60); // Calculate minutes
    const remainingSeconds = seconds % 60; // Calculate remaining seconds
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`; // Return formatted time
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const foodId = e.dataTransfer.getData("foodId"); // Get food ID from drag event

    const newSlots = [...slots];
    const foodIndex = newSlots.findIndex((slot) => slot === foodId);
    if (foodIndex !== -1) {
      newSlots[foodIndex] = null; // Remove food from previously filled slot if dropped again
    }

    newSlots[index] = foodId; // Fill the dropped slot with the food ID
    setSlots(newSlots);

    // If the slot was previously incorrect, remove its index from incorrectChoices
    if (incorrectChoices.includes(index)) {
      setIncorrectChoices(prev => prev.filter(i => i !== index));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow food items to be dropped
  };

  const handleDragStart = (e, foodId) => {
    e.dataTransfer.setData("foodId", foodId); // Set food ID in the drag event

    const draggedSlotIndex = slots.findIndex(slot => slot === foodId);

    // Remove the ❌ for that specific food if it was incorrect
    if (draggedSlotIndex !== -1 && incorrectChoices.includes(draggedSlotIndex)) {
      setIncorrectChoices(prev => prev.filter(index => index !== draggedSlotIndex));
    }
  };

  const modeClass = mode === "Water" ? styles.waterColor : mode === "Carbon" ? styles.carbonColor : ""; // Apply mode-specific color classes

  const closeAlert = () => {
    setIsAlertVisible(false); // Close alert
  };

  const closePostSubmitAlert = () => {
    setIsPostSubmitVisible(false); // Close post-submit message
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.h2}>
          Rank their
          <span className={modeClass}> {mode ? mode : "selected"} </span>
          footprint!
        </h1>

        <div className={styles.timer}>Timer: {formatTime(timer)}</div>

        <div className={styles.modeBox}>
          <div className={styles.foodsContainer}>
            {randomFoods.map((food) => (
              <div
                key={food.id}
                className={styles.foodItem}
                draggable
                onDragStart={(e) => handleDragStart(e, food.id)} // Handle drag start event for food item
              >
                <div className={styles.foodNameTag}>{food.name}</div>
                <img src={`/${food.image}`} alt={food.name} className={styles.foodImage} />
              </div>
            ))}
          </div>

          <div className={styles.slotsContainer}>
            {slots.map((slot, index) => {
              const isIncorrect = incorrectChoices.includes(index); // Check if the slot contains an incorrect food item
              const isFirst = index === 0;
              const isLast = index === slots.length - 1;

              return (
                <div
                  key={index}
                  className={`${styles.slot} ${isIncorrect ? styles.incorrectSlot : ""}`} // Apply incorrect slot class if needed
                  onDrop={(e) => handleDrop(e, index)} // Handle drop event
                  onDragOver={handleDragOver} // Handle drag over event
                >
                  {isFirst && !slot && <div className={styles.lowestLabel}>Low</div>}
                  {isLast && !slot && <div className={styles.highestLabel}>High</div>}

                  <div className={styles.slotNumber} data-rank={index + 1}>
                    {index + 1}
                  </div>

                  {slot && (
                    <div className={styles.slotContent} draggable onDragStart={(e) => handleDragStart(e, slot)}>
                      <div className={styles.foodNameTag}>
                        {randomFoods.find((food) => food.id === parseInt(slot))?.name}
                      </div>
                      {/* ✅ Overlay X if incorrect */}
                      <div className={styles.imageWrapper}>
                        <img
                          src={`/${randomFoods.find((food) => food.id === parseInt(slot))?.image}`}
                          alt={randomFoods.find((food) => food.id === parseInt(slot))?.name}
                          className={styles.slotImage}
                        />
                        {isIncorrect && (
                          <div className={styles.overlayX}>✖</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <button onClick={endGame} className={styles.submitButton}>Submit</button>
        <button onClick={onBackClick} className={styles.backButton}>Back</button>
        <button onClick={reshuffleFoods} className={styles.reshuffleButton}>Reshuffle</button>

        {isPostSubmitVisible && ( // If true, render the following confirmation overlay
          <div className={styles.overlayContainer}> {/* Container for positioning */}
            <div className={styles.overlay}></div>
            {/* A semi-transparent background that closes the alert when clicked */}
            <div className={styles.highlightBox}> {/* The main content box */}
                <div className={styles.topSection}>
                    <h1>Are You Sure?</h1>
                </div>
                <div className={styles.bottomSection}>
                    <p>{postSubmitMessage}</p>
                    <button className={styles.botto} onClick={closePostSubmitAlert}>OK</button>
                </div>
            </div>
          </div>
        )}

        {isAlertVisible && ( // If true, render the following confirmation overlay
          <div className={styles.overlayContainer}> {/* Container for positioning */}
            <div className={styles.overlay}></div>
            {/* A semi-transparent background that closes the alert when clicked */}
            <div className={styles.alertBox}> {/* The main content box */}
                <div className={styles.top}>
                    <h1>Empty Slots!</h1>
                </div>
                <div className={styles.bottom}>
                    <p>{validationMessage}</p>
                    <button className={styles.blueButton} onClick={closeAlert}>OK</button>
                </div>
            </div>
          </div>
        )}

        {/* {isAlertVisible && (
          <div className={styles.alertBox}>
            <p>{validationMessage}</p>
            <button onClick={closeAlert}>Close</button>
          </div>
        )} */}
      </div>
    </Layout>
  );
};

export default GameRankingPage;
