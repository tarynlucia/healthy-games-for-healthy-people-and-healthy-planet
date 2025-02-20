import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './styles/gameRankingPage.module.css';
import foods from '../data/food_images'; // Your food data file

const GameRankingPage = () => {
  const [randomFoods, setRandomFoods] = useState([]); // List of random foods
  const [slots, setSlots] = useState([null, null, null, null]); // Keep track of what's in each slot (null means empty)
  const [timer, setTimer] = useState(0); // Timer state to track the elapsed time
  const router = useRouter(); // Initialize useRouter

  // Function to select 4 random foods
  const getRandomFoods = () => {
    const shuffled = [...foods].sort(() => 0.5 - Math.random()); // Shuffle the foods array
    return shuffled.slice(0, 4); // Get the first 4 foods
  };

  // Effect to handle the random foods
  useEffect(() => {
    setRandomFoods(getRandomFoods()); // Set the initial random foods

    // Start a timer when the page is opened
    const timerInterval = setInterval(() => {
      setTimer((prevTime) => prevTime + 1); // Increase the timer every second
    }, 1000);

    // Cleanup timer on component unmount
    return () => clearInterval(timerInterval);
  }, []);

  // Function to handle reshuffling the foods
  const reshuffleFoods = () => {
    setRandomFoods(getRandomFoods()); // Update with a new random selection
    setSlots([null, null, null, null]); // Reset the slots
    setTimer(0); // Reset the timer when reshuffling
  };

  // Function to handle back button click
  const onBackClick = () => {
    router.push("/gameModePage"); // Redirect to gameModePage
  };

  // Function to format timer (seconds) into HH:MM:SS format
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    // Pad minutes and seconds to always show two digits
    const formattedHours = hours > 9 ? hours : `0${hours}`;
    const formattedMinutes = minutes > 9 ? minutes : `0${minutes}`;
    const formattedSeconds = remainingSeconds > 9 ? remainingSeconds : `0${remainingSeconds}`;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  // Handle the drop event for food items into slots
  const handleDrop = (e, index) => {
    e.preventDefault();
    const foodId = e.dataTransfer.getData("foodId"); // Get the foodId from the drag event

    // Ensure the food is not already in a slot
    const newSlots = [...slots];

    // Find the index of the food in the current slots, if it exists
    const foodIndex = newSlots.findIndex((slot) => slot === foodId);
    if (foodIndex !== -1) {
      newSlots[foodIndex] = null; // Remove the food from the previous slot
    }

    // Assign the new foodId to the slot
    newSlots[index] = foodId;
    setSlots(newSlots); // Update the slots state
  };

  // Handle the drag over event (needed for drop to work)
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle the drag start event for food items
  const handleDragStart = (e, foodId) => {
    e.dataTransfer.setData("foodId", foodId); // Store the foodId in the dataTransfer object
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Random Foods</h1>
      
      {/* Timer display */}
      <div className={styles.timer}>Timer: {formatTime(timer)}</div>
      
      <div className={styles.foodsContainer}>
        {randomFoods.map((food) => (
          <div
            key={food.id}
            className={styles.foodItem}
            draggable
            onDragStart={(e) => handleDragStart(e, food.id)} // Make food items draggable
          >
            <img
              src={`/${food.image}`}
              alt={`Food ${food.id}`}
              className={styles.foodImage}
            />
          </div>
        ))}
      </div>

      <div className={styles.slotsContainer}>
        {slots.map((slot, index) => {
  console.log('Slot:', slot); // Log the slot value

  return (
    <div
      key={index}
      className={styles.slot}
      onDrop={(e) => handleDrop(e, index)} // Handle the drop event
      onDragOver={handleDragOver} // Allow the item to be dragged over the slot
    >
      <div className={styles.slotNumber}>{index+1}</div>
      {slot ? (() => {
  const foodItem = randomFoods.find((food) => food.id === parseInt(slot));
  return (
    <img
      src={`/${foodItem?.image}`}
      alt={`Food ${foodItem?.id}`}
      className={styles.slotImage}
    />
  );
})() : (
  <p className={styles.emptySlot}>Empty</p>
)}

    </div>
  );
  
})}

      </div>

      {/* Add the Back button */}
      <button onClick={onBackClick} className={styles.backButton}>Back</button>
      {/* Add the reshuffle button */}
      <button onClick={reshuffleFoods} className={styles.reshuffleButton}>Reshuffle</button>
    </div>
  );
};

export default GameRankingPage;
