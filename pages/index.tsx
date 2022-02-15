import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link"
import Logo from "./Icons/Logo.js";
import LaunchButton from "./Components/LaunchButton.js";
import CryptoCupGradient from "./Icons/CryptoCupGradient.js";
import Diamond from "./Icons/Diamond.js";
import LaunchCupButton from "./Components/LaunchCupButton.js";
import LanguageIcon from '@mui/icons-material/Language';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalAtmRoundedIcon from '@mui/icons-material/LocalAtmRounded';
// import { AccessAlarm, LanguageIcon } from '@mui/icons-material';

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
            <h2 className={styles.title}>
            Crypto Cup
            </h2>
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
          <h2>A New Age of Fantasy with</h2>
          <div className={styles.title1}>
            <CryptoCupGradient/>
            <div className={styles.diamond}>
              <Diamond/>
            </div>
          </div>
          <div className={styles.summary}>
            <p>Crypto Cup is an application that allows users to draft, compete, and keep track of live analytics on the top cryptocurrencies with ease. </p>
          </div>
          <div className={styles.launchCupButton}>
              <LaunchCupButton variant="contained">LAUNCH CRYPTO CUP</LaunchCupButton>
          </div>
        </div>

        <div className={styles.container1}>
          <div className={styles.container2}>
            <div className={styles.star}>
              <EmojiEventsIcon fontSize="large" sx={{ color: '#DA93D3' }}/>
              <h6 className={styles.iconSpacing}>CREATE AND COMPETE IN CUPS WITH YOUR FRIENDS</h6>
            </div>
            <div className={styles.bet}>
              <LocalAtmRoundedIcon fontSize="large" sx={{ color: '#DA93D3' }}/>
              <h6 className={styles.iconSpacing}>BET ON THE PERFORMANCE OF YOUR FAVORITE CRYPTOCURRENCIES</h6>
            </div>
            <div className={styles.globe}>
              <LanguageIcon fontSize="large" sx={{ color: '#DA93D3' }}/>
              <h6 className={styles.iconSpacing}>IMPROVE YOUR RANKING ON VARIOUS LEADERBOARDS</h6>
            </div>
          </div>
        </div>

        <div className={styles.container3}>
          <p>About Us</p>
          <h1>Every Crypto-Lover’s Fantasy</h1>
          <p>In Crypto Cup, users can create or register for cups to compete against their friends. Users bet on the upcoming performance of various cryptocurrencies. It’s like Fantasy for crypto-lovers!</p>
          <p>Crypto Cup is an application made by Mark Drewry, Andrew Gil, Amer Khalifa, Nickolas Phen, Rohan Samanta, and Andrea Relova for our University of Florida Computer Science Senior Project. Go Gators!</p>
          <p>FAQ</p>
          <h1>Frequently Asked Questions</h1>
          <p>What is Crypto Cup?</p>
          <p>See above.</p>
          <p>How do I start playing?</p>
          <p>Create an account with the “launch” button above. Then, join an existing cup with a registration code or create your own cup and send the link to your friends. Crypto Cup will walk you through the rest!</p>
          <p>What cryptocurrencies are available to “bet” on in Crypto Cup?</p>
          <p>Right now, ___ are available to bet on in cups.</p>
        </div>

        <div className={styles.footer}>
          <h1 className={styles.title}>
            Crypto Cup
          </h1>
          <div className={styles.launch}>
            <p>ABOUT</p>
            <p className={styles.faq}>FAQ</p>
            <Link
                href={{
                  pathname: "/login"
                }}
                >
              <a className={styles.login}>LOG IN/SIGN UP</a>
            </Link>
        </div>
          </div>
          

        
    </div>
  )
}

export default Home
