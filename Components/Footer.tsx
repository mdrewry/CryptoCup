import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import styles from "../styles/Footer.module.css";
import Grid from '@mui/material/Grid';
import Logo from "../Icons/Logo.js";

const Footer = () => {
    return (
        <Grid className={styles.footer} container spacing={0}>
            <Grid item xs={8.9}>
                <div className={styles.containerLogo}>
                    <div className={styles.logo}>
                        <Logo />
                    </div>
                    <h2 className={styles.title}>Crypto Cup</h2>
                </div>
            </Grid>

            <Grid item xs>
                <div className={styles.footer1}>
                    <Grid item xs={3.5}>
                        <h6>ABOUT</h6>
                    </Grid>
                    <Grid item xs={3}>
                        <h6>FAQ</h6>
                    </Grid>
                    <Grid item xs>
                        <Link
                        href={{
                            pathname: "/login"
                        }}
                        >
                        <a>LOG IN/SIGN UP</a>
                        </Link>
                    </Grid>
                </div>
                <Grid item xs className={styles.tos}>
                    <Grid item xs>
                        <h6>Insert License Here</h6>
                    </Grid>
                    <Grid item xs>
                        <h6>Terms of Service</h6>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
  };
  export default Footer;