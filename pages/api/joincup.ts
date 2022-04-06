import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../config/firebase.config";
import {
  getDoc,
  doc,
  updateDoc,
  where,
  query,
  collection,
  getDocs,
  arrayUnion,
  addDoc,
} from "firebase/firestore";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cupID, userID } = req.body;
  try {
    const cupDocRef = doc(db, "cups", cupID);
    const userRef = doc(db, "users", userID);
    const cupsInUserRef = query(
      collection(db, "cupsInUser"),
      where("userID", "==", userRef)
    );
    const usersInCupRef = query(
      collection(db, "usersInCup"),
      where("cupID", "==", cupDocRef)
    );
    const cupDocSnap = await getDoc(cupDocRef);
    const data: any = cupDocSnap.data();
    let { userPortfolios, totalBudget, cryptosAvailable } = data;
    if (userID in userPortfolios) throw "User already joined cup.";
    let portfolio: any = {};
    portfolio["USD"] = totalBudget;
    cryptosAvailable.forEach((crypto: string) => (portfolio[crypto] = 0));
    userPortfolios[userID] = portfolio;
    await updateDoc(cupDocRef, {
      userPortfolios,
    });
    const cupsInUserSnap = await getDocs(cupsInUserRef);
    if (!cupsInUserSnap.empty) {
      cupsInUserSnap.forEach(async (doc) => {
        await updateDoc(doc.ref, { cups: arrayUnion(cupDocRef) });
      });
    } else {
      await addDoc(collection(db, "cupsInUser"), {
        userID: userRef,
        cups: [cupDocRef],
      });
    }
    const usersInCupSnap = await getDocs(usersInCupRef);
    if (!usersInCupSnap.empty) {
      usersInCupSnap.forEach(async (doc) => {
        await updateDoc(doc.ref, { users: arrayUnion(userRef) });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
    return;
  }

  res.status(200).json({ message: "Cup joined successfully." });
}
