import type { NextPage } from "next";
import Head from "next/head";
import styles from '../styles/Dashboard.module.css'
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router"
import { UserContext } from "../context/UserProvider";
import Cup from "../Components/DashboardView";

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
        <h4 className={styles.invest}>Make a quick trade or check out a leaderboard here.</h4>
        <Cup/>
      </div>
    )
  }

export default Dashboard;
