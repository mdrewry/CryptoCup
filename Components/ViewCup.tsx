import cupstyles from "../styles/Cups.module.css";
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
import Button from "@mui/material/Button";

type ContentProps = { filter: Number; cupNameFilter: String };
const Cups = ({ filter, cupNameFilter }: ContentProps) => {
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
    //filter==0 for ongoing cups(player), filter==1 for upcoming cups(player based), filter==2 for ALL upcoming cups
    if (filter == 2) {
      const unsubscribeSnapshot = onSnapshot(
        collection(db, "cups"),
        (snapshot) => {
          let cups: Array<any> = [];
          snapshot.docs.forEach((doc: any) => {
            const data: any = doc.data();

            const startDate = data.startDate.toDate();
            const endDate = data.endDate.toDate();
            if (data.currentState == "created")
              cups.push({
                ...data,
                startDate,
                endDate,
                id: doc.id,
                ref: doc.ref,
              });
          });
          setCups(cups);
          setLoading(false);
        }
      );
      return unsubscribeSnapshot;
    }
    const unsubscribeSnapshot = onSnapshot(cupsInUserRef, async (snapshot) => {
      let results: Array<any> = [];
      const userCups: Array<any> = snapshot.docs[0]?.data().cups;
      if (userCups !== null) {
        await Promise.all(
          userCups.map(async (cupRef: any) => {
            const doc = await getDoc(cupRef);
            const data: any = doc.data();
            const startDate = data.startDate.toDate();
            const endDate = data.endDate.toDate();
            if (filter == 0 && data.currentState === "active")
              results.push({
                ...data,
                startDate,
                endDate,
                id: doc.id,
                ref: doc.ref,
              });
            else if (filter == 1 && data.currentState === "created")
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
        <Grid container spacing={3}>
          {cups
            .filter((c) => {
              if (cupNameFilter === "") return true;
              else
                return c.name
                  .toLowerCase()
                  .includes(cupNameFilter.toLowerCase());
            })
            .map((c) => (
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <Button onClick={(e) => handleRedirect(c.id)}>
                  <div style={{ textAlign: "left", textTransform: "none" }}>
                    <img
                      className={cupstyles.placeholder}
                      src={c.imageURL}
                    ></img>
                    <h5 className={cupstyles.name}>{c.name}</h5>
                    <div className={cupstyles.cuptype}>{c.cupType}</div>
                    <p>
                      {moment(c.startDate).format("M/D/YYYY")}
                      &nbsp;-&nbsp;
                      {moment(c.endDate).format("M/D/YYYY")}
                    </p>
                  </div>
                </Button>
              </Grid>
            ))}
        </Grid>
      )}
    </div>
  );
};

export default Cups;
