import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { Navbar } from "./navigation/Navbar";
import { ContractProvider } from "../src/context/useContract";
import { Homepage } from "./pages/Homepage";
import { ToastProvider } from "react-toast-notifications";

function getLibrary(provider: any) {
  return new ethers.providers.Web3Provider(provider, "any");
}

function App() {
  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ContractProvider>
          <ToastProvider>
            <Navbar />
            <Homepage />
          </ToastProvider>
        </ContractProvider>
      </Web3ReactProvider>
    </>
  );
}

export default App;
