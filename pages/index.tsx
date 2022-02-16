import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Logo from "./Icons/Logo.js";
import LaunchButton from "./Components/LaunchButton.js";
import CryptoCupGradient from "./Icons/CryptoCupGradient.js";
import Diamond from "./Icons/Diamond.js";
import Graph from "./Icons/Graph.js";
import LaunchCupButton from "./Components/LaunchCupButton.js";
import LanguageIcon from "@mui/icons-material/Language";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import FaqDiamond from "./Icons/FaqDiamond.js";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Crypto Cup</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.navbar}>
        <div className={styles.containerLogo}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <h2 className={styles.title}>Crypto Cup</h2>
        </div>
        <div className={styles.launch}>
          <h6 className={styles.about}>ABOUT</h6>
          <h6 className={styles.faq}>FAQ</h6>
          <div className={styles.launchButton}>
            <LaunchButton variant="contained">LAUNCH</LaunchButton>
          </div>
        </div>
      </div>

      <div className={styles.summaryContainer}>
        <div className={styles.summaryContainer1}>
          <h2>A New Age of Fantasy with</h2>
          <div className={styles.title1}>
            <CryptoCupGradient />
            <div className={styles.diamond}>
              <Diamond />
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
        </div>
        <div className={styles.graph}>
          <Graph />
        </div>
      </div>

      <div className={styles.container1}>
        <div className={styles.container2}>
          <div className={styles.star}>
            <EmojiEventsIcon fontSize="large" sx={{ color: "#DA93D3" }} />
            <h6 className={styles.iconSpacing}>
              CREATE AND COMPETE IN CUPS WITH YOUR FRIENDS
            </h6>
          </div>
          <div className={styles.bet}>
            <LocalAtmRoundedIcon fontSize="large" sx={{ color: "#DA93D3" }} />
            <h6 className={styles.iconSpacing}>
              BET ON THE PERFORMANCE OF YOUR FAVORITE CRYPTOCURRENCIES
            </h6>
          </div>
          <div className={styles.globe}>
            <LanguageIcon fontSize="large" sx={{ color: "#DA93D3" }} />
            <h6 className={styles.iconSpacing}>
              IMPROVE YOUR RANKING ON VARIOUS LEADERBOARDS
            </h6>
          </div>
        </div>
      </div>

      <div className={styles.container3}>
        <h4 className={styles.italicSpacing}>About Us</h4>
        <div className={styles.about}>
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
        <h2 className={styles.headerSpacing}>Frequently Asked Questions</h2>
        <div className={styles.questionContainer}>
          <FaqDiamond />
          <h5 className={styles.question}>What is Crypto Cup?</h5>
        </div>
        <p className={styles.answer}>See above.</p>
        <div className={styles.questionContainer}>
          <FaqDiamond />
          <h5 className={styles.question}>How do I start playing?</h5>
        </div>
        <p className={styles.answer}>
          Create an account with the “launch” button above. Then, join an
          existing cup with a registration code or create your own cup and send
          the link to your friends. Crypto Cup will walk you through the rest!
        </p>
        <div className={styles.questionContainer}>
          <FaqDiamond />
          <h5 className={styles.question}>
            What cryptocurrencies are available to “bet” on in Crypto Cup?
          </h5>
        </div>
        <p className={styles.answer3}>
          Right now, ___ are available to bet on in cups.
        </p>
      </div>

      <div className={styles.footer}>
        <div className={styles.containerLogo}>
          <div className={styles.logo1}>
            <Logo />
          </div>
          <h2 className={styles.title2}>Crypto Cup</h2>
        </div>

        <div>
          <div className={styles.launch}>
            <h6 className={styles.about}>ABOUT</h6>
            <h6 className={styles.faq}>FAQ</h6>
            <Link
              href={{
                pathname: "/login",
              }}
            >
              <a className={styles.login}>LOG IN/SIGN UP</a>
            </Link>
          </div>
          <div className={styles.tos}>
            <h6>Insert License Here</h6>
            <h6>Terms of Service</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
