export const TokenInfo = [
  {
    chainId: "3",
    name: "WETH",
    asset_commin_key: "weth-wei",
    address: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
  },
  {
    chainId: "43113",
    name: "WETH",
    asset_commin_key: "weth-wei",
    address: "0x3613C187b3eF813619A25322595bA5E297E4C08a",
  },
];

export const TokenList = [
  {
    name: "WETH",
    asset_commin_key: "weth-wei",
  },
];

export const findToken = (chanId: string, asset_commin_key: string) => {
  return TokenInfo.find(
    (token) =>
      token.chainId === chanId && asset_commin_key === token.asset_commin_key
  );
};
