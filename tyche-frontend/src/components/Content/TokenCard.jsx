import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import formatCurrency from "../../utils/formatCurrency";
import { getNetworkIcon } from "../../utils/NetworkManager";

function TokenCard({ token }) {
  const [formattedValue, setFormattedValue] = useState(null);
  const selectedCurrency = useSelector((state) => state.settings.currency);
  const selectedNetwork = useSelector((state) => state.global.selectedNetwork); // Fetching networkName from Redux store

  useEffect(() => {
    const fetchTokenValue = async () => {
      try {
        const convertedValue = await formatCurrency(
          token.valueUsd,
          selectedCurrency
        );

        setFormattedValue(convertedValue);
      } catch (error) {
        console.error("Error calculating token value:", error);
      }
    };

    fetchTokenValue();
  }, [
    token.holdingAmount,
    token.tokenContractAddress,
    selectedNetwork, // Using the selectedNetwork from Redux
    selectedCurrency,
  ]);

  return (
    <div className="token-card bg-white p-[4px] pr-[7px] rounded-full flex justify-between items-center">
      {/* Asset Image */}
      <div className="token-asset flex items-center w-full">
        {/* Temporary image */}
        {getNetworkIcon(selectedNetwork) !== "" 
         ? (
          <img src={getNetworkIcon(selectedNetwork)} alt={token.symbol} className="w-[27px] h-[27px]" /> 
        ) : (
          <div className="w-[27px] h-[27px] bg-gray-300 rounded-full"></div>
        )}
      </div>

      {/* Token Info */}
      <div className="token-info flex items-center justify-start w-full">
        <p className="text-tycheGray text-[12px] justify-start">
          {token.holdingAmount} {token.symbol}
        </p>
      </div>

      {/* Token Amount & Value */}
      <div className="token-amount flex items-center justify-end w-full">
        <span className="text-black text-[12px] justify-end">
          {formattedValue || token.holdingAmount} {selectedCurrency}
        </span>
      </div>
    </div>
  );
}

TokenCard.propTypes = {
  token: PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    tokenContractAddress: PropTypes.string.isRequired,
    holdingAmount: PropTypes.string.isRequired,
    valueUsd: PropTypes.string, // This will be used later for value calculations
  }).isRequired,
};

export default TokenCard;
