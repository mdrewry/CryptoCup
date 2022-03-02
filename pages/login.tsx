import type { NextPage } from 'next'
import Head from 'next/head'
import homestyles from '../styles/Home.module.css'
import styles from '../styles/Login.module.css'
import { makeStyles } from "@material-ui/core/styles";
import Router, { useRouter } from "next/router"
import Logo from "../Icons/Logo.js";
import LaunchButton from "../Components/LaunchButton.js";
import Graph from "../Icons/Graph.js";
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CircleIcon from '@mui/icons-material/Circle';
import Button from "@mui/material/Button";
import Link from "next/link";
import FormControl from "@mui/material/FormControl";
import React, { useState, useEffect, useContext, useRef } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../config/firebase.config";

const Login: NextPage = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const useStyles = makeStyles(theme => ({
    textField: {
      "&": {
        marginTop: "9px",
      },
      "& .MuiInputBase-input": {
        borderRadius: 25,
        fontFamily: "Space Mono",
        fontSize: 20,
        color: "#ffffff",
        backgroundColor: "rgba(47, 56, 105, 0.6)",
        width: 500,
        padding: "15px 15px",
      },
      "&:focus": {
        borderRadius: 25,
      },
    },
    tos: {
      "& .css-ahj2mt-MuiTypography-root": {
        color: '#ffffff',
        fontSize: "20px",
        fontFamily: "Space Mono",
      }
    }
  }));
  const classes = useStyles();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const changeEmail = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };

  const changePassword = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  async function signIn() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Router.push("/");
      alert("Log In Successful!");
    } catch (error) {
      console.log(error);
      alert("Error signing in.");
    }
  }

  return (
    <div className={homestyles.container}>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Grid container spacing={0} alignItems="center">
        <Grid item xs={9}>
          <div className={homestyles.containerLogo}>
            <div className={homestyles.logo}>
              <Logo />
            </div>
            <h2 className={homestyles.title}>Crypto Cup</h2>
          </div>
        </Grid>
        <Grid item xs>
          <h6>ABOUT</h6>
        </Grid>
        <Grid item xs={0.8}>
          <h6>FAQ</h6>
        </Grid>
        <Grid item xs>
          <LaunchButton variant="contained">LAUNCH</LaunchButton>
        </Grid>
      </Grid>

      <Grid className={styles.loginContainer}>
        <Grid item xs>
          <Grid className={styles.titleContainer} item xs>
            <h2 className={styles.login}>
                Log In&nbsp;
            </h2>
            <h2 className={styles.or}>
                or&nbsp;
            </h2>
            <Link
              href={{
                pathname: "/signup",
              }}
              >
              <Button
                style={{
                  background: "#13172C",
                  fontFamily: "Epilogue",
                  fontSize: 48,
                  borderRadius: 60,
                  fontWeight: 300,
                  height: 60,
                  padding: 10,
                  width: 200,
                  color: "white",
                  justifyContent: "flex-start",
                  textTransform: "none",
                  marginLeft: -5,
                }}
              >
                Sign Up
              </Button>
            </Link>
          </Grid>

          <FormControl>
            <Grid className={styles.labelSpacing} item xs>
              <p>Email</p>
            </Grid>
            <Grid item xs>
              <InputBase
                className={classes.textField}
                onChange={changeEmail}
                value={email}
                type="email"
              />
            </Grid>
          </FormControl>
          <FormControl>
            <Grid className={styles.labelSpacing} item xs>
              <p>Password</p>
            </Grid>
            <Grid item xs>
              <InputBase
                className={classes.textField}
                onChange={changePassword}
                value={password}
                type="password"
              />
            </Grid>
          </FormControl>
          <div className={styles.forgor}>
            <Grid className={styles.forgot} item xs>
              <p>Forgot Password?</p>
            </Grid>
          </div>
          
          <Grid item xs>
            <FormControlLabel
            className={classes.tos}
              control={
                <Checkbox
                  className={styles.checkboxPos}
                  sx={{
                    color: 'rgba(47, 56, 105, 0.6)',
                    '&.Mui-checked': {
                      color: '#6B58B8',
                    },}}
                  icon={<CircleIcon />} 
                  checkedIcon={<CircleIcon />} 
                />}
              label="Remember Me"
              labelPlacement="end"
            />
          </Grid>            

          <Grid item xs>
            <div className={styles.loginButton}>
              <Button
                style={{
                  background: "rgba(47, 56, 105, 0.6)",
                  fontFamily: "Space Mono",
                  fontSize: 20,
                  borderRadius: 25,
                  fontWeight: 700,
                  height: 50,
                  padding: 10,
                  width: 214,
                  color: "white",
                  textTransform: "none",
                }}
                onClick={signIn}
              >
                Log In
              </Button>
            </div>
          </Grid>
        </Grid>
      
        <Grid item xs>
          <Graph />
        </Grid>
      </Grid>
    </div>
  )
}
  
  export default Login