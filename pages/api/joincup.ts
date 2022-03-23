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
      where("user", "==", userRef)
    );
    const cupDocSnap = await getDoc(cupDocRef);
    const data: any = cupDocSnap.data();
    let { userPortfolios, totalBudget } = data;
    if (userID in userPortfolios) throw "User already joined cup.";
    userPortfolios[userID] = { usd: totalBudget };
    await updateDoc(cupDocRef, {
      userPortfolios,
    });
    const snap = await getDocs(cupsInUserRef);
    if (!snap.empty) {
      snap.forEach(async (doc) => {
        await updateDoc(doc.ref, { cups: arrayUnion(cupDocRef) });
      });
    } else {
      await addDoc(collection(db, "cupsInUser"), {
        userID: userRef,
        cups: [cupDocRef],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
    return;
  }

  res.status(200).json({ message: "Cup joined successfully." });
}
