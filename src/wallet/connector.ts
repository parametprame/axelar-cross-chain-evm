import { InjectedConnector } from "@web3-react/injected-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 4, 3, 42, 5, 56, 97, 1337, 43113],
});
