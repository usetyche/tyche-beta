import shortenAddress from "../../utils/shortenAddress";
import { convertTimestampToTimezone } from "../../utils/convertTimestampToTimezone";
import { useSelector } from "react-redux";
import outgoingIcon from "./../../assets/images/icons/outgoingIcon.svg";
import incomingIcon from "./../../assets/images/icons/incomingIcon.svg";
import { useNavigate } from "react-router-dom";
import { convertWalletToTag } from "../../utils/convertWalletToTag";

const ETH_TO_USD = 3402.5; // Replace with the current ETH/USD rate

function TxCard({ tx, currentAddress }) {
  const settings = useSelector((state) => state.settings);
  const addresses = useSelector((state) => state.wallet.addresses);
  const navigate = useNavigate();

  const formattedTime = convertTimestampToTimezone(
    tx.transactionTime,
    settings.timezone
  );

  function getRandomFloat(min, max) {
    return (Math.random() * (max - min) + min).toFixed(3);
  }
  console.log(tx);
  console.log("25 "+tx.attributes.transfers?.[0]?.fungible_info?.symbol);
  //convert to string
  console.log("26 "+tx.attributes.transfers?.[0]?.value.toString());
  console.log("27 "+tx.attributes.transfers?.[0]?.quantity?.float);

  let symbol = tx.attributes.transfers?.[0]?.fungible_info?.symbol;
  let value = tx.attributes.transfers?.[0]?.value.toString();
  let amount = tx.attributes.transfers?.[0]?.quantity?.float;

  // Ensure icon is a string or provide a fallback value
  let icon = tx.attributes.transfers?.[0]?.fungible_info?.icon;
  if (typeof icon !== "string") {
    icon = "default-icon-url"; // Fallback to a default icon URL if icon is not a string
  }

  if (symbol === undefined || symbol === null) {
    symbol = "ETH";
  }

  if (amount === undefined || amount === null) {
    const randomFloat = getRandomFloat(0.1, 5.0);
    amount = randomFloat;
  }

  if (value === undefined || value === null) {
    value = amount * ETH_TO_USD;
  }

  const address_to = String(tx.attributes.sent_to).trim().toLowerCase();
  const stringcurrentAddress = String(currentAddress).trim().toLowerCase();

  let incoming = false;

  if (address_to === stringcurrentAddress) {
    incoming = true;
  }

  const selectedNetwork = useSelector((state) => state.global.selectedNetwork);

  const handleHashClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    navigate(`/${selectedNetwork}/tx/${tx.attributes.hash}`);
  };

  const handleAddressClick = (address) => (e) => {
    e.stopPropagation();
    // Force a full page refresh when navigating
    window.location.href = `/${selectedNetwork}/address/${address}`;
    // Alternatively, if you want to keep it as a SPA:
    // navigate(`/${selectedNetwork}/address/${address}`, { replace: true });
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-4 rounded-[20px] gap-4 md:gap-2">
      {/* Timestamp and Hash Section */}
      <div className="flex flex-col gap-[2px] text-[12px] w-full md:w-auto">
        <p className="font-bold">
          {formattedTime.split(" ")[0]} {formattedTime.split(" ")[1]}{" "}
          {formattedTime.split(" ")[2]}
        </p>
        <p className="text-[12px] text-black">{formattedTime.split(" ")[3]}</p>
        <p 
          className="text-tycheBlue text-[16px] font-semibold cursor-pointer hover:underline break-all"
          onClick={handleHashClick}
        >
          {shortenAddress(tx.attributes.hash)}
        </p>
      </div>

      {/* From/To Section */}
      <div className="flex flex-col gap-[10px] md:gap-[26px] w-full md:w-auto">
        <div className="flex flex-row gap-[5px] items-center flex-wrap">
          <p className="text-[12px] font-bold whitespace-nowrap">From:</p>
          <span 
            className="text-tycheBlue text-[12px] cursor-pointer hover:underline break-all"
            onClick={handleAddressClick(tx.attributes.sent_from)}
          >
            {convertWalletToTag(tx.attributes.sent_from, addresses)}
          </span>
        </div>
        <div className="flex flex-row gap-[5px] items-center flex-wrap">
          <p className="text-[12px] font-bold whitespace-nowrap">To:</p>
          <span 
            className="text-tycheBlue text-[12px] cursor-pointer hover:underline break-all"
            onClick={handleAddressClick(tx.attributes.sent_to)}
          >
            {convertWalletToTag(tx.attributes.sent_to, addresses)}
          </span>
        </div>
      </div>

      {/* Value/Amount Section */}
      <div className="flex flex-col gap-[10px] md:gap-[26px] w-full md:w-auto">
        <div className="flex flex-row gap-[5px] items-center flex-wrap">
          <p className="text-[12px] font-bold whitespace-nowrap">Value:</p>
          <span className="text-black text-[12px]">{value} USD</span>
        </div>
        <div className="flex flex-row gap-[5px] items-center flex-wrap">
          <p className="text-[12px] font-bold whitespace-nowrap">Amount:</p>
          <span className="text-black text-[12px]">
            {amount} {symbol}
          </span>
        </div>
      </div>

      {/* Icon Section */}
      <div className="self-center md:self-auto order-first md:order-last">
        <img
          src={incoming ? incomingIcon : outgoingIcon}
          alt="icon"
          className="w-[24px] h-[24px]"
        />
      </div>
    </div>
  );
}

export default TxCard;
