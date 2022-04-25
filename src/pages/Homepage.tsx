import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { getDepositAddress } from "../axelar/getDepositAddress";
import { getChainName } from "../services/getChainName";
import { useEffect, useState } from "react";
import { findToken } from "../services/getToken";
import { findChain } from "../services/getChain";
import { DropDownChainList } from "../component/DropDrowChainList";
import { DropDownTokenList } from "../component/DropDrowTokenList";
import { useContractContext } from "../context/useContract";
import { useToasts } from "react-toast-notifications";

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

const signerAuthority = provider.getSigner();

const ERC20_ABI = [
  "function transfer(address _to, uint256 _value) public returns (bool success)",
  "function balanceOf(address _owner) public view returns (uint256 balance)",
];

export const Homepage = () => {
  const { addToast } = useToasts();
  const { account } = useWeb3React();
  const [currChain, setCurrChain] = useState<string>("");
  const [desChain, setDesChain] = useState<string>("");
  const [amount, setAmount] = useState<string>("0");
  const [asset, setAsset] = useState<string>("weth-wei");
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const { errMsg, isPending, setIsPending } = useContractContext();

  const sendToken = async (e: any) => {
    e.preventDefault();
    setIsPending(true);
    try {
      const fromChainName = getChainName(currChain);
      const destinationChainName = getChainName(desChain);
      const token = findToken(currChain, asset);
      if (!token) throw new Error("token not found");

      let depositAddress = await getDepositAddress(
        fromChainName,
        destinationChainName,
        token.asset_commin_key,
        address
      );

      const contract = new ethers.Contract(
        token.address,
        ERC20_ABI,
        signerAuthority
      );
      const tx = await contract.transfer(
        depositAddress,
        ethers.utils.parseEther(amount),
        {
          gasLimit: "285000",
        }
      );
      await tx.wait();
      addToast("Transaction Success", { appearance: "success" });
      setIsPending(false);
    } catch {
      setIsPending(false);
    }
  };

  useEffect(() => {
    async function getChainId() {
      if (!currChain) return;

      const chainParams = findChain(parseInt(currChain));
      if (window.ethereum.networkVersion !== parseInt(currChain)) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: ethers.utils.hexValue(parseInt(currChain)) }],
          });

          const getToken = await findToken(currChain, asset);
          const contract = new ethers.Contract(
            getToken?.address!,
            ERC20_ABI,
            provider
          );
          const balance = await contract
            .balanceOf(account)
            .catch((err: any) => console.log(err));

          setBalance(ethers.utils.formatEther(balance));
        } catch (err: any) {
          if (err.code === 4902) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: chainParams,
            });
          }
        }
      }
    }
    getChainId();
  }, [currChain]);

  const formatInput = () => {
    const num = amount;
    setAmount(parseFloat(num).toFixed(4));
  };

  return (
    <>
      <section className="w-full  bg-[#17171A]">
        <div className="container mx-auto px-10 pb-10	min-h-screen flex justify-center 	">
          <div className="bg-[#222530] rounded-2xl border shadow-lg p-5 w-1/2 h-full  border-white border-2 border-solid mt-44">
            <form className="mt-5" onSubmit={sendToken}>
              <div className="rounded border shadow-lg w-full h-full">
                <p className="m-3 text-white"> Source Chain </p>
                <div className="grid grid-cols-2 gap-2 m-5 justify-items-center ">
                  <div>
                    <select
                      className="
                        form-select
                        appearance-none
                        block
                        w-full
                        px-3
                        py-2
                        text-base
                        font-normal
                        text-black
                        bg-white bg-clip-padding bg-no-repeat
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0 
                        focus:text-black focus:bg-white focus:border-white focus:outline-none"
                      aria-label="Default select example"
                      value={currChain}
                      onChange={(e) => setCurrChain(e.target.value)}
                    >
                      <DropDownChainList />
                    </select>
                  </div>
                  <div>
                    <select
                      className="
                        form-select
                        appearance-none
                        py-2
                        w-max-full
                        px-3
                        text-base
                        font-normal
                        text-black
                        bg-white bg-clip-padding bg-no-repeat
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-black focus:bg-white focus:border-white focus:outline-none"
                      aria-label="Default select example"
                      value={asset}
                      onChange={(e) => setAsset(e.target.value)}
                    >
                      <DropDownTokenList />
                    </select>
                  </div>
                </div>
              </div>
              <div className="rounded border shadow-lg w-full h-full">
                <p className="m-3 text-white"> Destination Chain </p>
                <div className="grid grid-cols-2 gap-2 m-5 justify-items-center ">
                  <div>
                    <select
                      className="
                        form-select
                        appearance-none
                        block
                        w-full
                        px-3
                        py-2
                        text-base
                        font-normal
                        text-black
                        bg-white bg-clip-padding bg-no-repeat
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0 
                        focus:text-black focus:bg-white focus:border-white focus:outline-none"
                      aria-label="Default select example"
                      onChange={(e) => setDesChain(e.target.value)}
                    >
                      <DropDownChainList />
                    </select>
                  </div>
                </div>
              </div>
              <p className="m-3 text-white mt-5"> User Balance {balance}</p>
              <div className="flex mt-3">
                <input
                  type="number"
                  placeholder="Amoung"
                  className="rounded-lg h-10 bg-[#2F3241] text-center text-white   font-bold w-full"
                  name="among"
                  value={amount}
                  onBlur={formatInput}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="flex mt-5">
                <input
                  type="text"
                  placeholder="Destination Address"
                  className="rounded-lg h-10 bg-[#2F3241] text-center text-white   font-bold w-full"
                  name="address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              {isPending ? (
                <button
                  className="bg-pink-700 mt-5 hover:bg-pink-600 shadow-lg shadow-pink-700/50 w-full  rounded-2xl text-white font-bold py-2 px-6 mx-1"
                  disabled={true}
                >
                  <span
                    className="spinner-border spinner-border-sm mr-3"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {"  "}
                  {isPending && "Pending..."}
                  {!isPending && "Processing.."}
                </button>
              ) : (
                <button
                  className="bg-pink-700 mt-5 hover:bg-pink-600 shadow-lg shadow-pink-700/50 w-full  rounded-2xl text-white font-bold py-2 px-6 mx-1"
                  type={"submit"}
                >
                  Send Token
                </button>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
