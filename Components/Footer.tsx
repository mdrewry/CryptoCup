import React, { useContext } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import styles from "../styles/Footer.module.css";
import Grid from "@mui/material/Grid";
import Logo from "../Icons/Logo.js";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase.config";
import { UserContext } from "../context/UserProvider";
const Footer = () => {
  const user = useContext(UserContext);
  async function logout() {
    try {
      await signOut(auth);
      alert("Log Out Success!");
    } catch (error) {
      console.log(error);
      alert("Error signing out.");
    }
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
            <h6>ABOUT</h6>
          </Grid>
          <Grid item xs={3}>
            <h6>FAQ</h6>
          </Grid>
          <Grid item xs>
            {user.uid ? (
              <Button onClick={logout}>
                <a>SIGN OUT</a>
              </Button>
            ) : (
              <Link
                href={{
                  pathname: "/login",
                }}
              >
                <a>LOG IN/SIGN UP</a>
              </Link>
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
