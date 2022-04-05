import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import ActionDialog from "./ActionDialog";
import { UserContext } from "../context/UserProvider";
import { getSmartContract } from "../functions/smartContract";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase.config";
type DistributePrizesDialogProps = {
  cup: { id: String; ethAddress: string; rankings: string[] };
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
      const wallets = await Promise.all(
        cup.rankings.map(async (id) => {
          const userDocSnap = await getDoc(doc(db, "users", id));
          const data: any = userDocSnap.data();
          return data.wallet;
        })
      );
      const cupContract = await getSmartContract(user.wallet, cup.ethAddress);
      const txn = await cupContract.endCup(wallets);
      const receipt = await txn.wait();
      await handleCupUpdate();
    } catch (error) {
      setErrorText("Transaction Failed");
      setLoading(false);
    }
  };
  const handleCupUpdate = async () => {
    try {
      const response = await fetch("/api/endcup", {
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
        This Cup is finished. Click here to distribute prizes to the winners!
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
          width: 260,
          color: "white",
          marginBottom: 30,
        }}
        onClick={toggleDialog}
      >
        Distribute Prizes
      </Button>
      <ActionDialog
        name="Distribute Prizes"
        prompt="Are you sure you would like to distribute prizes? This action cannot be undone."
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
