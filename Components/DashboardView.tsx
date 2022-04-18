import styles from "../styles/Cups.module.css";
import Router, { useRouter } from "next/router";
import { db } from "../config/firebase.config";
import {
  collection,
  getDoc,
  doc,
  where,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import moment from "moment";
import { UserContext } from "../context/UserProvider";
import { CryptoContext } from "../context/CryptoProvider";
import Button from "@mui/material/Button";
import Leaderboard from "./Leaderboards";
import CupWallet from "./CupWallet";

const Cups = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const user = useContext(UserContext);
  const [cups, setCups] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const userDocRef = doc(collection(db, "users"), user.uid);
    const cupsInUserRef = query(
      collection(db, "cupsInUser"),
      where("userID", "==", userDocRef)
    );
    
    const unsubscribeSnapshot = onSnapshot(cupsInUserRef, async (snapshot) => {
      let results: Array<any> = [];
      const userCups: Array<any> = snapshot.docs[0]?.data().cups;
      if (userCups !== undefined) {
        await Promise.all(
          userCups.map(async (cupRef: any) => {
            const doc = await getDoc(cupRef);
            const data: any = doc.data();
            const startDate = data.startDate.toDate();
            const endDate = data.endDate.toDate();
            if (data.currentState === "created" || data.currentState === "active")
              results.push({
                ...data,
                startDate,
                endDate,
                id: doc.id,
                ref: doc.ref,
              });
            return 0;
          })
        );
      }
      setCups(results);
      setLoading(false);
    });
    return unsubscribeSnapshot;
  }, []);
  const handleRedirect = (route: string) => {
    Router.push(`cups/${route}`);
  };
  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          {cups
            .map((c, index) => (
              <Grid container spacing={3} className={styles.dashIncline}>
                <Grid key={index} item xs={3}>
                  <Button onClick={(e) => handleRedirect(c.id)}>
                    <div style={{ textAlign: "left", textTransform: "none" }}>
                      <img
                        className={styles.placeholder}
                        src={c.imageURL}
                      ></img>
                      <h5 className={styles.name}>{c.name}</h5>
                      <div className={styles.cuptype}>{c.cupType}</div>
                      <p>
                        {moment(c.startDate).format("M/D/YYYY")}
                      &nbsp;-&nbsp;
                        {moment(c.endDate).format("M/D/YYYY")}
                      </p>
                    </div>
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <h6 className={styles.dashHeader}>STANDINGS</h6>
                  {Object.keys(c.userPortfolios).length > 0 && (
                      <Leaderboard cupid={c.id} />
                  )}
                </Grid>
                <Grid item xs={2.5}>
                  <h6 className={styles.dashHeader}>TRADE</h6>
                  {user.uid && (
                    <CupWallet cupid={c.id} portfolios={c.userPortfolios}/>
                  )}
                </Grid>
              </Grid>
            ))}
        </div>
      )}
    </div>
  );
};

export default Cups;
