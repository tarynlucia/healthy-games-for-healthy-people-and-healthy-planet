import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layouts/layout'; // Import Layout component
import styles from './styles/gameRankingPage.module.css';
import foods from '../data/food_images'; // Import food data

const GameRankingPage = () => {
  const [randomFoods, setRandomFoods] = useState([]);
  const [slots, setSlots] = useState([null, null, null, null]);
  const [timer, setTimer] = useState(0);
  const router = useRouter();

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
  };

  const onBackClick = () => {
    router.push("/gameModePage");
  };

  const endGame = () => {
    const isWin = calculateWinCondition();
    // Navigate to the result page with the win/lose result
    router.push({
      pathname: '/gameResult',
      query: { isWin: isWin ? 'true' : 'false' }
    });
  };
  const calculateWinCondition = () => {
    return Math.random() > 0.5; // Random win/lose outcome
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
    const foodId = e.dataTransfer.getData("foodId"); // Get the foodId from the drag event

    // Create a copy of the current slots
    const newSlots = [...slots];

    // Find the index of the food in the current slots, if it exists
    const foodIndex = newSlots.findIndex((slot) => slot === foodId);
    if (foodIndex !== -1) {
      // If the food is already in a slot, remove it from that slot
      newSlots[foodIndex] = null;
    }

    // Assign the new foodId to the target slot
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
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.heading}>Your Food Items</h1>
        <div className={styles.timer}>Timer: {formatTime(timer)}</div>

        {/* Display Random Foods with Name Tags */}
        <div className={styles.foodsContainer}>
          {randomFoods.map((food) => (
            <div
              key={food.id}
              className={styles.foodItem}
              draggable
              onDragStart={(e) => handleDragStart(e, food.id)}
            >
              <div className={styles.foodNameTag}>{food.name}</div> {/* Name Always Visible */}
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
              <div
                className={styles.slotNumber}
                data-rank={index + 1} // Add the data-rank attribute dynamically
              >
                {index + 1}
              </div>
              {slot ? (
                <div
                  className={styles.slotContent} // Add a class for styling
                  draggable
                  onDragStart={(e) => handleDragStart(e, slot)}
                >
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

        <button onClick={endGame} className={styles.submitButton}>Submit</button>
        <button onClick={onBackClick} className={styles.backButton}>Back</button>
        <button onClick={reshuffleFoods} className={styles.reshuffleButton}>Reshuffle</button>
      </div>
    </Layout>
  );
};

export default GameRankingPage;