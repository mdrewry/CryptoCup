import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Logo from "../Icons/Logo.js";
import LaunchButton from "../Components/LaunchButton.js";
import Diamond from "../Icons/Diamond.js";
import Graph from "../Icons/Graph.js";
import LaunchCupButton from "../Components/LaunchCupButton.js";
import LanguageIcon from "@mui/icons-material/Language";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import FaqDiamond from "../Icons/FaqDiamond.js";
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Crypto Cup</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid container spacing={0} alignItems="center">
        <Grid item xs={9}>
          <div className={styles.containerLogo}>
            <div className={styles.logo}>
              <Logo />
            </div>
            <h2 className={styles.title}>Crypto Cup</h2>
          </div>
        </Grid>
        <Grid item xs>
          <Button onClick={() => window.location.replace("/#about")}>
            <a>ABOUT</a>
          </Button>
        </Grid>
        <Grid item xs={0.9}>
          <Button onClick={() => window.location.replace("/#faq")}>
            <a>FAQ</a>
          </Button>
        </Grid>
        <Grid item xs>
          <LaunchButton variant="contained">LAUNCH</LaunchButton>
        </Grid>
      </Grid>

      <Grid className={styles.summaryContainer}>
        <Grid item xs>
          <h2>A New Age of Fantasy with</h2>
          <div className={styles.title1}>
            <h1 className={styles.gradient}>Crypto Cup</h1>
            <div className={styles.diamond}>
              <Diamond/>
            </div>
          </div>
          <div className={styles.summary}>
          <p>
              Crypto Cup is an application that allows users to draft, compete,
              and keep track of live analytics on the top cryptocurrencies with
              ease.{" "}
            </p>
          </div>
          <div className={styles.launchCupButton}>
              <LaunchCupButton variant="contained">
                LAUNCH CRYPTO CUP
              </LaunchCupButton>
          </div>
        </Grid>
        <Grid item xs>
          <Graph />
        </Grid>
      </Grid>

      <Grid className={styles.container1} alignItems="baseline" container spacing={8}>
        <Grid className={styles.container2} item xs>
          <EmojiEventsIcon fontSize="large" sx={{ color: '#DA93D3' }}/>
          <h6 className={styles.iconSpacing}>
            CREATE AND COMPETE IN CUPS WITH YOUR FRIENDS
          </h6>
        </Grid>
        <Grid className={styles.container2} item xs>
          <LocalAtmRoundedIcon fontSize="large" sx={{ color: '#DA93D3' }}/>
          <h6 className={styles.iconSpacing}>
            BET ON THE PERFORMANCE OF YOUR FAVORITE CRYPTOCURRENCIES
          </h6>
        </Grid>
        <Grid className={styles.container2} item xs>
          <LanguageIcon fontSize="large" sx={{ color: '#DA93D3' }}/>
          <h6 className={styles.iconSpacing}>
            IMPROVE YOUR RANKING ON VARIOUS LEADERBOARDS
          </h6>
        </Grid>
      </Grid>

      <div className={styles.container3}>
        <h4 id="about" className={styles.italicSpacing}>About Us</h4>
        <div className={styles.aboutus}>
          <h2 className={styles.headerSpacing}>Every Crypto-Lover’s&nbsp;</h2>
          <h2 className={styles.fantasy}>Fantasy</h2>
        </div>
        <p className={styles.aboutSpacing}>
          In Crypto Cup, users can create or register for cups to compete
          against their friends. Users bet on the upcoming performance of
          various cryptocurrencies. It’s like Fantasy for crypto-lovers!
        </p>
        <p className={styles.aboutSpacing}>
          Crypto Cup is an application made by Mark Drewry, Andrew Gil, Amer
          Khalifa, Nickolas Phen, Rohan Samanta, and Andrea Relova for our
          University of Florida Computer Science Senior Project. Go Gators!
        </p>
        <h4 className={styles.italicSpacing}>FAQ</h4>
        <h2 id="faq" className={styles.headerSpacing}>Frequently Asked Questions</h2>
        <div className={styles.questionContainer}>
          <FaqDiamond/>
          <h5 className={styles.question}>What is Crypto Cup?</h5>
        </div>
        <p className={styles.answer}>See above.</p>
        <div className={styles.questionContainer}>
          <FaqDiamond/>
          <h5 className={styles.question}>How do I start playing?</h5>
        </div>
        <p className={styles.answer}>
          Create an account with the “launch” button above. Then, join an
          existing cup with a registration code or create your own cup and send
          the link to your friends. Crypto Cup will walk you through the rest!
        </p>
        <div className={styles.questionContainer}>
          <FaqDiamond/>
          <h5 className={styles.question}>
            What cryptocurrencies are available to “bet” on in Crypto Cup?
          </h5>
        </div>
        <p className={styles.answer3}>
          Right now, ___ are available to bet on in cups.
        </p>
      </div>
    </div>
  );
};

export default Home;
