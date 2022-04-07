import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useRouter } from "next/router";
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
          {/* <h4 className={styles.conversion}>(444.33 USD as of 3/1/22 12:00 AM)</h4> */}
        </div>
      ))}
    </div>
  );
};

export default CupWallet;
