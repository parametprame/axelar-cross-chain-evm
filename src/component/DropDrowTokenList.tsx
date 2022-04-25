import { TokenList } from "../assetlist/tokenList";

export const DropDownTokenList = () => {
  return (
    <>
      <option selected>Select Asset</option>
      {TokenList.map((token) => (
        <>
          <option value={token.asset_commin_key}>{token.name}</option>
        </>
      ))}
    </>
  );
};
