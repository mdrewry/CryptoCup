import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import ActionDialog from "./ActionDialog";
import { UserContext } from "../context/UserProvider";
import { CryptoContext } from "../context/CryptoProvider";
import { getSmartContract } from "../functions/smartContract";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase.config";
type DistributePrizesDialogProps = {
  cup: { id: String; ethAddress: string; userPortfolios: any };
};
const DistributePrizesDialog = ({ cup }: DistributePrizesDialogProps) => {
  const cryptos = useContext(CryptoContext);
  const user = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const toggleDialog = () => {
    setOpen(!open);
    setErrorText("ㅤ");
  };

  const calculateRankings = () => {
    const portfolios = cup.userPortfolios;
    const summedPortfolios = Object.keys(portfolios).map((key) => {
      let total = 0;
      Object.keys(portfolios[key]).forEach((ticker) => {
        total += cryptos[ticker].price * portfolios[key][ticker];
      });
      total = parseFloat(total.toFixed(4));
      return { playerID: key, total };
    });
    const sortedPortfolios = summedPortfolios.sort(
      (a: any, b: any) => b.total - a.total
    );
    return sortedPortfolios.map((p) => p.playerID);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setLoadingText("Calculating Rankings");
    const playersSorted = calculateRankings();
    try {
      const wallets = await Promise.all(
        playersSorted.map(async (id) => {
          const userDocSnap = await getDoc(doc(db, "users", id));
          const data: any = userDocSnap.data();
          return data.wallet;
        })
      );
      setLoadingText("Opening Metamask");
      const cupContract = await getSmartContract(user.wallet, cup.ethAddress);
      setLoadingText("Awaiting Transaction");
      const txn = await cupContract.endCup(wallets);
      setLoadingText("Verifying Transaction");
      const receipt = await txn.wait();
      setLoadingText("Success");
      await handleCupUpdate();
    } catch (error) {
      setErrorText("Transaction Failed");
    }
    toggleDialog();
    setLoading(false);
    setLoadingText("");
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
  };
  return (
    <div>
      <h4>
        When your cup is finished, click here to distribute prizes to the
        winners!
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
          marginTop: 21,
          marginBottom: 31,
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
        loadingText={loadingText}
        handleSubmit={handleSubmit}
        toggleDialog={toggleDialog}
      />
    </div>
  );
};
export default DistributePrizesDialog;
