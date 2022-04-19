import type { NextApiRequest, NextApiResponse } from "next";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../config/firebase.config";

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
    playerCuts,
    ethAddress,
  } = req.body;
  try {
    const images = [
      "https://firebasestorage.googleapis.com/v0/b/cryptocup-uf.appspot.com/o/images%2FcupPhotos%2FcupImg1.png?alt=media&token=479da394-c5bb-4df4-b658-2ac6f3b8f7e1",
      "https://firebasestorage.googleapis.com/v0/b/cryptocup-uf.appspot.com/o/images%2FcupPhotos%2FcupImg2.png?alt=media&token=586f5e2e-6e83-428d-961e-8529dbc0c5af",
      "https://firebasestorage.googleapis.com/v0/b/cryptocup-uf.appspot.com/o/images%2FcupPhotos%2FcupImg3.png?alt=media&token=bcf41fd8-52ce-4ffd-929a-8e24f6c92d24",
      "https://firebasestorage.googleapis.com/v0/b/cryptocup-uf.appspot.com/o/images%2FcupPhotos%2FcupImg4.png?alt=media&token=7c409b48-7e1e-477b-a160-b2ee42615d45",
      "https://firebasestorage.googleapis.com/v0/b/cryptocup-uf.appspot.com/o/images%2FcupPhotos%2FcupImg5.png?alt=media&token=8de28192-bad8-47b8-8ea5-36ba77997f41",
      "https://firebasestorage.googleapis.com/v0/b/cryptocup-uf.appspot.com/o/images%2FcupPhotos%2FcupImg6.png?alt=media&token=81acd831-efea-4c63-856c-03500b6cdd6e",
      "https://firebasestorage.googleapis.com/v0/b/cryptocup-uf.appspot.com/o/images%2FcupPhotos%2FcupImg7.png?alt=media&token=a1bf0255-5fdb-40e9-b0ec-2aff003878e0",
      "https://firebasestorage.googleapis.com/v0/b/cryptocup-uf.appspot.com/o/images%2FcupPhotos%2FcupImg8.png?alt=media&token=c2f8b75c-ab69-4d2f-b205-9528658250af",
    ];
    const bannerImages = [
      "https://firebasestorage.googleapis.com/v0/b/cryptocup-uf.appspot.com/o/images%2FcupPhotos%2FcupHeaderImg1.png?alt=media&token=977be6c2-2e08-415e-b63d-50cebd604d92",
      "https://firebasestorage.googleapis.com/v0/b/cryptocup-uf.appspot.com/o/images%2FcupPhotos%2FcupHeaderImg2.png?alt=media&token=3a906086-7d86-4b60-95e3-bc2bec953f4b",
      "https://firebasestorage.googleapis.com/v0/b/cryptocup-uf.appspot.com/o/images%2FcupPhotos%2FcupHeaderImg3.png?alt=media&token=a5f6f677-c935-44c0-ab29-b18c6cc2bdbc",
      "https://firebasestorage.googleapis.com/v0/b/cryptocup-uf.appspot.com/o/images%2FcupPhotos%2FcupHeaderImg4.png?alt=media&token=e6a6ac1f-0a13-4ec1-a14b-089da07c7c1e",
      "https://firebasestorage.googleapis.com/v0/b/cryptocup-uf.appspot.com/o/images%2FcupPhotos%2FcupHeaderImg5.png?alt=media&token=8b4781df-d127-42bb-8970-245c175c1d1b",
      "https://firebasestorage.googleapis.com/v0/b/cryptocup-uf.appspot.com/o/images%2FcupPhotos%2FcupHeaderImg6.png?alt=media&token=ce73f03d-268b-4ad1-87a8-1289d2afbdc1",
      "https://firebasestorage.googleapis.com/v0/b/cryptocup-uf.appspot.com/o/images%2FcupPhotos%2FcupHeaderImg7.png?alt=media&token=df2285e4-c7b8-4642-888a-ee4dfd577a87",
      "https://firebasestorage.googleapis.com/v0/b/cryptocup-uf.appspot.com/o/images%2FcupPhotos%2FcupHeaderImg8.png?alt=media&token=495ff55f-e091-47ae-b11e-9b25d0d3b904",
    ];
    const imgSelected = Math.floor(Math.random() * images.length);
    await addDoc(collection(db, "cups"), {
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
      director,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      name: cupName,
      password,
      playerCuts: playerCuts,
      ethAddress: ethAddress,
      userPortfolios: {},
      totalBudget: parseInt(inGameBudget),
      imageURL: images[imgSelected],
      bannerImageURL: bannerImages[imgSelected],
    }).then(async (ref) => {
      await addDoc(collection(db, "usersInCup"), { users: [], cupID: ref });
    });
  } catch (error) {
    res.status(500).json({ error });
    return;
  }

  res.status(200).json({ message: "Cup created successfully." });
}
