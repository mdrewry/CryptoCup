import type { NextPage } from "next";
import Head from "next/head";
import styles from '../styles/CupDetails.module.css'
import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/router"
import { UserContext } from "../context/UserProvider";
import Router from "next/router";

const CupDetails: NextPage = () => {
    const router = useRouter();
    const {
      query: { id },
    } = router;

    const user = useContext(UserContext);
  
    return (
      <div>
        <Head>
          <title>CupDetails</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={styles.placeholder}></div>
        <div className={styles.container}>
            <h4>This Cup is currently accepting players. Join now!</h4>
            <Button
                style={{
                    background: "#2F3869",
                    fontFamily: "Space Mono",
                    fontSize: 20,
                    borderRadius: 60,
                    fontWeight: 700,
                    height: 50,
                    padding: 10,
                    width: 251,
                    color: "white",
                    marginTop: 21,
                    marginBottom: 34,
                }}
            >
            Request to Join
            </Button>
            <h5>Cup Name</h5>
            <h6 className={styles.commis}>Cup Commissioner:</h6>
            <h6 className={styles.detail}>Buy-In:</h6>
            <h6 className={styles.detail}>START DATE - END DATE</h6>
        </div>
      </div>
    )
  }
    
    export default CupDetails