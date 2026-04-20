import { describe, it, expect } from 'vitest';
import {
  weiToCelo,
  celoToWei,
  truncateAddress,
  formatCelo,
  formatDuration,
  validateAddress,
  blocksToMs,
  msToBlocks,
} from '../src/utils';

describe('weiToCelo', () => {
  it('converts 1e18 wei to 1 CELO', () => {
    expect(weiToCelo(1_000_000_000_000_000_000n)).toBe(1);
  });
});

describe('celoToWei', () => {
  it('converts 1 CELO to 1e18 wei', () => {
    expect(celoToWei(1)).toBe(1_000_000_000_000_000_000n);
  });
});

describe('truncateAddress', () => {
  const addr = '0xA8D9d84f838c72e5e02717Ee7c3B36b4528a86e3';

  it('truncates a long address', () => {
    const result = truncateAddress(addr);
    expect(result).toContain('…');
    expect(result.length).toBeLessThan(addr.length);
  });

  it('returns short addresses unchanged', () => {
    expect(truncateAddress('0x123')).toBe('0x123');
  });
});

describe('formatCelo', () => {
  it('formats wei as CELO string', () => {
    expect(formatCelo(1_500_000_000_000_000_000n)).toBe('1.5 CELO');
  });
});

describe('formatDuration', () => {
  it('formats 1 minute at 5s blocks', () => {
    expect(formatDuration(12)).toBe('1 minute');
  });
});

describe('validateAddress', () => {
  it('accepts valid 0x address', () => {
    expect(validateAddress('0xA8D9d84f838c72e5e02717Ee7c3B36b4528a86e3')).toBe(true);
  });

  it('rejects invalid address', () => {
    expect(validateAddress('INVALID')).toBe(false);
  });
});

describe('blocksToMs', () => {
  it('converts blocks to milliseconds', () => {
    expect(blocksToMs(1)).toBe(5_000);
  });
});

describe('msToBlocks', () => {
  it('converts milliseconds to blocks', () => {
    expect(msToBlocks(5_000)).toBe(1);
  });
});
