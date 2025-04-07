import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import goBackIcon from "./../assets/images/icons/goBackIcon.svg";
import copyIcon from "./../assets/images/icons/walletCopyIcon.svg";
import shareIcon from "./../assets/images/icons/shareIcon.svg";
import rightArrowIcon from "./../assets/images/icons/rightArrowIcon.svg";
import shortenAddress from "../utils/shortenAddress";
import TokenCard from "../components/Content/TokenCard";
import ZoomQRCode from "../components/Content/ZoomQRCode";
import { convertWalletToTag } from "../utils/convertWalletToTag";
import { useSelector } from "react-redux";
import QRCode from "react-qr-code";
import useCustomAxios from "../hooks/useCustomAxios";

function TransactionDetailsPage() {
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const addresses = useSelector((state) => state.wallet.addresses);
  const selectedNetwork = useSelector((state) => state.global.selectedNetwork);
  const customAxios = useCustomAxios();
  const [transactionDetail, setTransactionDetail] = useState(null);

  const hash = window.location.pathname.split("/")[3];

  //const sent_from = "0xjhkjhasdygq9823421391802381823";
  //const sent_to = "0xnsljnjwe283t7y7w78651fdfscfwet2";

  const tokens = [
    {
      symbol: "SOL",
      tokenContractAddress: "0x1234",
      holdingAmount: 1.5,
      valueUsd: 218.28,
    },
    // Add more tokens if needed
  ];

  useEffect(() => {
    async function fetchTransactionDetails() {
      try {
        const result = await customAxios.get(
          `/api/v1/transactions/${hash}?network=solana` // Adjust the network as needed
        );
        if (result.status !== 200) {
          console.log("Error fetching transaction details: ", result.data.error);
          return;
        }
        //console.log("Transaction Details: ", result.data.data);
        setTransactionDetail(result.data.data);
      } catch (error) {
        alert("Error fetching transaction details: " + error);
        navigate("/404");
      }
    }

    fetchTransactionDetails();
  }, []);




  const handleCopyHash = () => {
    const tempInput = document.createElement("input");
    tempInput.value = hash;
    document.body.appendChild(tempInput);

    tempInput.select();
    document.execCommand("copy");

    document.body.removeChild(tempInput);

    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Tyche Transaction Details",
          text: "Check out this transaction on Tyche",
          url: shareUrl,
        });
      } catch (err) {
        console.log("Share failed:", err);
        copyToClipboard(shareUrl);
      }
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      const tempInput = document.createElement("input");
      tempInput.value = text;
      document.body.appendChild(tempInput);

      tempInput.select();
      document.execCommand("copy");

      document.body.removeChild(tempInput);

      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleAddressClick = (address) => () => {
    window.location.href = `/${selectedNetwork}/address/${address}`;
  };

  if (!transactionDetail) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <p className="text-black text-[18px] font-bold">Loading...</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center w-full px-4 md:px-0 mt-4 md:mt-[50px]">
      <div className="w-full max-w-[915px] flex flex-col gap-4 md:gap-[11px]">
        <div className="flex flex-row items-center gap-[20px] w-full">
          <button
            className="flex items-center bg-tychePrimary p-[13px] cursor-pointer rounded-full"
            onClick={() => navigate(-1)}
          >
            <img src={goBackIcon} alt="Go Back" />
          </button>
          <p className="text-[24px] text-tychePrimary tracking-wide font-[350]">
            Transaction Details
          </p>
        </div>

        {/* Top section */}
        <div className="flex flex-col md:flex-row w-full gap-4 md:gap-[11px]">
          {/* Top left */}
          <div className="flex flex-col flex-grow bg-tycheLightGray rounded-[20px] p-[25px] gap-[24px]">
            <div className="flex flex-row gap-[15px] items-center">
              <p className="text-black text-[14px] font-bold">
                Transaction Hash:
              </p>
              <div className="flex flex-row items-center">
                <p className="text-[14px] text-tycheBlue font-[350]">
                  {shortenAddress(hash)}
                </p>
                <button
                  onClick={handleCopyHash}
                  className="relative"
                  title="Copy hash"
                >
                  <img
                    src={copyIcon}
                    alt="Copy"
                    className="w-[15px] h-[15px] ml-2"
                  />
                  {copySuccess && (
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>
            <div className="flex flex-row gap-[15px]">
              <p className="text-black text-[14px] font-bold">Date:</p>
              <p className="text-[14px] text-black font-[350]">
                {new Date(transactionDetail.date).toLocaleString()}
              </p>
            </div>
            <div className="flex flex-row gap-[15px]">
              <p className="text-black text-[14px] font-bold">Status:</p>
              <div className="flex flex-row items-center gap-[5px]">
                <p className="text-[14px] text-black font-[350]">Completed</p>
                <div className="w-[12px] h-[12px] rounded-full bg-tycheGreen" />
              </div>
            </div>
            <div className="flex flex-row gap-[15px]">
              <p className="text-black text-[14px] font-bold">Gas Fee:</p>
              <p className="text-[14px] text-black font-[350]">{
                transactionDetail.gasFee.sol
                } SOL</p>
            </div>
          </div>

          {/* Top right (QR) */}
          <div className="w-full md:w-[300px] bg-tycheLightGray rounded-[20px] p-[25px]">
            <div className="flex flex-col items-center h-full gap-[3px]">
              <p className="text-black text-[14px] font-bold mb-2">
                Show This To Others!
              </p>
              <div className="flex flex-col items-center gap-[9px]">
                <p className="text-black text-[8px] italic">
                  {"*This transaction's link"}
                </p>
                <QRCode
                  size={80}
                  value={window.location.href}
                  className="w-[80px] h-[80px] cursor-pointer"
                  onClick={() => setZoom(true)}
                />
                {zoom && (
                  <ZoomQRCode value={window.location.href} setZoom={setZoom} />
                )}
              </div>
              <p className="text-black text-[6px] italic">
                Click and zoom to QR Code
              </p>
              <div className="h-[4px]" />
              <div className="relative">
                <button
                  onClick={handleShare}
                  className="flex flex-row gap-[5px] items-center justify-center bg-tychePrimary font-[300] text-white text-[14px] px-[10px] py-[6px] tracking-wide rounded-[60px] w-full h-fit"
                >
                  <p>Share</p>
                  <img
                    src={shareIcon}
                    alt="Share"
                    className="w-[14px] h-[14px]"
                  />
                </button>
                {shareSuccess && (
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                    Link copied!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Middle section (from to) */}
        <div className="flex flex-col w-full bg-tycheLightGray rounded-[20px] p-[25px]">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
              <p className="text-black text-[14px] font-bold">From:</p>
              <p
                className="text-[14px] text-tycheBlue font-[350] cursor-pointer hover:underline"
                onClick={handleAddressClick(transactionDetail.from.pubkey)}
              >
                {convertWalletToTag(transactionDetail.from.pubkey, addresses)}
              </p>
            </div>
            <img
              src={rightArrowIcon}
              alt="Right Arrow"
              className="w-[16px] h-[16px]"
            />
            <div className="flex flex-col items-end">
              <p className="text-black text-[14px] font-bold">To:</p>
              <p
                className="text-[14px] text-tycheBlue font-[350] cursor-pointer hover:underline"
                onClick={handleAddressClick("to_address")}
              >
                {convertWalletToTag("to_address", addresses)}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom section (transferred assets) */}
        <div className="flex flex-col w-full bg-tycheLightGray rounded-[20px] p-[25px]">
          <p className="text-[18px] font-bold mb-[15px]">Transferred Assets</p>
          <div className="flex flex-col gap-[12px]">
            {tokens.map((token, index) => (
              <TokenCard key={index} token={token} transferAmount={transactionDetail.amount} price={transactionDetail.fiatValues.USD}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionDetailsPage;
