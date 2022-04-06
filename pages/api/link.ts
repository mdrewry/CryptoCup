import * as util from "ethereumjs-util";
import type { NextApiRequest, NextApiResponse } from "next";
import { db, auth } from "../../config/firebaseAdmin.config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid, address, signature } = req.body;
  if (!uid || !address || !signature) {
    res.status(500).json({ error: "Missing address or signature." });
    return;
  }

  try {
    let message: Buffer | string =
      "Sign this message to complete linking your wallet to your account. You will only have to do this once and it will cost you no eth.";
    message = "\x19Ethereum Signed Message:\n" + message.length + message;
    message = util.keccak(Buffer.from(message, "utf-8"));
    const { v, r, s } = util.fromRpcSig(signature);
    const pubKey = util.ecrecover(util.toBuffer(message), v, r, s);
    const addrBuf = util.pubToAddress(pubKey);
    const signedAddress = util.bufferToHex(addrBuf);

    if (signedAddress !== address) {
      res.status(500).json({ error: "Address mismatch." });
      return;
    }
    
    await db.collection("users").doc(uid).update({ wallet: address });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error linking wallet." });
    return;
  }

  res.status(200).json({ message: "Wallet linked successfully.", address });
}
