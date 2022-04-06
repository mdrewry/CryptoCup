import type { NextPage } from "next";
import Head from "next/head";
import styles from '../styles/Dashboard.module.css'
import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/router"
import { UserContext } from "../context/UserProvider";
import Router from "next/router";
import cupstyles from "../styles/Cups.module.css";
import { db } from "../config/firebase.config";
import {
  collection,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
  Timestamp,
  addDoc,
} from "firebase/firestore";
import Grid from "@mui/material/Grid";
import moment from "moment";
import Cup from "../Components/ViewCup";

const Dashboard: NextPage = () => {
    const router = useRouter();
    const {
      query: { id },
    } = router;

    const user = useContext(UserContext);

    return (
      <div className={styles.container}>
        <Head>
          <title>Dashboard</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={styles.title}>
          <h2>Welcome,&nbsp;</h2>
          <h2 className={styles.firstname}>{user.firstName}</h2>
        </div>
        <h4 className={styles.invest}>Invest in an Upcoming Cup:</h4>
        <Cup filter={1} cupNameFilter={""} />
        <h4 className={styles.invest}>Make some trades:</h4>
        <Cup filter={0} cupNameFilter={""} />
      </div>
    )
  }

export default Dashboard;
