import DAppList from "../components/Content/DAppList";
import Portfolio from "../components/Content/Portfolio";
import TxHistory from "../components/Content/TxHistory";
import WalletInfo from "../components/Content/WalletInfo";
import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import useCustomAxios from "../hooks/useCustomAxios";
//import { useSelector } from "react-redux";
//import axios from "axios";

function WalletDetailsPage() {
  const { address, network } = useParams();
  const location = useLocation();
  const customAxios = useCustomAxios();
  //const currentUser = useSelector((state) => state.user);
  const [tokens, setTokens] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  const navigate = useNavigate();
  // useEffect(() => {
  //   //check if user is logged in from backend with useCustomAxios
  //   customAxios.get("/api/v1/auth/me").then((response) => {
  //     console.log("response", response);
  //   });
  //   console.log(currentUser);
  // }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const searchNetwork = "solana";
        const result = await customAxios.get(
          `/api/v1/wallets/${searchNetwork}/balance?walletAddress=${address}`
        );
        if (result.status !== 200) {
          console.log("Error fetching wallet info: ", result.data.error);
          return;
        }
        console.log("WALLET INFO: ", result);
        setTokens([
          {
            symbol: result.data.data.balance.symbol,
            amount: result.data.data.balance.amount,
            valueUsd: result.data.data.equivalents.USD.amount,
          },
        ]);
      } catch (error) {
        alert("Error fetching wallet info: " + error);
        navigate("/404");
      }
    }

    async function fetchWalletTransactions() {
      setTransactionsLoading(true);
      try {
        const searchNetwork = "solana";
        const result = await customAxios.get(
          `/api/v1/wallets/${searchNetwork}/transactions?walletAddress=${address}`
        );
        setTransactionsLoading(false);
        if (result.status !== 200) {
          console.log(
            "Error fetching wallet transactions: ",
            result.data.error
          );
          return;
        }
        const resultTransactions = result.data.data.filter((transaction) => transaction.nativeTransfers && transaction.nativeTransfers.length > 0)
        .map((transaction) => {
          return {
            txId: transaction.signature,
            transactionTime: transaction.timestamp,
            attributes: {
              hash: transaction.signature,
              sent_from: transaction.nativeTransfers[0]?.from,
              sent_to: transaction.nativeTransfers[0]?.to,
              mined_at: transaction.timestamp,
              transfers: transaction.nativeTransfers.map((transfer) => {
                return {
                  fungible_info: {
                    symbol: transfer.amount.symbol,
                    icon: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
                  },
                  quantity: {
                    float: transfer.amount.amount,
                  },
                  value: transfer.amount.equivalents.USD,
                };
              }),
            },
          };
        });

        setTransactions(resultTransactions);
      } catch (error) {
        alert("Error fetching wallet transactions: " + error);
        navigate("/404");
      }
    }

    fetchData();
    fetchWalletTransactions();
  }, [address, network, location.pathname]);

  const currentAddress =
    address || "zGmof8SeyvHKnSEWv4i2mVv7MYe85D3zZqsTBjsKXSV";

  const nfts = [
    {
      header: "NFT",
      id: "1640",
      basePrice: "300",
    },
    {
      header: "NFT",
      id: "1640",
      basePrice: "300",
    },
    {
      header: "NFT",
      id: "1640",
      basePrice: "300",
    },
    {
      header: "NFT",
      id: "1640",
      basePrice: "300",
    },
    {
      header: "NFT",
      id: "1640",
      basePrice: "300",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full px-4 md:px-0 mt-4 md:mt-[49px]">
      <div className="w-full max-w-[915px] flex flex-col md:flex-row justify-center gap-4 md:gap-[11px]">
        {/* Mobile layout (< md screens) */}
        <div className="md:hidden w-full flex flex-col gap-6">
          <WalletInfo
            currentAddress={currentAddress}
            currentNetwork={network}
          />
          <div className="w-full h-auto">
            <Portfolio tokens={tokens} nfts={nfts} network={network} />
          </div>
          <div className="w-full">
            <TxHistory
              transactions={transactions}
              currentNetwork={network}
              currentAddress={currentAddress}
            />
          </div>
          <div className="w-full h-auto mb-6">
            <DAppList network={network} />
          </div>
        </div>

        {/* Desktop layout (md and larger screens) */}
        <div className="hidden md:flex w-full gap-[11px]">
          {/* Left column */}
          <div className="flex flex-col gap-[16px] w-[300px]">
            <div className="w-[300px]">
              <Portfolio tokens={tokens} nfts={nfts} network={network} />
            </div>
            <div className="w-[300px]">
              <DAppList network={network} />
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col flex-grow gap-[23px]">
            <WalletInfo
              currentAddress={currentAddress}
              currentNetwork={network}
            />
            <div className="w-full">
              <TxHistory
                transactionsLoading={transactionsLoading}
                transactions={transactions}
                currentNetwork={network}
                currentAddress={currentAddress}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletDetailsPage;
