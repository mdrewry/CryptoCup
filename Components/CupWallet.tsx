import React, { useContext, useEffect } from "react";
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
  const [zScores, setZScores] = useState<any>([{}]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    //ranking cryptos based on day % change
    let total = 0;
    let count = 0;
    Object.entries(cryptos).map((x: any) => {
        total = total + cryptos[x[0]].day;
        count = count + 1;
    });
    let avg = total / count;

    let std_sum = 0;
    Object.entries(cryptos).map((x: any) => {
        std_sum = std_sum + (cryptos[x[0]].day - avg) ** 2;
    });
    let std_dev = Math.sqrt(std_sum / count);

    let scores: Array<any> = [];
    Object.entries(cryptos).map((x: any) => {
        let z_score = (cryptos[x[0]].day - avg) / std_dev;
        let c_id = cryptos[x[0]].ticker;
        let rank = -1;
        scores.push({ c_id, z_score, rank });
    });
    scores.sort((a, b) => (a.c_id - b.c_id));
    for (var i in scores) {
      scores[i].rank = i;
    }
    console.log(scores);

    setZScores(scores);
    // end ranking algorithm
  }, []);

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
      {Object.keys(portfolios[user.uid])
        .sort()
        .map((key, index) => (
          <div key={key}>
            <div className={styles.walleticon}>
              <Icon
                icon={
                  key !== "SHIB"
                    ? `cryptocurrency:${key.toLowerCase()}`
                    : "cryptocurrency:sand"
                }
                color="#40bd67"
                width="28"
                height="28"
              />
              <h6 className={styles.walletmoney}>
                {key} {portfolios[user.uid][key].toFixed(3)}
              </h6>
            </div>
            <h4 className={styles.conversion}>
              ${(portfolios[user.uid][key] * cryptos[key].price).toFixed(2)} ({zScores[index]?.z_score.toFixed(2)})
            </h4>
          </div>
        ))}
      <Button
        style={{
          background: "#2F3869",
          fontFamily: "Space Mono",
          fontSize: 15,
          borderRadius: 60,
          fontWeight: 600,
          height: 35,
          padding: 10,
          width: 215,
          color: "white",
          marginTop: 10,
          marginBottom: 5,
        }}
        onClick={handleUpdate}
      >
        Update Crypto Prices
      </Button>
    </div>
  );
};

export default CupWallet;
