import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../config/firebaseAdmin.config";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cupID, userID } = req.body;
  try {
    const cupRef = db.collection("cups").doc(cupID);
    const cupData: any = (await cupRef.get()).data();
    let { userPortfolios, inGameBudget } = cupData;
    userPortfolios[userID] = { usd: inGameBudget };
    await db.collection("cups").doc(cupID).update({
      userPortfolios,
    });
  } catch (error) {
    res.status(500).json({ error });
    return;
  }

  res.status(200).json({ message: "Cup created successfully." });
}
