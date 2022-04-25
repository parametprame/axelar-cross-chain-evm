import { ChainList } from "../chainlist/chainList";
import { ethers } from "ethers";

export const findChain = (chainId: number) => {
  return ChainList.filter(
    (chain) => ethers.utils.hexValue(chainId) === chain.chainId
  );
};
