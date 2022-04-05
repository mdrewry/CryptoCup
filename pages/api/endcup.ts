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
    if (userID !== data.director) throw "User is not director.";
    if (data.currentState !== "active") throw "Cup is not active.";
    await updateDoc(cupDocRef, {
      currentState: "complete",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
    return;
  }

  res.status(200).json({ message: "Cup ended successfully." });
}
