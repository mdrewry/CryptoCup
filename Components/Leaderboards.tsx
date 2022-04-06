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
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

type ContentProps = {
  cupid: string;
  //portfolios: {};
};
const Leaderboard = ({ cupid }: ContentProps) => {
  const [leaderboard, setLeaderboard] = useState<
    DocumentSnapshot<DocumentData>[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getLeaderboard = async () => {
    //cupDocRef and cupQuery for leaderboard per cup

    //rankQuery used for getting global rankings
    let result: DocumentSnapshot<DocumentData>[] = [];
    if (cupid === "") {
      const rankQuery = query(
        collection(db, "users"),
        orderBy("cupWins", "desc"),
        limit(10)
      );
      const data = await getDocs(rankQuery);
      data.forEach((c) => {
        result.push(c);
      });
    } else {
      const cupDocRef = doc(collection(db, "cups"), cupid);
      const cupQuery = query(
        collection(db, "usersInCup"),
        where("cupID", "==", cupDocRef)
      );

      const cupUsers: DocumentReference[] = (await getDocs(cupQuery)).docs
        .at(0)
        ?.data().users;

      if (cupUsers != null) {
        cupUsers.forEach((u) => {
          getDoc(u).then((d) => {
            result.push(d);
          });
        });
      }
    }
    //console.log(result);
    // setCups(data.docs.map((item)=>{
    //     return {...item.data(),id:item.id}
    // }));

    setLeaderboard(result);
    setLoading(false);
  };

  useEffect(() => {
    getLeaderboard();
  }, []);

  const router = useRouter();
  const {
    query: { id },
  } = router;

  return (
    <div className={cupstyles.padding}>
      {loading ? (
        <p>loading</p>
      ) : (
        <div>
          {leaderboard.map((c, index) => (
            <Grid container>
              <h5>{index + 1}</h5>
              <Grid item xs={1} md={1} lg={1} xl={1}>
                <img
                  className={cupstyles.leaderboardProfile}
                  src={c.get("imageURL")}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <h6>
                  {c.get("firstName")} {c.get("lastName")}
                </h6>
                <p>
                  {c.get("cupWins")} Wins - ${c.get("totalEarnings")}
                </p>
              </Grid>
            </Grid>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
