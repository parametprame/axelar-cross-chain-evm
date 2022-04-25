export const getChainName = (chainId: string) => {
  let ChainName = "";

  switch (parseInt(chainId)) {
    case 3:
      ChainName = "ethereum";
      break;
    case 43113:
      ChainName = "avalanche";
      break;
    case 4002:
      ChainName = "fantom";
      break;
  }

  return ChainName;
};
