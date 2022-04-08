import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useRouter } from "next/router";
import styles from "../styles/CupDetails.module.css";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { CryptoContext } from "../context/CryptoProvider";
type ContentProps = {
  cupid: string;
  portfolios: any;
};
const CupWallet = ({ cupid, portfolios }: ContentProps) => {
  const user = useContext(UserContext);
  const cryptos = useContext(CryptoContext);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const {
    query: { id },
  } = router;
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
          <h4 className={styles.conversion}>${(portfolios[user.uid][key] * cryptos[key].price).toFixed(2)} ({(cryptos[key].day).toFixed(2)}%)</h4> 
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
    </div>
  );
};

export default CupWallet;
