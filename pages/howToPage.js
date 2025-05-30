import Layout from "../components/layouts/layout";

import styles from "./styles/howToPage.module.css";

/*************************************************************************
 * Component: How-To
 * Description: This is a place holder for the How To page. This page
 * provides instructions on how the user can navigate through the
 * calculator
 *************************************************************************/
const HowToPage = () => {
  return (
    <Layout>
      <div className={styles.layout}>
        <section className={styles.section}>
          <h1>How to Use the Healthy Food Calculator</h1>
          <p>
            This page provides a step-by-step guide on how to navigate and use the Healthy Food Calculator, including instructions for all main features and key functionalities. If you have any questions or need further assistance, feel free to contact our team using the information provided in the footer.
          </p>
        </section>

        <section className={styles.headers}>
          <h1>Calculator Page Guide</h1>
        </section>

        <section className={styles.section}>
          <h2>Adding Food Items to Your Cart</h2>
          <p>To add a food item for calculation, simply click the “+” icon on the food card.</p>
          <img src="/how-to-1.png" alt="Add food item" className={styles.image} />
        </section>

        <section className={styles.section}>
          <h2>Removing Food Items from Your Cart</h2>
            <span className={styles.bold}>Option 1:</span> “−” Icon on Food Card
            <ul>
              <li>Click the “−” icon on a food card to remove the item.</li>
              <li>Note: This icon only appears if the item is already in your cart.</li>
            </ul>
            <img src="/how-to-2.png" alt="Remove via card" className={styles.imageBig} />

            <br></br><span className={styles.bold}>Option 2:</span> Trash Icon in Cart
            <ul>
              <li>Click the trash icon next to an item in your cart to remove it directly.</li>
            </ul>
            <br></br><img src="/how-to-3.png" alt="Trash icon in cart" className={styles.imageBig} />

            <br></br><span className={styles.bold}>Option 3:</span> “Clear” Button
            <ul>
              <li>Use the “Clear” button to remove all items from your cart at once.</li>
              <li>Note: A confirmation pop-up will appear to verify the action.</li>
            </ul>
            <img src="/how-to-4.png" alt="Clear cart confirmation" className={styles.imageBig} />
            <img src="/how-to-18.png" alt="Clear cart confirmation" className={styles.image} />
        </section>

        <section className={styles.section}>
          <h2>Comparing Food Items In Your Cart</h2>
          <p>Once you have 2 to 4 items in your cart, the Compare feature becomes available. This allows you to view side-by-side data to help determine which items best meet your needs.</p>
          <img src="/how-to-5.png" alt="Compare food items" className={styles.image} />
        </section>

        <section className={styles.section}>
          <h2>User Guides</h2>
            <span className={styles.bold}>Right Sidebar – Real-Time Feedback</span> 
            <p>Hover over any of the measurement images to see tooltips that explain ideal targets for each category in a balanced meal.</p>
            <img src="/how-to-6.png" alt="Right sidebar hover" className={styles.imageBig} />

            <br></br><span className={styles.bold}>Food Cards – Quick Stats Preview</span> 
            <p>Hover over a food card to flip it and reveal a preview of key statistics related to that food item.</p>
            <img src="/how-to-7.png" alt="Food card stats preview" className={styles.image} />

            <br></br><span className={styles.bold}>Buttons</span> 
            <br></br>All clickable items—such as buttons and links—will change color and display a pointer cursor when hovered over. This provides a clear visual cue that the element is interactive.
        </section>

        <section className={styles.headers}>
          <h1>Results Page</h1>
        </section>

        <section className={styles.section}>
          <h2>Altering Serving Size</h2>
          <p>To edit a serving size for an item, simply click and enter the number in the blue box before “serving(s) of” for serving size.</p>
          <img src="/how-to-8.png" alt="Serving Size" className={styles.image} />
          <p>To edit the serving proportion for an item, simply click and choose the measurement in the blue box after “serving(s) of” for serving proportion.</p>
          <img src="/how-to-9.png" alt="Serving Size" className={styles.image} />
        </section>

        <section className={styles.section}>
          <h2>User Guides</h2>
            <span className={styles.bold}>“Your Meal” Drop Down</span> 
            <ul>
              <li>Click the “Your Meal” bar to open/close the drop down menu.</li>
              <img src="/how-to-10.png" alt="“Your Meal” Drop Down" className={styles.image} />
              <img src="/how-to-11.png" alt="“Your Meal” Drop Down" className={styles.image} />
              <li>Hover over the info button to view the ideal target of measurement the user should be aiming for with their meal.</li>
              <img src="/how-to-12.png" alt="“Your Meal” Drop Down" className={styles.imageBig} />
            </ul>
        </section>

        <section className={styles.headers}>
          <h1>Game Page</h1>
        </section>

        <section className={styles.section}>
          <h2>User Guides</h2>
            <span className={styles.bold}>How to Play the Game</span> 
            <ol>
              <li>Select “Start Game”.</li>
              <img src="/how-to-19.png" alt="Start game" className={styles.imageBig} />
              <li>Select a mode between Water and Carbon.</li>
              <img src="/how-to-13.png" alt="Water or Carbon" className={styles.imageBig} />
              <li>Drag each card into one of the empty card holders based on what you think contributes the lowest to highest Water/Carbon footprint.</li>
              <li>When you think you have the correct order, select “Submit” and click “Ok” when it asks if you are sure.</li>
              <img src="/how-to-14.png" alt="Submit" className={styles.imageBig} />
              <img src="/how-to-15.png" alt="Are you sure?" className={styles.imageBig} />
              <li>If you have the correct order, it will prompt you for choosing between playing again and going home. Click “Try Again” or “Go to Home” respectively to proceed how you intend.</li>
              <img src="/how-to-16.png" alt="You win" className={styles.imageBig} />
              <li>Notes:</li>
                <ul>
                  <li>If you want to switch your answers for the ranking before submitting, you can just drag the image into a different slot.</li>
                  <li>The game will keep going on (timer will still run) until you submit the correct order.</li>
                  <li>Select “Reshuffle” to get new cards to rank.</li>
                </ul>
              <img src="/how-to-17.png" alt="Reshuffle" className={styles.imageBig} />
            </ol>
        </section>

      </div>
    </Layout>
  );
};

export default HowToPage;
