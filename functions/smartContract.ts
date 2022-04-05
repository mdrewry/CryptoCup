import { ethers } from "ethers";
import cupFactoryABI from "../contracts/abi/CupFactory.json";
import cupABI from "../contracts/abi/Cup.json";
declare let window: any;

export const getSmartContract = async (
  userWallet: string,
  contractAddress: string
) => {
  const ethereum: any = window.ethereum;
  if (!ethereum) throw "Not Connected to Metamask";
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  if (signerAddress.toUpperCase() !== userWallet.toUpperCase())
    throw "This wallet is not connected to this account.";
  if (contractAddress)
    return new ethers.Contract(contractAddress, cupABI, signer);
  else {
    const factoryAddress = process.env.NEXT_PUBLIC_CUPFACTORY_ADDRESS
      ? process.env.NEXT_PUBLIC_CUPFACTORY_ADDRESS
      : "";
    return new ethers.Contract(factoryAddress, cupFactoryABI, signer);
  }
};
