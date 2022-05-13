import { ethers } from "ethers";

export const ChainList = [
  {
    chainName: "Ethereum Ropsten Testnet",
    chainId: ethers.utils.hexValue(3),
    nativeCurrency: {
      name: "ETH",
      decimals: 18,
      symbol: "ETH",
    },
    rpcUrls: ["https://ropsten.infura.io/v3/"],
  },

  {
    chainName: "Avalanch Testnet C-Chain",
    chainId: ethers.utils.hexValue(43113),
    nativeCurrency: {
      name: "AVAX",
      decimals: 18,
      symbol: "AVAX",
    },
    rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
  },
  {
    chainName: "Polygon Mumbai",
    chainId: ethers.utils.hexValue(80001),
    nativeCurrency: {
      name: "MATIC",
      decimals: 18,
      symbol: "MATIC",
    },
    rpcUrls: ["https://matic-testnet-archive-rpc.bwarelabs.com"],
  },
];
