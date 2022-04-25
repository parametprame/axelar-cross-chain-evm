import { AxelarAssetTransfer, Environment } from "@axelar-network/axelarjs-sdk";

const api = new AxelarAssetTransfer({ environment: Environment.TESTNET });

export const getDepositAddress = async (
  fromChain: string,
  toChain: string,
  asset: string,
  destinationAddress: string
) => {
  const depositAddress = await api.getDepositAddress(
    fromChain,
    toChain,
    destinationAddress,
    asset
  );
  return depositAddress;
};
