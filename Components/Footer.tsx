import React, { useContext } from "react";
import Button from "@mui/material/Button";
import styles from "../styles/Footer.module.css";
import Grid from "@mui/material/Grid";
import Logo from "../Icons/Logo.js";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase.config";
import { UserContext } from "../context/UserProvider";
import Router from "next/router";

const Footer = () => {
  const user = useContext(UserContext);
  
  async function logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
      alert("Error signing out.");
    }
  }

  async function login() {
    Router.push("/login");
  }

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
            <Button onClick={() => window.location.replace("/#about")}>
              <a>ABOUT</a>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button onClick={() => window.location.replace("/#faq")}>
              <a>FAQ</a>
            </Button>
          </Grid>
          <Grid item xs>
            {user.uid ? (
              <Button onClick={logout}>
                <a>SIGN OUT</a>
              </Button>
            ) : (
              <Button onClick={login}>
                <a>LOG IN/SIGN UP</a>
              </Button>
            )}
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
