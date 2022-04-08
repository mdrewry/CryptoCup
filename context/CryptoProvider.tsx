import React, { Component, createContext } from "react";
import { db } from "../config/firebase.config";
import { onSnapshot, collection } from "firebase/firestore";

const CRYPTOS: any = {
  BTC: { price: 0, hour: 0, day: 0, week: 0, name: "bitcoin", ticker: "BTC" },
  ETH: { price: 0, hour: 0, day: 0, week: 0, name: "ethereum", ticker: "ETH" },
  ADA: { price: 0, hour: 0, day: 0, week: 0, name: "cardano", ticker: "ADA" },
  DOGE: {
    price: 0,
    hour: 0,
    day: 0,
    week: 0,
    name: "dogecoin",
    ticker: "DOGE",
  },
  DOT: { price: 0, hour: 0, day: 0, week: 0, name: "polkadot", ticker: "DOT" },
  SHIB: {
    price: 0,
    hour: 0,
    day: 0,
    week: 0,
    name: "shiba-inu",
    ticker: "SHIB",
  },
  SOL: { price: 0, hour: 0, day: 0, week: 0, name: "solana", ticker: "SOL" },
  USD: {
    price: 0,
    hour: 0,
    day: 0,
    week: 0,
    name: "us dollars",
    ticker: "USD",
  },
  XRP: { price: 0, hour: 0, day: 0, week: 0, name: "ripple", ticker: "XRP" },
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
