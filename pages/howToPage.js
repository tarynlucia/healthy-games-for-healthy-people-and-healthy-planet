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

        <section className={styles.section}>
          <h2>Adding Food Items to Your Cart</h2>
          <p>Click the “+” icon on a food card to add the item to your cart for calculation.</p>
          <img src="/how-to-1.png" alt="Add food item" className={styles.image} />
        </section>

        <section className={styles.section}>
          <h2>Removing Food Items from Your Cart</h2>
          <ul>
            <li><span className={styles.bold}>Option 1:</span> Click the “−” icon on a food card (visible only when the item is already in your cart).</li>
            <img src="/how-to-2.png" alt="Remove via card" className={styles.image} />

            <li><span className={styles.bold}>Option 2:</span> Click the trash icon next to the item in your cart.</li>
            <img src="/how-to-3.png" alt="Trash icon in cart" className={styles.image} />

            <li><span className={styles.bold}>Option 3:</span> Use the “Clear” button to remove all items from your cart (a confirmation popup will appear).</li>
            <img src="/how-to-4.png" alt="Clear cart confirmation" className={styles.image} />
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Comparing Food Items</h2>
          <p>When your cart contains 2–4 items, the Compare feature allows you to view side-by-side data and decide what to keep.</p>
          <img src="/how-to-5.png" alt="Compare food items" className={styles.image} />
        </section>

        <section className={styles.section}>
          <h2>User Guides</h2>
          <ul>
            <li><span className={styles.bold}>Right Sidebar:</span> Hover over measurement icons to view target values for a balanced meal.</li>
            <img src="/how-to-6.png" alt="Right sidebar hover" className={styles.image} />

            <li><span className={styles.bold}>Food Cards:</span> Hover over a food card to flip it and preview statistics.</li>
            <img src="/how-to-7.png" alt="Food card stats preview" className={styles.image} />

            <li><span className={styles.bold}>Buttons:</span> All interactive elements change color and cursor on hover for clarity.</li>
            <img src="/how-to-8.png" alt="Hover effect example" className={styles.image} />
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export default HowToPage;
