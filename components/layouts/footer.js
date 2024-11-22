import styles from "./styles/header-footer.module.css";
import Image from "next/image";

/*************************************************************************
 * Component: footer
 * Description: This component renders the footer that will appear on
 * every page in the application
 *************************************************************************/
function Footer() {
  return (
    <>
      <div className={styles.footerframe}>
        {/* Left Section */}
        <div className={styles.footerInfoContainer}>
          <Image
            className={styles.osufootericon}
            width={200}
            height={75}
            alt="Oregon State University Logo"
            src="/osufootericon.svg"
          />
          <div className={styles.collegeOfHealth}>
            College Of Health ASP3IRE Center
          </div>
          <div className={styles.oregonStateUniversitys}>
            Oregon State University’s Advancing Science, Practice, Programming
            and Policy in Research Translation for Children&apos;s Environmental
            Health Center
          </div>
        </div>

        {/* Divider Line */}
        <div className={styles.dividerlineIcon}></div>

        {/* Right Section */}
        <div className={styles.authorAndContributorContainer}>
          <div className={styles.authorAndContibutorText}>Author</div>
          <div className={styles.authorAndContibutorMemberText}>
            Siew Sun Wong - Professor of Nutrition
          </div>
          <div className={styles.authorAndContibutorText}>Contributors</div>

          <div className={styles.contributorsGrid}>
            <div>Yaire Aguilar</div>
            <div>Kyu Sung Kwon</div>
            <div>Garrett Berliner</div>
            <div>Anastasiia Ragozina</div>
            <div>Taryn Eng</div>
            <div>Abdulrahman Samargandi</div>
            <div>Gerald Hendrix</div>
            <div>Mitch Stephenson</div>
            <div>Charissa Kau</div>
            <div>Aaron Underhill</div>
            <div>Emma Koehmstedt</div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.footerBottomBar}>
        <div className={styles.communityTitle}>Community</div>
        <a
          href="https://forms.gle/AsuCAf2kRhGhPp6S6"
          className={styles.feedbackLink}
        >
          Feedback
        </a>
      </div>


    </>
  );
}

export default Footer;
