import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import type { NextPage } from "next";
import cupstyles from "../styles/Cups.module.css";
import { useRouter } from "next/router";
import { db } from "../config/firebase.config";
import styles from "../styles/CupDetails.module.css";
import { Icon } from "@iconify/react";
import {
  collection,
  getDoc,
  getDocs,
  DocumentSnapshot,
  DocumentData,
  doc,
  where,
  query,
  onSnapshot,
  QueryDocumentSnapshot,
  orderBy,
  DocumentReference,
  limit,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

type ContentProps = {
  cupid: string;
  portfolios: any;
};
const CupWallet = ({ cupid, portfolios }: ContentProps) => {
  const user = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const {
    query: { id },
  } = router;

  return (
    <div className={styles.walleticon}>
      <Icon icon="cryptocurrency:usd" color="#83bd67" width="30" height="30" />
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
                  <h6 className={styles.walletmoney}>{key} {portfolios[user.uid][key]}</h6>
                </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CupWallet;
