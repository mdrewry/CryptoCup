import React, { useContext, useState } from "react";
import Web3 from "web3";
import Button from "@mui/material/Button";
import DialogContentText from "@mui/material/DialogContentText";
import ActionDialog from "./ActionDialog";
import { UserContext } from "../context/UserProvider";
import { getSmartContract } from "../functions/smartContract";

type JoinCupProps = {
  cup: { name: String; id: String; buyIn: Number; ethAddress: string };
};
const JoinCupDialog = ({ cup }: JoinCupProps) => {
  const user = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const toggleDialog = () => {
    setOpen(!open);
    setErrorText("ㅤ");
  };

  const handlePayment = async () => {
    setLoading(true);
    setLoadingText("Opening Metamask");
    try {
      const cupContract = await getSmartContract(user.wallet, cup.ethAddress);
      setLoadingText("Awaiting Transaction");
      const txn = await cupContract.joinCup({
        gasLimit: 9000000,
        value: Web3.utils.toWei(cup.buyIn.toString(), "ether"),
      });
      setLoadingText("Verifying Transaction");
      const receipt = await txn.wait();
      setLoadingText("Success");
      await handleSignup();
    } catch (error) {
      console.log(error);
      setErrorText("Transaction Failed");
    }
    toggleDialog();
    setLoading(false);
    setLoadingText("");
  };
  const handleSignup = async () => {
    try {
      if (!user.wallet) {
        setErrorText("Connect your wallet before joining a cup.");
        throw "Connect your wallet before joining a cup.";
      }
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
        throw data.error;
      }
      setErrorText(data.error);
    } catch (err: any) {
      console.log(err);
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
          marginBottom: 49,
        }}
        onClick={toggleDialog}
      >
        Join Now
      </Button>
      <ActionDialog
        name="Join Cup"
        prompt={`Are you sure you would like to join ${cup.name}? This request cannot be undone.`}
        submitButtonText="Sign Up"
        errorText={errorText}
        open={open}
        loading={loading}
        loadingText={loadingText}
        handleSubmit={handlePayment}
        toggleDialog={toggleDialog}
      >
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
      </ActionDialog>
    </div>
  );
};
export default JoinCupDialog;
