import React, { Component, createContext } from "react";
import { db } from "../config/firebase.config";
import { onSnapshot, collection } from "firebase/firestore";

const CRYPTOS: any = {
  BTC: { price: 0, hour: 0, day: 0, week: 0, name: "", ticker: "" },
  ETH: { price: 0, hour: 0, day: 0, week: 0, name: "", ticker: "" },
};

export const CryptoContext = createContext({ ...CRYPTOS });

class CryptoProvider extends Component<{}, { cryptos: any }> {
  constructor(props: any) {
    super(props);
    let cryptos: any;
    cryptos = { ...CRYPTOS };
    this.state = {
      cryptos,
    };
  }

  componentDidMount = () => {
    const cryptosRef = collection(db, "cryptoInfo");
    onSnapshot(cryptosRef, (snapshot) => {
      let cryptos: any = {};
      snapshot.docs.map((doc) => {
        const data: any = doc.data();
        cryptos[data.ticker] = { ...data };
      });
      this.setState({ cryptos });
    });
  };

  render() {
    return (
      <CryptoContext.Provider value={this.state.cryptos}>
        {this.props.children}
      </CryptoContext.Provider>
    );
  }
}

export default CryptoProvider;
