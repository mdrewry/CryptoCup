import React, { Component, createContext } from "react";
import { db } from "../config/firebase.config";
import { onSnapshot, collection } from "firebase/firestore";

const CRYPTOS: any = {
  BTC: { price: 1, hour: 1, day: 1, week: 1, name: "bitcoin", ticker: "BTC" },
  ETH: { price: 1, hour: 1, day: 1, week: 1, name: "ethereum", ticker: "ETH" },
  ADA: { price: 1, hour: 1, day: 1, week: 1, name: "cardano", ticker: "ADA" },
  DOGE: {
    price: 1,
    hour: 1,
    day: 1,
    week: 1,
    name: "dogecoin",
    ticker: "DOGE",
  },
  DOT: { price: 1, hour: 1, day: 1, week: 1, name: "polkadot", ticker: "DOT" },
  SHIB: {
    price: 1,
    hour: 1,
    day: 1,
    week: 1,
    name: "shiba-inu",
    ticker: "SHIB",
  },
  SOL: { price: 1, hour: 1, day: 1, week: 1, name: "solana", ticker: "SOL" },
  USD: {
    price: 1,
    hour: 1,
    day: 1,
    week: 1,
    name: "us dollars",
    ticker: "USD",
  },
  XRP: { price: 1, hour: 1, day: 1, week: 1, name: "ripple", ticker: "XRP" },
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
