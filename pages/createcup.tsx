import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import createCupStyles from "../styles/createcup.module.css";
import styles from "../styles/Login.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import CircleIcon from "@mui/icons-material/Circle";
const initValues = {
  cupName: "",
  password: "",
  startDate: new Date(),
  endDate: new Date(),
  buyIn: 0,
  inGameBudget: 1000,
};
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
  tos: {
    "& .css-ahj2mt-MuiTypography-root": {
      color: "#ffffff",
      fontSize: "20px",
      fontFamily: "Space Mono",
    },
  },
}));

const CreateCup: NextPage = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [values, setValues] = useState(initValues);
  const [errors, setErrors] = useState({} as any);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const handleInputValue = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    validate({ [name]: value });
  };

  const validate: any = (fieldValues = values) => {
    let temp: any = { ...errors };

    if ("cupName" in fieldValues) {
      temp.cupName = fieldValues.cupName ? "" : "This field is required.";
    }

    if ("password" in fieldValues) {
      temp.password = fieldValues.password ? "" : "This field is required.";
      if (fieldValues.password)
        temp.password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(
          fieldValues.password
        )
          ? ""
          : "Password must be at least 6 characters long containing numbers and letters.";
    }
    if ("startDate" in fieldValues) {
      if (fieldValues.startDate < new Date())
        temp.startDate = "Start date must be after current date.";
      else if (fieldValues.startDate >= values.endDate)
        temp.endDate = "Start date must be before end date.";
      else temp.endDate = "";
    }
    if ("endDate" in fieldValues) {
      if (fieldValues.endDate < new Date())
        temp.endDate = "Start date must be after current date.";
      else if (fieldValues.endDate <= values.startDate)
        temp.endDate = "End date must be after start date.";
      else temp.endDate = "";
    }
    if ("buyIn" in fieldValues) {
      temp.buyIn =
        fieldValues.buyIn <= 0 ? "Buy In must be greater than 0." : "";
    }
    if ("inGameBudget" in fieldValues) {
      temp.inGameBudget =
        fieldValues.inGameBudget <= 1000
          ? "Buy In must be greater than $1000."
          : "";
    }
    setErrors({
      ...temp,
    });
  };

  const formIsValid = (fieldValues = values) => {
    const isValid = Object.values(errors).every((x) => x === "");
    return isValid;
  };

  const createCup = async () => {
    validate(values);
    if (formIsValid()) {
      try {
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={createCupStyles.page}>
      <div className={createCupStyles.header}>
        <h1>Create a Cup</h1>
        <h6>
          As the Cup Commissioner, only you can customize the cup and scoring
          settings.
        </h6>
      </div>
      <div className={createCupStyles.container}>
        <FormControl>
          {page == 0 ? (
            <Grid>
              <Grid item xs={12}>
                <h4>1. Basic Information</h4>
              </Grid>
              <Grid item xs={12}>
                <p className={createCupStyles.fieldName}>Cup Name: </p>
                <TextField
                  className={classes.textField}
                  name="cupName"
                  onChange={handleInputValue}
                  onBlur={handleInputValue}
                  {...(errors["cupName"] && {
                    error: true,
                    helperText: errors["cupName"],
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <p className={createCupStyles.fieldName}>Cup Password: </p>
                <TextField
                  className={classes.textField}
                  name="password"
                  type="password"
                  onChange={handleInputValue}
                  onBlur={handleInputValue}
                  {...(errors["password"] && {
                    error: true,
                    helperText: errors["password"],
                  })}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid>
              <Grid item xs={12}>
                <h4>2. Cup Settings</h4>
              </Grid>
            </Grid>
          )}
        </FormControl>
        <Stack direction="row">
          <IconButton onClick={(e) => handleChange(e, 0)}>
            <CircleIcon color={page == 1 ? "primary" : "secondary"} />
          </IconButton>
          <IconButton onClick={(e) => handleChange(e, 1)}>
            <CircleIcon color={page == 0 ? "primary" : "secondary"} />
          </IconButton>
        </Stack>
      </div>
    </div>
  );
};
export default CreateCup;
