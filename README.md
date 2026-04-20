# celo-health-sdk

TypeScript SDK for interacting with Celo Health contracts on the [Celo](https://celo.org) blockchain.

## Installation

```bash
npm install celo-health-sdk
```

## Quick start

```ts
import {
  createCeloHealthConfig,
  fetchBlockNumber,
  fetchCeloBalance,
  fetchPatientRecordCount,
  formatCelo,
} from 'celo-health-sdk';

const config = createCeloHealthConfig({
  network: 'celo',
  contractAddress: '0x209c0138c80C60a570333D03b980e1cA22880fE1',
});

const blockNumber = await fetchBlockNumber(config);
console.log(`Current block: ${blockNumber}`);

const balanceWei = await fetchCeloBalance(
  config,
  '0xA8D9d84f838c72e5e02717Ee7c3B36b4528a86e3',
);
console.log(`Balance: ${formatCelo(balanceWei)}`);

const patientCount = await fetchPatientRecordCount(config);
console.log(`Patient records: ${patientCount}`);
```

## API

### `createCeloHealthConfig(options)`

Creates a resolved config object required by all SDK functions.

```ts
const config = createCeloHealthConfig({
  network: 'celo', // 'celo' | 'celo-sepolia'
  contractAddress: '0x...',
  rpcUrl: 'https://...', // optional
});
```

### Contract functions

| Function | Description |
|---|---|
| `fetchBlockNumber(config)` | Get the current Celo block number |
| `fetchCeloBalance(config, address)` | Get account CELO balance in wei |
| `fetchErc20Balance(config, tokenAddress, account)` | Get ERC-20 token balance |
| `fetchPatientRecordCount(config)` | Read `patientRecordCount()` from health contract |
| `fetchHospitalCount(config)` | Read `hospitalCount()` from health contract |
| `readContract(config, abi, functionName, args)` | Generic read-only contract call |

### Utilities

```ts
import {
  weiToCelo,
  celoToWei,
  truncateAddress,
  formatCelo,
  formatDuration,
} from 'celo-health-sdk';

weiToCelo(1_000_000_000_000_000_000n); // 1
celoToWei(1);                            // 1000000000000000000n
truncateAddress('0xA8D9...86e3', 6);     // '0xA8D9…8a86e3'
formatCelo(1_500_000_000_000_000_000n);  // '1.5 CELO'
formatDuration(12);                      // '1 minute'
```

### Constants

```ts
import { MS_PER_BLOCK, BLOCKS_PER_DAY, BLOCKS_PER_WEEK } from 'celo-health-sdk';
```

| Constant | Value | Description |
|---|---|---|
| `MS_PER_BLOCK` | `5_000` | Milliseconds per Celo block |
| `BLOCKS_PER_DAY` | `17_280` | ~1 day |
| `BLOCKS_PER_WEEK` | `120_960` | ~1 week |
| `BLOCKS_PER_MONTH` | `518_400` | ~1 month |
| `BLOCKS_PER_YEAR` | `6_307_200` | ~1 year |

## License

MIT
