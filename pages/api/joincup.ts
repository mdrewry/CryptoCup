import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../config/firebase.config";
import { getDoc, doc, updateDoc } from "firebase/firestore";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cupID, userID } = req.body;
  try {
    const cupDocRef = doc(db, "cups", cupID);
    const cupDocSnap = await getDoc(cupDocRef);
    const data: any = cupDocSnap.data();
    let { userPortfolios, inGameBudget } = data;
    userPortfolios[userID] = { usd: inGameBudget };
    await updateDoc(cupDocRef, {
      userPortfolios,
    });
  } catch (error) {
    res.status(500).json({ error });
    return;
  }

  res.status(200).json({ message: "Cup created successfully." });
}
