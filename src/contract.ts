import {
  createPublicClient,
  erc20Abi,
  formatUnits,
  http,
  parseAbi,
  type Abi,
  type Address,
} from 'viem';
import { celo, celoSepolia } from 'viem/chains';
import type { ResolvedCeloHealthConfig } from './config';

const healthRecordAbi = parseAbi([
  'function patientRecordCount() view returns (uint256)',
  'function hospitalCount() view returns (uint256)',
]);

function getChain(network: ResolvedCeloHealthConfig['network']) {
  return network === 'celo' ? celo : celoSepolia;
}

function getClient(config: ResolvedCeloHealthConfig) {
  return createPublicClient({
    chain: getChain(config.network),
    transport: http(config.rpcUrl),
  });
}

/** Fetch current Celo block number. */
export async function fetchBlockNumber(config: ResolvedCeloHealthConfig): Promise<bigint> {
  try {
    const client = getClient(config);
    return await client.getBlockNumber();
  } catch {
    return 0n;
  }
}

/** Fetch CELO balance for an address in wei. */
export async function fetchCeloBalance(
  config: ResolvedCeloHealthConfig,
  address: Address,
): Promise<bigint> {
  try {
    const client = getClient(config);
    return await client.getBalance({ address });
  } catch {
    return 0n;
  }
}

/** Fetch ERC-20 balance for an address from any token contract. */
export async function fetchErc20Balance(
  config: ResolvedCeloHealthConfig,
  tokenAddress: Address,
  account: Address,
): Promise<bigint> {
  try {
    const client = getClient(config);
    return await client.readContract({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [account],
    });
  } catch {
    return 0n;
  }
}

/** Read patient count from the configured health contract. */
export async function fetchPatientRecordCount(config: ResolvedCeloHealthConfig): Promise<bigint> {
  try {
    const client = getClient(config);
    return await client.readContract({
      address: config.contractAddress,
      abi: healthRecordAbi,
      functionName: 'patientRecordCount',
    });
  } catch {
    return 0n;
  }
}

/** Read hospital count from the configured health contract. */
export async function fetchHospitalCount(config: ResolvedCeloHealthConfig): Promise<bigint> {
  try {
    const client = getClient(config);
    return await client.readContract({
      address: config.contractAddress,
      abi: healthRecordAbi,
      functionName: 'hospitalCount',
    });
  } catch {
    return 0n;
  }
}

/** Generic read-only contract call helper for custom contract methods. */
export async function readContract<T = unknown>(
  config: ResolvedCeloHealthConfig,
  abi: Abi,
  functionName: string,
  args: readonly unknown[] = [],
): Promise<T | null> {
  try {
    const client = getClient(config);
    const result = await client.readContract({
      address: config.contractAddress,
      abi,
      functionName,
      args,
    });
    return result as T;
  } catch {
    return null;
  }
}

/** Format wei to CELO string. */
export function formatCeloBalance(balanceWei: bigint, decimals = 18): string {
  return formatUnits(balanceWei, decimals);
}
