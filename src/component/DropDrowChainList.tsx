import { ChainList } from "../chainlist/chainList";

export const DropDownChainList = () => {
  return (
    <>
      <option selected>Select Source Chain</option>
      {ChainList.map((chain) => (
        <>
          <option value={parseInt(chain.chainId).toString()}>
            {chain.chainName}
          </option>
        </>
      ))}
    </>
  );
};
