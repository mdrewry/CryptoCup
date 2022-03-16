import React, { Component, createContext } from "react";

declare let window: any;

type Wallet = {
  address: string;
  connect: () => void;
};

export const WalletContext = createContext({
  address: "",
  connect: () => {},
});

class WalletProvider extends Component<{}, { wallet: Wallet }> {
  constructor(props: any) {
    super(props);
    this.state = {
      wallet: {
        address: "",
        connect: this.connect,
      },
    };
  }

  connect = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    this.setState({
      wallet: {
        address: accounts[0],
        connect: this.connect,
      },
    });
  };

  render() {
    return (
      <WalletContext.Provider value={this.state.wallet}>
        {this.props.children}
      </WalletContext.Provider>
    );
  }
}

export default WalletProvider;
