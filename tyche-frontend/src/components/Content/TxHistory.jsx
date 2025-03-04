import TxCard from "./TxCard";
import filterIcon from "./../../assets/images/icons/filterIcon.svg";

function TxHistory({
  transactionsLoading,
  transactions,
  currentNetwork,
  currentAddress,
}) {
  return (
    <div className="flex flex-col gap-[8px] h-full">
      <p className="text-[24px] tracking-wide font-[350] text-tychePrimary">
        Transaction History
      </p>
      <div className="p-6 bg-tycheLightGray shadow rounded-[20px] flex flex-col h-full">
        <div className="flex flex-row justify-end items-center mb-[25px]">
          <button className="flex flex-row gap-[7px] px-[10px] py-[5px] items-center justify-center text-tycheDarkBlue text-[12px] font-[600] tracking-wide rounded-full border-[2px] border-dashed w-fit border-tycheDarkBlue">
            <img
              src={filterIcon}
              alt="Filter"
              className="max-w-[10px] max-h-[10px] min-w-[10px] min-h-[10px]"
            />
            <p>Filter</p>
          </button>
        </div>
        <div className="flex-grow overflow-y-auto min-h-[420px] max-h-[420px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
            {transactionsLoading &&
              Array(5) //5 skeleton loaders
                .fill(null)
                .map((_, index) => (
                  // Skeleton loader
                  <div
                    key={index}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-4 rounded-[20px] gap-4 md:gap-2"
                  >
                    {/* Timestamp and Hash Section */}
                    <div className="flex flex-col gap-[6px] text-[12px] w-full md:w-auto h-16 pt-2">
                      <p className="bg-gray-300 h-3 w-14 animate-pulse"></p>
                      <p className="bg-gray-300 h-3 w-10 animate-pulse rounded-sm"></p>
                      <p className="bg-gray-300 h-3 w-24 animate-pulse rounded-sm"></p>
                    </div>

                    {/* From/To Section */}
                    <div className="flex flex-col gap-[10px] md:gap-[26px] w-full md:w-auto">
                      <div className="flex flex-row gap-[5px] items-center flex-wrap">
                        <div className="bg-gray-300 h-3 w-32 animate-pulse rounded-sm"/>
                        <span className="text-tycheBlue text-[12px] cursor-pointer hover:underline break-all"/>
                      </div>
                      <div className="flex flex-row gap-[5px] items-center flex-wrap">
                        <div className="bg-gray-300 h-3 w-28 animate-pulse rounded-sm"/>
                        <span className="text-tycheBlue text-[12px] cursor-pointer hover:underline break-all"/>
                      </div>
                    </div>

                    {/* Value/Amount Section */}
                    <div className="flex flex-col gap-[10px] md:gap-[26px] w-full md:w-auto">
                      <div className="flex flex-row gap-[5px] items-center flex-wrap">
                        <div className="bg-gray-300 h-3 w-20 animate-pulse rounded-sm"/>
                      </div>
                      <div className="flex flex-row gap-[5px] items-center flex-wrap">
                        <div className="bg-gray-300 h-3 w-24 animate-pulse rounded-sm"/>
                      </div>
                    </div>

                    {/* Icon Section */}
                    <div className="self-center md:self-auto order-first md:order-last rounded-full bg-gray-300 h-6 w-6 animate-pulse"/>
                  </div>
                ))}

            {transactions.map((tx, index) => {
              const txId = tx.attributes?.hash || `tx-${index}`;
              const transactionTime = tx.attributes?.mined_at || null;
              return (
                <TxCard
                  key={txId}
                  tx={{
                    ...tx,
                    transactionTime,
                    txId,
                  }}
                  currentNetwork={currentNetwork}
                  currentAddress={currentAddress}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TxHistory;
