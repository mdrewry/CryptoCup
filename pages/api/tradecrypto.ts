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
  const { cupID, userID, trade } = req.body;
  try {
    const cupDocRef = doc(db, "cups", cupID);
    const cupDocSnap = await getDoc(cupDocRef);
    const data: any = cupDocSnap.data();
    let { userPortfolios } = data;
    let portfolio: any = userPortfolios[userID];
    portfolio[trade.transferFrom] -= parseFloat(trade.transferAmount);
    portfolio[trade.transferTo] += parseFloat(trade.transferAmount);
    userPortfolios[userID] = portfolio;
    await updateDoc(cupDocRef, {
      userPortfolios,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
    return;
  }

  res.status(200).json({ message: "Trade Successful." });
}
