import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { UserContext } from "../context/UserProvider";
import { Cup } from "../lib.d";
type JoinCupProps = { cup: { name: String; id: String; buyIn: Number } };
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
        console.log(error);
      }
    }
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
          width: 242,
          color: "white",
          marginTop: 49,
          marginBottom: 307,
        }}
        onClick={toggleDialog}
      >
        Join Now
      </Button>
      <Dialog
        open={open}
        onClose={toggleDialog}
        aria-labelledby="join-cup"
        aria-describedby="join-cup"
      >
        <DialogContent
          style={{
            backgroundColor: "#13172C",
            borderRadius: "25px",
            border: "3px solid #fff",
          }}
        >
          <DialogContentText
            style={{
              backgroundColor: "#13172C",
              fontFamily: "Space Mono",
              fontWeight: "800",
              fontSize: "24px",
              color: "#FFFFFF",
            }}
            id="alert-dialog-title"
          >
            Join Cup
          </DialogContentText>
          <DialogContentText
            style={{
              marginTop: "20px",
              fontFamily: "Space Mono",
              fontStyle: "italic",
              fontWeight: "400",
              fontSize: "20px",
              color: "#FFFFFF",
            }}
            id="join-cup-description"
          >
            Are you sure you would like to join {cup.name}? This request cannot
            be undone.
          </DialogContentText>
          <DialogContentText
            style={{
              marginTop: "10px",
              fontFamily: "Space Mono",
              fontStyle: "italic",
              fontWeight: "400",
              fontSize: "20px",
              color: "#FFFFFF",
            }}
            id="join-cup-buyIn"
          >
            The Buy-In for this Cup is {cup.buyIn} ETH.
          </DialogContentText>
          <DialogContentText id="join-cup-error">
            {errorText ? errorText : " "}
          </DialogContentText>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              style={{
                background: "#1C2730",
                fontFamily: "Space Mono",
                fontSize: 20,
                borderRadius: 60,
                fontWeight: 700,
                height: 50,
                padding: 10,
                width: 242,
                color: "white",
              }}
              onClick={toggleDialog}
            >
              cancel
            </Button>
            <div style={{ width: "20px" }} />
            <Button
              style={{
                background: "#2F3869",
                fontFamily: "Space Mono",
                fontSize: 20,
                borderRadius: 60,
                fontWeight: 700,
                height: 50,
                padding: 10,
                width: 242,
                color: "white",
              }}
              onClick={handleSignup}
              autoFocus
            >
              Sign Up
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default JoinCupDialog;
