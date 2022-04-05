import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import ActionDialog from "./ActionDialog";
import { UserContext } from "../context/UserProvider";
import { getSmartContract } from "../functions/smartContract";

type EndRegistrationDialogProps = {
  cup: { id: String; ethAddress: string };
};
const EndRegistrationDialog = ({ cup }: EndRegistrationDialogProps) => {
  const user = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const toggleDialog = () => {
    setOpen(!open);
    setErrorText("ㅤ");
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const cupContract = await getSmartContract(user.wallet, cup.ethAddress);
      const txn = await cupContract.startCup();
      const receipt = await txn.wait();
      await handleCupUpdate();
    } catch (error) {
      console.log(error);
      setErrorText("Transaction Failed");
      setLoading(false);
    }
  };
  const handleCupUpdate = async () => {
    try {
      const response = await fetch("/api/startcup", {
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
    setLoading(false);
    toggleDialog();
  };
  return (
    <div>
      <h4>
        As the director, you must close Cup Registration by the start date.
      </h4>
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
          marginBottom: 30,
        }}
        onClick={toggleDialog}
      >
        End Registration
      </Button>
      <ActionDialog
        name="End Registration"
        prompt="Are you sure you would like to close registration? This action cannot be undone."
        submitButtonText="Submit"
        errorText={errorText}
        open={open}
        loading={loading}
        handleSubmit={handleSubmit}
        toggleDialog={toggleDialog}
      />
    </div>
  );
};
export default EndRegistrationDialog;
