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
    const images = [
      "https://firebasestorage.googleapis.com/v0/b/cryptocup-uf.appspot.com/o/images%2FbtcProfilePhoto.png?alt=media&token=bce0bd8f-9e4f-432b-8744-cfeb797417df",
      "https://firebasestorage.googleapis.com/v0/b/cryptocup-uf.appspot.com/o/images%2FethProfilePhoto.png?alt=media&token=f32de942-3e76-4c26-9aa9-dc5b3cef7de1",
      "https://firebasestorage.googleapis.com/v0/b/cryptocup-uf.appspot.com/o/images%2FrocketProfilePhoto.png?alt=media&token=67fd1033-8a16-42dd-b75e-99811ff932b7",
    ];
    await db.collection("cups").add({
      buyIn: parseFloat(buyIn),
      cryptosAvailable: [
        "ETH",
        "BTC",
        "ADA",
        "XRP",
        "SOL",
        "DOT",
        "SHIB",
        "DOGE",
      ],
      cupType: "classic",
      currentState: "created",
      director: db.collection("users").doc(director),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      name: cupName,
      password,
      playerCuts: [3, 5, 10],
      ethAddress: "",
      userPortfolios: {},
      totalBudget: parseInt(inGameBudget),
      imageURL: images[Math.floor(Math.random() * 3)],
    });
  } catch (error) {
    res.status(500).json({ error });
    return;
  }

  res.status(200).json({ message: "Cup created successfully." });
}
