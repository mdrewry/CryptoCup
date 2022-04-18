import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserProvider";
import { useRouter } from "next/router";
import styles from "../styles/CupDetails.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { CryptoContext } from "../context/CryptoProvider";
import Divider from '@mui/material/Divider';
import { getDoc, Timestamp, doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase.config";
import TradeCryptoDialog from "./TradeCryptoDialog";
type ContentProps = {
  cupid: string;
  portfolios: any;
};
const CupWallet = ({ cupid, portfolios }: ContentProps) => {
  const useStyles = makeStyles((theme) => ({
    line: {
      "& ": {
        backgroundColor: "white",
        borderWidth: "1px",
        marginTop: "11px",
      },
    },
  }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const classes = useStyles();
  
  const user = useContext(UserContext);
  const cryptos = useContext(CryptoContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [earnings, setEarnings] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [cupState, setCupState] = useState("");
  
  const router = useRouter();
  const {
    query: { id },
  } = router;

  useEffect(() => {
    const cupDocRef = doc(db, "cups", cupid);
    onSnapshot(cupDocRef, async (snapshot) => {
      if (snapshot.exists()) {
        const data: any = snapshot.data();
        setCupState(data.currentState);
        setTotalBudget(data.totalBudget);
        setEarnings(data.totalBudget);
        if (user.uid in data.userPortfolios) {
          let total = 0;
          Object.entries(data.userPortfolios[user.uid]).map((x: any) => {
            total = total + cryptos[x[0]].price * x[1];
          });
          total = parseFloat(total.toFixed(2));
          setEarnings(total);
        }
      }
    });
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await fetch("/api/cryptoinfo", {
        method: "POST",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.error) throw data.error.message;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {Object.keys(portfolios[user.uid]).sort().map((key) => (
        <div key={key}>
          <div className={styles.walleticon}>
            <Icon
              icon={key !== "SHIB" ?`cryptocurrency:${ key.toLowerCase()}`: "cryptocurrency:sand"}
              color="#40bd67"
              width="28"
              height="28"
            />
            <h6 className={styles.walletmoney}>
              {key} {(portfolios[user.uid][key]).toFixed(3)} 
            </h6>
          </div>
          <h4 className={styles.conversion}>${(portfolios[user.uid][key] * cryptos[key].price).toFixed(2)}</h4> 
        </div>
      ))}
      <Button
        style={{
          background: "#2F3869",
          fontFamily: "Space Mono",
          fontSize: 15  ,
          borderRadius: 60,
          fontWeight: 600,
          height: 35,
          padding: 10,
          width: 215,
          color: "white",
          marginTop: 10,
          marginBottom: 5,
        }}
       onClick={handleUpdate}>Update Crypto Prices
      </Button>
      <Divider className={classes.line}/>
      <div className={styles.total}>
        <h6>Total: ${earnings} USD</h6>
        <h4 className={styles.ogbudget}>
          (Original budget: ${totalBudget} USD)
        </h4>
      </div>
      {cupState === "active" && (
        <div className={styles.center}>
          <TradeCryptoDialog
            cup={{
              id: cupid,
              userPortfolio: portfolios[user.uid],
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CupWallet;
