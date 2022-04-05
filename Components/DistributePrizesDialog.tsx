import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import ActionDialog from "./ActionDialog";
import { UserContext } from "../context/UserProvider";
import { getSmartContract } from "../functions/smartContract";

type DistributePrizesDialogProps = {
  cup: { name: String; id: String; buyIn: Number; ethAddress: string };
};
const DistributePrizesDialog = ({ cup }: DistributePrizesDialogProps) => {
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
      const txn = await cupContract.endCup();
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
    setLoading(false);
    toggleDialog();
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
        Distribute Prizes
      </Button>
      <ActionDialog
        name="Distribute Prizes"
        prompt={`Are you sure you would like to join ${cup.name}? This request cannot be undone.`}
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
export default DistributePrizesDialog;
