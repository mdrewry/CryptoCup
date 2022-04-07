import React, { useState, useContext } from "react";
import type { NextPage } from "next";
import { BigNumber } from "ethers";
import Web3 from "web3";
import Head from "next/head";
import Router from "next/router";
import createCupStyles from "../styles/createcup.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import CircleIcon from "@mui/icons-material/Circle";
import CircularProgress from "@mui/material/CircularProgress";
import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";
import { UserContext } from "../context/UserProvider";
import { getSmartContract } from "../functions/smartContract";

const initValues = {
  cupName: "",
  password: "",
  startDate: moment(new Date()).add(1, "days"),
  endDate: moment(new Date()).add(2, "days"),
  buyIn: "0.05",
  inGameBudget: 10000,
  playerCuts: [3, 5, 10],
};

const useStyles = makeStyles((theme) => ({
  datePickerTextField: {
    [`& fieldset`]: {
      borderRadius: 25,
    },
    "&": {
      marginTop: "9px",
    },
    "& .MuiFormHelperText-root": {
      color: "#ffffff",
    },
    "& .MuiInputBase-root": {
      width: "530px",
      backgroundColor: "rgba(47, 56, 105, 0.6)",
      borderRadius: 25,
      color: "#ffffff",
    },
    "& .MuiButtonBase-root": {
      color: "#ffffff",
    },
    "& .MuiInputBase-input": {
      fontFamily: "Space Mono",
      fontSize: 20,
      padding: "15px 15px",
    },
  },
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
  const user = useContext(UserContext);
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
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
      if (fieldValues.startDate < moment(new Date()))
        temp.startDate = "Start date must be after current date.";
      else if (fieldValues.startDate >= values.endDate)
        temp.startDate = "Start date must be before end date.";
      else temp.startDate = "";
    }
    if ("endDate" in fieldValues) {
      if (fieldValues.endDate < moment(new Date()))
        temp.endDate = "End date must be after current date.";
      else if (fieldValues.endDate <= values.startDate)
        temp.endDate = "End date must be after start date.";
      else temp.endDate = "";
    }
    if ("buyIn" in fieldValues) {
      temp.buyIn = /^[0-9]{1,2}(?:\.[0-9]{1,5})?$/.test(fieldValues.buyIn)
        ? ""
        : "Buy In must be a valid eth value";
    }
    if ("inGameBudget" in fieldValues) {
      temp.inGameBudget =
        fieldValues.inGameBudget <= 1000
          ? "Buy In must be greater than $1000."
          : "";
    }
    if ("playerCuts" in fieldValues) {
      temp.playerCuts = "";
    }
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const createCupContract = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const factoryContract = await getSmartContract(user.wallet, "");
      const txn = await factoryContract.newCup(
        BigNumber.from(Web3.utils.toWei(values.buyIn, "ether")),
        values.playerCuts
      );
      const receipt = await txn.wait();
      const event = receipt.events?.find(
        (event: any) => event.event === "CupCreated"
      );
      const ethAddress: string = event?.args!["newCupAddress"];
      await createCup(ethAddress);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const createCup = async (ethAddress: string) => {
    if (validate(values)) {
      try {
        const response = await fetch("/api/createcup", {
          method: "POST",
          body: JSON.stringify({
            director: user.uid,
            ethAddress,
            ...values,
            buyIn: parseFloat(values.buyIn),
            startDate: values.startDate.toDate(),
            endDate: values.endDate.toDate(),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.error) throw data.error.message;
        Router.push("/dashboard");
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
  };

  return (
    <div className={createCupStyles.page}>
      <Head>
        <title>Create Cup</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={createCupStyles.header}>
        <h1>Create a Cup</h1>
        <h6>
          As the Cup Commissioner, only you can customize the cup and scoring
          settings.
        </h6>
      </div>
      <div className={createCupStyles.container}>
        {loading ? (
          <div className={createCupStyles.loading}>
            <CircularProgress />
          </div>
        ) : (
          <form autoComplete="off" onSubmit={createCupContract}>
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
                      value={values.cupName}
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
                      value={values.password}
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
                  <Grid item xs={12} md={6}>
                    <p className={createCupStyles.fieldName}>Start Date: </p>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DatePicker
                        value={values.startDate}
                        onChange={(newValue) =>
                          handleInputValue({
                            target: { name: "startDate", value: newValue },
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            className={classes.datePickerTextField}
                            {...(errors["startDate"] && {
                              error: true,
                              helperText: errors["startDate"],
                            })}
                            {...params}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <p className={createCupStyles.fieldName}>End Date: </p>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DatePicker
                        value={values.endDate}
                        onChange={(newValue) =>
                          handleInputValue({
                            target: { name: "endDate", value: newValue },
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            className={classes.datePickerTextField}
                            {...(errors["endDate"] && {
                              error: true,
                              helperText: errors["endDate"],
                            })}
                            {...params}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <p className={createCupStyles.fieldName}>Buy-In(ETH): </p>
                    <TextField
                      className={classes.textField}
                      name="buyIn"
                      value={values.buyIn}
                      onChange={handleInputValue}
                      onBlur={handleInputValue}
                      {...(errors["buyIn"] && {
                        error: true,
                        helperText: errors["buyIn"],
                      })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <p className={createCupStyles.fieldName}>
                      Player In-Game Budget:
                    </p>
                    <TextField
                      className={classes.textField}
                      name="inGameBudget"
                      value={values.inGameBudget}
                      type="number"
                      onChange={handleInputValue}
                      onBlur={handleInputValue}
                      {...(errors["inGameBudget"] && {
                        error: true,
                        helperText: errors["inGameBudget"],
                      })}
                    />
                  </Grid>
                  <Grid className={createCupStyles.center} item xs={12}>
                    <Button
                      style={{
                        marginTop: "20px",
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
                      type="submit"
                    >
                      Create Cup
                    </Button>
                    <Grid className={createCupStyles.center} item xs={12}>
                      {user.wallet ? (
                        <></>
                      ) : (
                        <p style={{ color: "red", fontStyle: "italic", marginTop: "15px", marginBottom: "5px" }}>
                          There is no wallet connected to this account.
                        </p>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </FormControl>
          </form>
        )}

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
