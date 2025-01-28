// TODO: kullanmazsak kalkacak

import axios from "axios";

// Function to fetch price data from the CoinGecko API
const fetchPriceUsd = async (symbol) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price`,
      {
        params: {
          ids: symbol,
          vs_currencies: "usd",
        },
      }
    );
    return response.data[symbol]?.usd || 1;
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error);
    return 1;
  }
};

export const processNativeTokenData = async (addressInfo, network) => {
  // Log addressInfo to inspect its structure
  console.log("addressInfo:", addressInfo);

  // Add defensive checks to ensure addressInfo and necessary properties exist
  if (!addressInfo || !addressInfo.balance || !addressInfo.balanceSymbol) {
    console.error("Missing balance or balanceSymbol in addressInfo");
    return null;
  }

  const { balance, balanceSymbol } = addressInfo;

  try {
    // Fetch the price of the native token (ETH, BTC, etc.)
    const priceUsd = await fetchPriceUsd(network);

    console.log(
      "balanceSymbol:",
      balanceSymbol,
      "balance:",
      balance,
      "priceUsd:",
      priceUsd
    );

    // Prepare the native token data
    const nativeTokenData = {
      symbol: balanceSymbol, // Native token symbol (e.g., ETH)
      tokenContractAddress: "", // Native tokens don't have contract addresses
      holdingAmount: balance, // The balance of the native token
      priceUsd: priceUsd.toString(), // Price in USD as string
      valueUsd: (parseFloat(balance) * priceUsd).toFixed(2).toString(), // Value in USD as string
      tokenId: "", // No tokenId for native tokens
    };

    return nativeTokenData;
  } catch (error) {
    console.error("Error processing native token data:", error);
    return null;
  }
};

export const concatNativeTokenWithTokenData = (nativeTokenData, tokenData) => {
  if (!nativeTokenData) {
    console.error("Native token data is missing, skipping concat.");
    return tokenData;
  }

  if (
    tokenData &&
    tokenData.data &&
    tokenData.data[0] &&
    tokenData.data[0].tokenList
  ) {
    // Concatenate native token data with the token list
    tokenData.data[0].tokenList = [
      ...tokenData.data[0].tokenList,
      nativeTokenData,
    ];
  } else {
    // Handle cases where tokenData is not properly structured
    tokenData = {
      data: [
        {
          tokenList: [nativeTokenData],
        },
      ],
    };
  }

  return tokenData;
};
