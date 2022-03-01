import type { NextApiRequest, NextApiResponse } from "next";
import { db, auth } from "../../config/firebaseAdmin.config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
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
    await db.collection("users").doc(user.uid).set({
      email,
    });
  } catch {
    res.status(500).json({ error: "Error creating user." });
    return;
  }

  res.status(200).json({ message: "User created successfully." });
}