import { describe, it, expect } from 'vitest';
import { createCeloHealthConfig } from '../src/config';

describe('createCeloHealthConfig', () => {
  it('creates config with default mainnet RPC', () => {
    const config = createCeloHealthConfig({
      network: 'celo',
      contractAddress: '0x209c0138c80C60a570333D03b980e1cA22880fE1',
    });

    expect(config.network).toBe('celo');
    expect(config.rpcUrl).toBe('https://forno.celo.org');
  });

  it('uses custom RPC URL when supplied', () => {
    const config = createCeloHealthConfig({
      network: 'celo-sepolia',
      contractAddress: '0x209c0138c80C60a570333D03b980e1cA22880fE1',
      rpcUrl: 'https://example-rpc.local',
    });

    expect(config.rpcUrl).toBe('https://example-rpc.local');
  });
});
