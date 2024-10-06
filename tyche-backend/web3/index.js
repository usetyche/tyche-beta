// web3/index.js
import SolanaNetwork from "./networks/solana.js";

const networks = {
	solana: SolanaNetwork,
};

const createNetwork = (networkType) => {
	const NetworkClass = networks[networkType.toLowerCase()];
	if (!NetworkClass) {
		throw new Error(`Network type "${networkType}" is not supported.`);
	}

	const apiKey = process.env.ALCHEMY_API_KEY;
	if (!apiKey) {
		throw new Error(
			"ALCHEMY_API_KEY is not defined in the environment variables."
		);
	}

	return new NetworkClass(apiKey);
};

export default createNetwork;