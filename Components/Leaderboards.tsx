import type { NextPage } from "next";
import cupstyles from "../styles/Cups.module.css";
import { useRouter } from "next/router";
import { db } from "../config/firebase.config";
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
import { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { CryptoContext } from "../context/CryptoProvider";

type ContentProps = {
  cupid: string;
};
const Leaderboard = ({ cupid }: ContentProps) => {
  const cryptos = useContext(CryptoContext);
  const [leaderboard, setLeaderboard] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    //rankQuery used for getting global rankings
    const rankQuery = query(
      collection(db, "users"),
      orderBy("cupWins", "desc"),
      limit(10)
    );

    if (cupid === "") {
      const unsubscribeSnapshot = onSnapshot(rankQuery, async (snapshot) => {
        let result: Array<any> = [];
        snapshot.docs.forEach((doc: any) => {
          if (doc != null) {
            const data: any = doc.data();
            result.push({ ...data });
            setLeaderboard(result);
            setLoading(false);
          }
        });
      });
      return unsubscribeSnapshot;
    } else {
      //cupDocRef and cupQuery for leaderboard per cup
      const cupDocRef = doc(collection(db, "cups"), cupid);
      const cupQuery = query(
        collection(db, "usersInCup"),
        where("cupID", "==", cupDocRef)
      );
      const unsubscribeSnapshot = onSnapshot(cupQuery, async (snapshot) => {
        let results: Array<any> = [];
        const cupUsers: Array<any> = snapshot.docs[0]?.data().users;
        if (cupUsers != null) {
          const portfolios = (await getDoc(cupDocRef)).get("userPortfolios");
          await Promise.all(
            cupUsers.map(async (userRefs) => {
              const doc = await getDoc(userRefs);
              const data: any = doc.data();

              const playerPortfolio = portfolios[doc.id];
              let total = 0;
              Object.entries(playerPortfolio).map((x: any) => {
                total = total + cryptos[x[0]].price * x[1];
              });
              total = parseFloat(total.toFixed(2));
              results.push({ ...data, total });
              return 0;
            })
          );
          results.sort((a, b) => (a.total < b.total ? 1 : -1));
        }
        setLeaderboard(results);
        setLoading(false);
      });
      return unsubscribeSnapshot;
    }
  }, []);

  const router = useRouter();
  const {
    query: { id },
  } = router;

  return (
    <div className={cupstyles.leaderPadding}>
      {loading ? (
        <p>loading</p>
      ) : (
        <div>
          {leaderboard.map((c, index) => (
            <div className={cupstyles.leaderContainer}>
              <h5 className={cupstyles.rankNum}>{index + 1}</h5>
                <img
                  className={cupstyles.leaderProfile}
                  src={c.imageURL}
                />
              <div className={cupstyles.namewins}>
                <h6>
                  {c.firstName} {c.lastName}
                </h6>
                <div>
                  {cupid === "" ? (
                    <p>
                      {c.cupWins} Wins - ${c.totalEarnings}
                    </p>
                  ) : (
                    <p>${c.total} USD</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
