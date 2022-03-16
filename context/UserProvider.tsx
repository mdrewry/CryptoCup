import React, { Component, createContext } from "react";
import { auth, db } from "../config/firebase.config";
import { doc, getDoc } from "firebase/firestore";

type User = {
  uid: string;
  email: string;
  wallet: string;
};

const USER: User = { uid: "", email: "", wallet: "" };

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
