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
    const { transferFrom, transferTo, transferAmount } = trade;
    const cupDocRef = doc(db, "cups", cupID);
    const cupDocSnap = await getDoc(cupDocRef);
    const data: any = cupDocSnap.data();
    const cryptoFromRef = doc(db, "cryptoInfo", transferFrom);
    const cryptoToRef = doc(db, "cryptoInfo", transferTo);
    const cryptoFromSnap = await getDoc(cryptoFromRef);
    const cryptoToSnap = await getDoc(cryptoToRef);
    const cryptoFromData: any = cryptoFromSnap.data();
    const cryptoToData: any = cryptoToSnap.data();
    const cryptoFromPrice = cryptoFromData.price;
    const cryptoToPrice = cryptoToData.price;
    const tradeRatio: number = cryptoFromPrice / cryptoToPrice;
    let { userPortfolios } = data;
    let portfolio: any = userPortfolios[userID];
    portfolio[transferFrom] -= parseFloat(transferAmount);
    portfolio[transferTo] += tradeRatio * parseFloat(transferAmount);
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
