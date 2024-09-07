import PropTypes from "prop-types";
import TxCard from "./TxCard";

function TxHistory({ transactions, currentNetwork, currentAddress }) {
  return (
    <div className="p-4 bg-tycheBeige shadow rounded col-span-8">
      <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
      <div
        className={`space-y-4 ${
          transactions.length > 5
            ? "max-h-[578px] overflow-y-scroll"
            : "min-h-[578px]"
        }`}
      >
        {transactions.map((tx, index) => {
          // Ensure txId is present, use fallback if missing
          const txId = tx.attributes?.hash || `tx-${index}`;
          const transactionTime = tx.attributes?.mined_at || null;

          return (
            <TxCard
              key={txId} // txId is now guaranteed
              tx={{
                ...tx,
                transactionTime,
                txId, // Pass the transaction ID
              }}
              currentNetwork={currentNetwork}
              currentAddress={currentAddress}
            />
          );
        })}
      </div>
    </div>
  );
}

TxHistory.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      txId: PropTypes.string.isRequired, // txId must be provided and is required
      transactionTime: PropTypes.string,
      from: PropTypes.string,
      to: PropTypes.string,
      amount: PropTypes.string,
      symbol: PropTypes.string,
    })
  ).isRequired,
  currentNetwork: PropTypes.string.isRequired,
  currentAddress: PropTypes.string.isRequired,
};

export default TxHistory;
