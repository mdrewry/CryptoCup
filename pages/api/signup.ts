import type { NextApiRequest, NextApiResponse } from "next";
import { db, auth } from "../../config/firebaseAdmin.config";
import moment from "moment";
const images = [
  "https://firebasestorage.googleapis.com/v0/b/cryptocup-uf.appspot.com/o/images%2FdefaultProfilePhoto.png?alt=media&token=13035637-3ace-4e7e-b9ae-8070ab038360",
  "https://firebasestorage.googleapis.com/v0/b/cryptocup-uf.appspot.com/o/images%2FdefaultProfilePhoto2.png?alt=media&token=26d1853e-1812-4cc4-8829-bb14bf238edf",
  "https://firebasestorage.googleapis.com/v0/b/cryptocup-uf.appspot.com/o/images%2FdefaultProfilePhoto3.png?alt=media&token=0e5f2fa4-4b06-45b7-8dc8-9f3ba1c6c71a",
];
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { firstName, lastName, email, password, birthdayStr } = req.body;
  const birthday = moment(birthdayStr, "M/D/YYYY");
  if (!email || !password) {
    res.status(500).json({ error: "Missing email or password." });
    return;
  }
  try {
    const user = await auth.createUser({
      email,
      password,
      emailVerified: false,
    });
    await db
      .collection("users")
      .doc(user.uid)
      .set({
        firstName,
        lastName,
        email,
        birthday,
        wallet: "",
        cupWins: 0,
        cupsPlayed: 0,
        headsUpPlayed: 0,
        headsUpWins: 0,
        totalEarnings: 0,
        totalPercentGain: 0,
        walletVerified: false,
        newsPreferences: [],
        imageURL: images[Math.floor(Math.random() * 3)],
      });
  } catch (error) {
    res.status(500).json({ error });
    return;
  }

  res.status(200).json({ message: "User created successfully." });
}
