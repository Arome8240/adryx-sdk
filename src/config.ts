export type NetworkName = 'celo' | 'celo-sepolia';

export interface CeloHealthConfig {
  network: NetworkName;
  contractAddress: `0x${string}`;
  rpcUrl?: string;
}

const DEFAULT_CELO_MAINNET_RPC = 'https://forno.celo.org';
const DEFAULT_CELO_SEPOLIA_RPC = 'https://forno.celo-sepolia.celo-testnet.org';

export function createCeloHealthConfig(config: CeloHealthConfig) {
  const rpcUrl =
    config.rpcUrl ??
    (config.network === 'celo' ? DEFAULT_CELO_MAINNET_RPC : DEFAULT_CELO_SEPOLIA_RPC);

  return {
    network: config.network as NetworkName,
    contractAddress: config.contractAddress,
    rpcUrl,
  };
}

export type ResolvedCeloHealthConfig = ReturnType<typeof createCeloHealthConfig>;
