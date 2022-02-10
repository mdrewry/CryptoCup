import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link"


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Crypto Cup</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        
        <div className={styles.navbar}>
          <h1 className={styles.title}>
            Crypto Cup
          </h1>
          <div className={styles.launch}>
            <p>ABOUT</p>
            <p className={styles.faq}>FAQ</p>
            <p className={styles.launchButton}>LAUNCH</p>
          </div>
        </div>

        <div className={styles.summaryContainer}>
          <h1 className={styles.newage}>
              A New Age of Fantasy with
          </h1>
          <h1 className={styles.title1}>
            Crypto Cup
          </h1>
          <p>Crypto Cup is an application that allows users to draft, compete, and keep track of live analytics on the top cryptocurrencies with ease. </p>
          <p className={styles.launchCup}>LAUNCH CRYPTO CUP</p>
        </div>

        <div className={styles.container1}>
          <p>CREATE AND COMPETE IN CUPS WITH YOUR FRIENDS</p>
        </div>

        <div className={styles.container2}>
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
