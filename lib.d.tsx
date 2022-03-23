import { Timestamp } from "firebase/firestore";
import { type } from "os";

export type User = {
  uid: string;
  email: string;
  wallet: string;
  birthday: Date;
  cupWins: Number;
  cupsPlayed: Number;
  firstName: string;
  lastName: string;
  totalEarnings: Number;
  imageURL: String;
  newsPreferences: Array<String>;
  walletVerified: boolean;
  totalPercentGain: Number;
  headsUpPlayed: Number;
  headsUpWins: Number;
};

export type Cup = {
  id: String;
  buyIn: Number;
  cryptosAvailable: Array<String>;
  cupType: String;
  currentState: String;
  director: String;
  endDate: Date;
  ethAddress: String;
  imageURL: String;
  name: String;
  password: String;
  playerCuts: Array<Number>;
  startDate: Date;
  totalBudget: Number;
  userPortfolios: Map<String, Map<String, Number>>;
};
