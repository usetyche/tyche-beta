/*
 * Cache configuration with TTL values in seconds.
 */
const cacheConfig = {
	default: 3600, // 1 hour

	// Categories for internal data
	userWallets: 60 * 10, // 10 minutes
	userProfile: 60 * 10, // 10 minutes



	// Categories for web3
	// Solana
	walletBalance: 60, // 1 minute
	walletTokens: 60, // 1 minute
	walletTransactions: 60, // 1 minute
	// Ethereum
	walletTransactions: 60, // 1 minute
	walletPositions: 60, // 1 minute
	nonFungiblePositions: 60, // 1 minute

	// Categories for web3 utilities
	fiatPrice: 60 * 2, // 2 minutes
	tokenMetadata: 60 * 60 * 24, // 1 day
};

export default cacheConfig;
