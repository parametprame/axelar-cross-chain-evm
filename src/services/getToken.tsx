import { TokenInfo } from "../assetlist/tokenList";

export const findToken = (chanId: string, asset_commin_key: string) => {
  return TokenInfo.find(
    (token) =>
      token.chainId === chanId && asset_commin_key === token.asset_commin_key
  );
};
