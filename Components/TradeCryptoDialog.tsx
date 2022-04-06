import React, { useContext, useState } from "react";
import createCupStyles from "../styles/createcup.module.css";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import ActionDialog from "./ActionDialog";
import { UserContext } from "../context/UserProvider";
import { getSmartContract } from "../functions/smartContract";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase.config";
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
type DistributePrizesDialogProps = {
  cup: { id: String; userPortfolio: any };
};

const TradeCryptoDialog = ({ cup }: DistributePrizesDialogProps) => {
  const initValues = {
    transferFrom: "USD",
    transferAmount: "",
    transferTo: "BTC",
  };
  const user = useContext(UserContext);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [errors, setErrors] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initValues);
  const toggleDialog = () => {
    setOpen(!open);
    setErrorText("ㅤ");
    setValues(initValues);
    setErrors([]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/tradecrypto", {
        method: "POST",
        body: JSON.stringify({
          userID: user.uid,
          cupID: cup.id,
          userPortfolio: cup.userPortfolio,
          trade: values,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.error) {
        setErrorText(data.error);
        throw data.error;
      }
      setErrorText(data.error);
    } catch (err: any) {
      console.log(err);
    }
    setLoading(false);
    toggleDialog();
  };
  const handleInputValue = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);
    setValues({
      ...values,
      [name]: value,
    });
    validate({ [name]: value });
  };

  const validate: any = (fieldValues = values) => {
    let temp: any = { ...errors };
    if (fieldValues.transferFrom) {
      if (cup.userPortfolio[fieldValues.transferFrom] > 0) {
        temp.transferFrom = "";
        setErrorText("");
      } else {
        setErrorText("Select a currency with a balance.");
        temp.transferFrom = "Select a valid currency.";
      }
    }
    if (fieldValues.transferAmount) {
      const regexCheck = /^[0-9]{1,5}(?:\.[0-9]{1,5})?$/.test(
        fieldValues.transferAmount
      );
      if (!regexCheck) {
        temp.transferAmount = "Enter a valid number.";
      } else if (
        cup.userPortfolio[values.transferFrom] >=
        parseFloat(fieldValues.transferAmount)
      ) {
        temp.transferAmount = "";
      } else {
        temp.transferAmount = "Enter a valid amount.";
      }
    }
    if (fieldValues.transferFrom) {
      if (fieldValues.transferFrom === fieldValues.transferTo)
        temp.transferTo = "Cannot transfer between same currency.";
      else temp.transferTo = "";
    }
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  return (
    <div>
      <Button
        style={{
          background: "#2F3869",
          fontFamily: "Space Mono",
          fontSize: 20,
          borderRadius: 60,
          fontWeight: 700,
          height: 50,
          padding: 10,
          width: 260,
          color: "white",
          marginBottom: 30,
        }}
        onClick={toggleDialog}
      >
        Trade Crypto
      </Button>

      <ActionDialog
        name="Trade Crypto"
        prompt="Want to change your portfolio? Trade your currencies and rebalance your wallet."
        submitButtonText="Trade"
        errorText={errorText}
        open={open}
        loading={loading}
        handleSubmit={handleSubmit}
        toggleDialog={toggleDialog}
      >
        <p className={createCupStyles.fieldName}>Transfer From: </p>
        <Select
          className={classes.textField}
          name="transferFrom"
          value={values.transferFrom}
          onChange={handleInputValue}
          {...(errors["transferFrom"] && {
            error: true,
            helperText: errors["transferFrom"],
          })}
        >
          {Object.keys(cup.userPortfolio).map((key) => (
            <MenuItem key={key} value={key}>
              {key} {`(Available: ${cup.userPortfolio[key]})`}
            </MenuItem>
          ))}
        </Select>
        <p className={createCupStyles.fieldName}>Amount: </p>
        <TextField
          className={classes.textField}
          name="transferAmount"
          value={values.transferAmount}
          onChange={handleInputValue}
          onBlur={handleInputValue}
          {...(errors["transferAmount"] && {
            error: true,
            helperText: errors["transferAmount"],
          })}
        />
        <p className={createCupStyles.fieldName}>Transfer To: </p>
        <Select
          className={classes.textField}
          value={values.transferTo}
          name="transferTo"
          onChange={handleInputValue}
          {...(errors["transferTo"] && {
            error: true,
            helperText: errors["transferTo"],
          })}
        >
          {Object.keys(cup.userPortfolio).map((key) => (
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </ActionDialog>
    </div>
  );
};
export default TradeCryptoDialog;
