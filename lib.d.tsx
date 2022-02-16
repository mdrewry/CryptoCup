import { Timestamp } from "firebase/firestore";
import { type } from "os";

export type User = {
    uid: string;
    email: string;
    wallet: string;
  };
  
export type Cup={
  buyIn: Number;
  cryptosAvailable: Array<String>;
  cupType: String;
  currentState: Number;
  director: String;
  endDate: Timestamp;
  name: String;
  playerCuts: Array<Number>;
  startDate: Timestamp;
  user: String;
}


