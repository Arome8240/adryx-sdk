import { formatUnits, parseUnits } from 'viem';
import { MS_PER_BLOCK } from './constants';

/** Convert wei to CELO. */
export function weiToCelo(wei: number | bigint): number {
  return Number(formatUnits(BigInt(wei), 18));
}

/** Convert CELO to wei. */
export function celoToWei(celo: number): bigint {
  return parseUnits(String(celo), 18);
}

/** Truncate a Celo address for display. */
export function truncateAddress(address: string, chars = 6): string {
  if (address.length <= chars * 2 + 3) return address;
  return `${address.slice(0, chars)}…${address.slice(-chars)}`;
}

/** Format wei as a readable CELO amount. */
export function formatCelo(wei: number | bigint, decimals = 6): string {
  const celo = weiToCelo(wei);
  return `${parseFloat(celo.toFixed(decimals))} CELO`;
}

/** Convert Celo block count to human-readable duration string. */
export function formatDuration(blocks: number): string {
  if (blocks <= 0) return '0 blocks';

  const totalMinutes = Math.floor((blocks * MS_PER_BLOCK) / 60_000);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = Math.floor(totalDays / 30);
  const totalYears = Math.floor(totalDays / 365);

  if (totalYears >= 1) return `${totalYears} year${totalYears > 1 ? 's' : ''}`;
  if (totalMonths >= 1) return `${totalMonths} month${totalMonths > 1 ? 's' : ''}`;
  if (totalWeeks >= 1) return `${totalWeeks} week${totalWeeks > 1 ? 's' : ''}`;
  if (totalDays >= 1) return `${totalDays} day${totalDays > 1 ? 's' : ''}`;
  if (totalHours >= 1) return `${totalHours} hour${totalHours > 1 ? 's' : ''}`;
  return `${totalMinutes} minute${totalMinutes !== 1 ? 's' : ''}`;
}

/** Basic Celo address validation for 0x-prefixed 20-byte hex addresses. */
export function validateAddress(address: string): boolean {
  if (typeof address !== 'string' || address.length === 0) return false;
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/** Convert blocks to milliseconds. */
export function blocksToMs(blocks: number): number {
  return blocks * MS_PER_BLOCK;
}

/** Convert milliseconds to blocks (approximate). */
export function msToBlocks(ms: number): number {
  return Math.floor(ms / MS_PER_BLOCK);
}
