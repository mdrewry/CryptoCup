import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../config/firebaseAdmin.config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    cupName,
    password,
    startDate,
    endDate,
    buyIn,
    inGameBudget,
    director,
  } = req.body;
  try {
    await db.collection("cups").add({
      buyIn,
      cryptosAvailable: [],
      cupType: "standard",
      currentState: "created",
      director,
      startDate: startDate,
      endDate: endDate,
      name: cupName,
      password,
      playerCuts: [3, 5, 10],
      ethAddress: "",
      userBudgets: [],
      totalBudget: parseInt(inGameBudget),
    });
  } catch (error) {
    res.status(500).json({ error });
    return;
  }

  res.status(200).json({ message: "Cup created successfully." });
}
