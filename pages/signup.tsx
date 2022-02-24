import type { NextPage } from 'next'
import Head from 'next/head'
import homestyles from '../styles/Home.module.css'
import styles from '../styles/Signup.module.css'
import { styled } from '@mui/material/styles';
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router"
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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import * as React from 'react';

const Signup: NextPage = () => {
    const router = useRouter()
    const {
      query: { id },
    } = router

    const StyledTextField = styled(InputBase)(({ theme }) => ({
      "&": {
        marginTop: '9px'
      },
      '& .MuiInputBase-input': {
        borderRadius: 25,
        fontFamily: 'Space Mono',
        fontSize: 20,
        color: '#ffffff',
        backgroundColor: 'rgba(47, 56, 105, 0.6)',
        width: 500,
        padding: '15px 15px',
      },
      '&:focus': {
        borderRadius: 25,
      },
    }));

    const BirthdayTextField = styled(InputBase)(({ theme }) => ({
      "&": {
        marginTop: '6px'
      },
      '& .MuiInputBase-input': {
        borderRadius: 25,
        fontFamily: 'Space Mono',
        fontSize: 20,
        color: '#ffffff',
        backgroundColor: 'rgba(47, 56, 105, 0.6)',
        width: 140,
        padding: '15px 15px',
      },
      '& .css-1uwzc1h-MuiSelect-select-MuiInputBase-input:focus': {
        borderRadius: 25,
      },
      '&:focus': {
        borderRadius: 25,
        padding: '15px 15px',
      },
      '& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon': {
        color: '#ffffff',
      },
      '& .css-bpeome-MuiSvgIcon-root-MuiSelect-icon': {
        color: '#ffffff',
      }
    }));

    const useStyles = makeStyles(theme => ({
      root: {
        "& .css-ahj2mt-MuiTypography-root": {
          color: '#ffffff',
          fontSize: "20px",
          fontFamily: "Space Mono",
          width: '500px',
          marginTop: '30px',
        }
      }
    }));
    const classes = useStyles();

    const [month, setMonth] = React.useState('');

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setMonth(event.target.value);
    };
  
    return (
      <div className={homestyles.container}>
        <Head>
          <title>Sign Up</title>
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
              <h2 className={styles.signup}>
                  Sign Up&nbsp;
              </h2>
              <h2 className={styles.or}>
                  or&nbsp;
              </h2>
              <Link
                href={{
                  pathname: "/login",
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
                    width: 164,
                    color: "white",
                    justifyContent: "flex-start",
                    textTransform: "none",
                    marginLeft: -5,
                  }}
                >
                  Log In
                </Button>
              </Link>
            </Grid>
            <Grid className={styles.labelSpacing} item xs>
              <p>Email</p>
            </Grid>
            <Grid item xs>
              <StyledTextField/>
            </Grid>
            <Grid className={styles.labelSpacing} item xs>
              <p>Password</p>
            </Grid>
            <Grid item xs>
              <StyledTextField/>
            </Grid>
            <Grid className={styles.labelSpacing} item xs>
              <p>Confirm Password</p>
            </Grid>
            <Grid item xs>
              <StyledTextField/>
            </Grid>
            <Grid className={styles.labelSpacing} item xs>
              <p>Birthday</p>
            </Grid>

            <Grid container>
              <Grid item xs={3}>
                <Select
                  value={month}
                  displayEmpty
                  input={<BirthdayTextField/>}
                  onChange={handleChange}
                  IconComponent={KeyboardArrowDownIcon}
                  >
                  <MenuItem disabled value=""> Month </MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={11}>11</MenuItem>
                  <MenuItem value={12}>12</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={2.8}>
                <BirthdayTextField placeholder="Day"/>
              </Grid>
              <Grid item xs>
                <BirthdayTextField placeholder="Year"/>
              </Grid>
            </Grid>
            
            <Grid container item xs>
              <FormControlLabel
              className={classes.root}
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
                label="I agree to the Terms of Service and Privacy Policy."
                labelPlacement="end"
              />
            </Grid>            

            <Grid item xs>
              <div className={styles.signupButton}>
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
                >
                  Sign Up
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
  
  export default Signup