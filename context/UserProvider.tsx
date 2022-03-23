import React, { Component, createContext } from "react";
import { auth, db } from "../config/firebase.config";
import { doc, getDoc, Timestamp } from "firebase/firestore";

type User = {
  uid: string;
  email: string;
  wallet: string;
  firstName: string;
  lastName: string;
  birthday: Timestamp;
  cupWins: Number;
  cupsPlayed: Number;
  headsUpPlayed: Number;
  headsUpWins: Number;
  totalEarnings: Number;
  totalPercentGain: Number;
  walletVerified: boolean;
  newsPreferences: Array<String>;
  imageURL: string;
};

const USER: User = { uid: "", email: "", wallet: "", firstName: "", lastName: "", birthday: Timestamp.now(), cupWins: 0, cupsPlayed: 0, 
headsUpPlayed: 0, headsUpWins: 0, totalEarnings: 0, totalPercentGain: 0, walletVerified: false, newsPreferences: [], imageURL: "" };

export const UserContext = createContext({ ...USER });

class UserProvider extends Component<{}, { user: User }> {
  constructor(props: any) {
    super(props);
    let user: User;
    try {
      user = JSON.parse(localStorage.getItem("user") ?? "");
    } catch {
      user = { ...USER };
    }
    this.state = {
      user,
    };
  }

  componentDidMount = () => {
    auth.onAuthStateChanged(async (userAuth) => {
      const user: User = { ...USER };
      if (userAuth) {
        const userDocRef = doc(db, "users", userAuth.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          user.uid = userAuth.uid;
          user.email = data.email;
          user.wallet = data.wallet;
          user.firstName = data.firstName;
          user.lastName = data.lastName;
          user.birthday = data.birthday;
          user.cupWins = data.cupWins;
          user.cupsPlayed = data.cupsPlayed;
          user.headsUpPlayed = data.headsUpPlayed;
          user.headsUpWins = data.headsUpWins;
          user.totalEarnings = data.totalEarnings;
          user.totalPercentGain = data.totalPercentGain;
          user.walletVerified = data.walletVerified;
          user.newsPreferences = data.newsPreferences;
          user.imageURL = data.imageURL;
        }
      }
      localStorage.setItem("user", user ? JSON.stringify(user) : "");
      this.setState({ user });
    });
  };

  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
