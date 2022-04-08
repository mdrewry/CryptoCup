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
      {Object.keys(portfolios[user.uid]).map((key) => (
        <div key={key}>
          <div className={styles.walleticon}>
            <Icon
              icon="cryptocurrency:usd"
              color="#83bd67"
              width="30"
              height="30"
            />
            <h6 className={styles.walletmoney}>
              {key} {portfolios[user.uid][key]}
            </h6>
          </div>
          {/* <h4 className={styles.conversion}>(444.33 USD as of 3/1/22 12:00 AM)</h4> */}
        </div>
      ))}
      <Button onClick={handleUpdate}>Update Crypto Prices</Button>
    </div>
  );
};

export default CupWallet;