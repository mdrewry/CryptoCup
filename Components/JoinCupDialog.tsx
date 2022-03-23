import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "../styles/Footer.module.css";
import { UserContext } from "../context/UserProvider";
import { Cup } from "../lib.d";
type JoinCupProps = { cup: Cup };
const JoinCupDialog = ({ cup }: JoinCupProps) => {
  const user = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [errorText, setErrorText] = useState("");
  const toggleDialog = () => {
    setOpen(!open);
  };
  const handleSignup = async () => {
    if (!user.wallet) {
      setErrorText("Connect your wallet before joining a cup.");
    } else {
      try {
        const response = await fetch("/api/joincup", {
          method: "POST",
          body: JSON.stringify({
            userID: user.uid,
            cupID: cup.id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.error) {
          setErrorText(data.error);
        } else {
          toggleDialog();
        }
      } catch (error: any) {
        setErrorText(error);
      }
    }
  };
  return (
    <div>
      <Button variant="outlined" onClick={toggleDialog}>
        Join Cup
      </Button>
      <Dialog
        open={open}
        onClose={toggleDialog}
        aria-labelledby="join-cup"
        aria-describedby="join-cup"
      >
        <DialogTitle id="alert-dialog-title">Join Cup</DialogTitle>
        <DialogContent>
          <DialogContentText id="join-cup-description">
            Are you sure you would like to join {cup.name}? This request cannot
            be undone.
          </DialogContentText>
          <DialogContentText id="join-cup-error">
            {errorText ? errorText : " "}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog}>cancel</Button>
          <Button onClick={handleSignup} autoFocus>
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default JoinCupDialog;
