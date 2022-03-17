import type { NextPage } from "next";
import Head from "next/head";
import homestyles from "../styles/Home.module.css";
import styles from "../styles/Signup.module.css";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import Logo from "../Icons/Logo.js";
import LaunchButton from "../Components/LaunchButton.js";
import Graph from "../Icons/Graph.js";
import Grid from "@mui/material/Grid";
import InputBase from "@mui/material/InputBase";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CircleIcon from "@mui/icons-material/Circle";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Link from "next/link";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useState, useEffect, useContext, useRef } from "react";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";

const Signup: NextPage = () => {
  const useStyles = makeStyles((theme) => ({
    textField: {
      [`& fieldset`]: {
        borderRadius: 25,
      },
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
    },
    birthday: {
      [`& fieldset`]: {
        borderRadius: 25,
      },
      "&": {
        marginTop: "6px",
      },
      "& .MuiInputBase-input": {
        borderRadius: 25,
        fontFamily: "Space Mono",
        fontSize: 20,
        color: "#ffffff",
        backgroundColor: "rgba(47, 56, 105, 0.6)",
        width: 140,
        padding: "15px 15px",
      },
    },
    tos: {
      "& .css-ahj2mt-MuiTypography-root": {
        color: "#ffffff",
        fontSize: "20px",
        fontFamily: "Space Mono",
        width: "500px",
        marginTop: "30px",
      },
    },
  }));
  const classes = useStyles();

  const months = [1,2,3,4,5,6,7,8,9,10,11,12];
  const [wallet, setWallet] = React.useState("");

  const initialFormValues = {
    first: "",
    last: "",
    email: "",
    password: "",
    confirm: "",
    month: "",
    day: "",
    year: "",
    tos: false,
  }
  const [values, setValues] = useState(initialFormValues);
  const [tosError, setTosError] = useState(false);
  const [errors, setErrors] = useState({} as any);

  const validate: any = (fieldValues = values) => {
    let temp: any = { ...errors }

    if ("first" in fieldValues)
      temp.first = fieldValues.first ? "" : "This field is required."

    if ("last" in fieldValues)
      temp.last = fieldValues.last ? "" : "This field is required."

    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : "This field is required."
      if (fieldValues.email)
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ""
          : "Email is not valid."
    }

    if ("password" in fieldValues)
      temp.password =
        fieldValues.password ? "" : "This field is required."

    if ("confirm" in fieldValues)
      temp.confirm =
        fieldValues.confirm ? "" : "This field is required."
    
    if ("month" in fieldValues)
      temp.month =
        fieldValues.month ? "" : "This field is required."

    if ("day" in fieldValues)
      temp.day =
        fieldValues.day ? "" : "This field is required."

    if ("year" in fieldValues)
      temp.year =
        fieldValues.year ? "" : "This field is required."
    
    if ("tos" in fieldValues)
      fieldValues.tos ? setTosError(false) : setTosError(true)

    setErrors({
      ...temp
    });
  }

  const handleTos = (e: any) => {
    setValues({
      ...values,
      ["tos"]: e.target.checked
    });
  }

  const handleInputValue = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    validate({ [name]: value });
  };

  const formIsValid = (fieldValues = values) => {
    const isValid =
      fieldValues.first && fieldValues.last &&
      fieldValues.email && fieldValues.password &&
      fieldValues.confirm && fieldValues.day &&
      fieldValues.month && fieldValues.year &&
      fieldValues.tos
      Object.values(errors).every((x) => x === "");

    return isValid;
  };

  // const handleFormSubmit = async (e: any) => {
  //   e.preventDefault();
  //   if (formIsValid()) {
  //     // await postContactForm(values);
  //     alert("You've posted your form!")
  //   }
  // };

  async function signUp() {
    validate(values);
    if(formIsValid()){
      try {
        const fullname = values.first+" "+values.last;
        const email = values.email;
        const password = values.password;
        const birthday = values.month+"/"+values.day+"/"+values.year;
        const response = await fetch("/api/signup", {
          method: "POST",
          body: JSON.stringify({ fullname, email, password, birthday, wallet }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.error) {
          alert(data.error.message);
        } else {
          alert("User created.");
        }
      } catch (error) {
        alert(error);
      }
    }
  }

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
            <h2 className={styles.signup}>Sign Up&nbsp;</h2>
            <h2 className={styles.or}>or&nbsp;</h2>
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
          {/* <form autoComplete="off" onSubmit={handleFormSubmit}></form> */}
          <FormControl>
            <Grid className={styles.labelSpacing} item xs>
              <p>First Name</p>
            </Grid>
            <Grid item xs>
              <TextField
                className={classes.textField}
                onChange={handleInputValue}
                onBlur={handleInputValue}
                name={"first"}
                {...(errors["first"] && {
                  error: true,
                  helperText: errors["first"]
                })}
              />
            </Grid>
          </FormControl>
          <FormControl>
            <Grid className={styles.labelSpacing} item xs>
              <p>Last Name</p>
            </Grid>
            <Grid item xs>
              <TextField
                className={classes.textField}
                onChange={handleInputValue}
                onBlur={handleInputValue}
                name={"last"}
                {...(errors["last"] && {
                  error: true,
                  helperText: errors["last"]
                })}
              />
            </Grid>
          </FormControl>
          <FormControl>
            <Grid className={styles.labelSpacing} item xs>
              <p>Email</p>
            </Grid>
            <Grid item xs>
              <TextField
                className={classes.textField}
                onChange={handleInputValue}
                onBlur={handleInputValue}
                name={"email"}
                {...(errors["email"] && {
                  error: true,
                  helperText: errors["email"]
                })}
              />
            </Grid>
          </FormControl>
          <FormControl>
            <Grid className={styles.labelSpacing} item xs>
              <p>Password</p>
            </Grid>
            <Grid item xs>
              <TextField
                className={classes.textField}
                onChange={handleInputValue}
                onBlur={handleInputValue}
                name={"password"}
                type="password"
                {...(errors["password"] && {
                  error: true,
                  helperText: errors["password"]
                })}
              />
            </Grid>
          </FormControl>
          <FormControl>
            <Grid className={styles.labelSpacing} item xs>
              <p>Confirm Password</p>
            </Grid>
            <Grid item xs>
              <TextField
                className={classes.textField}
                onChange={handleInputValue}
                onBlur={handleInputValue}
                name={"confirm"}
                type="password"
                {...(errors["confirm"] && {
                  error: true,
                  helperText: errors["confirm"]
                })}
              />
            </Grid>
          </FormControl>
          <Grid className={styles.labelSpacing} item xs>
            <p>Birthday</p>
          </Grid>

          <Grid container>
            <Grid item xs={3}>
              <TextField
                className={classes.birthday}
                select
                onChange={handleInputValue}
                onBlur={handleInputValue}
                placeholder="Month"
                type="number"
                name={"month"}
                {...(errors["month"] && {
                  error: true,
                  helperText: errors["month"]
                })}
              >
                <MenuItem value="Month" disabled>Month</MenuItem>
                {months.map((index) => (
                  <MenuItem value={index}>{index}</MenuItem>
                ))}
              </TextField>

            </Grid>
            <Grid item xs={2.8}>
              <TextField
                className={classes.birthday}
                onChange={handleInputValue}
                onBlur={handleInputValue}
                placeholder="Day"
                type="number"
                name={"day"}
                {...(errors["day"] && {
                  error: true,
                  helperText: errors["day"]
                })}
              />
            </Grid>
            <Grid item xs>
              <TextField
                className={classes.birthday}
                onChange={handleInputValue}
                onBlur={handleInputValue}
                placeholder="Year"
                type="number"
                name={"year"}
                {...(errors["year"] && {
                  error: true,
                  helperText: errors["year"]
                })}
              />
            </Grid>
          </Grid>

          <Grid container item xs>
            <FormControl error={true}>
              <FormControlLabel
                className={classes.tos}
                control={
                  <Checkbox
                    className={styles.checkboxPos}
                    onChange={handleTos}
                    sx={{
                      color: "rgba(47, 56, 105, 0.6)",
                      "&.Mui-checked": {
                        color: "#6B58B8",
                      },
                    }}
                    icon={<CircleIcon />}
                    checkedIcon={<CircleIcon />}
                    name={"tos"}
                  />
                }
                label="I agree to the Terms of Service and Privacy Policy."
                labelPlacement="end"
              />
              {tosError ? <FormHelperText>This field is required.</FormHelperText> : <div></div>}
            </FormControl>
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
                onClick={signUp}
                // type="submit"
                // disabled={!formIsValid()}
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
  );
};

export default Signup;
