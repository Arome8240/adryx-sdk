import { describe, it, expect } from 'vitest';
import {
  MS_PER_BLOCK,
  BLOCKS_PER_DAY,
  BLOCKS_PER_WEEK,
  BLOCKS_PER_MONTH,
  BLOCKS_PER_YEAR,
} from '../src/constants';

describe('MS_PER_BLOCK', () => {
  it('is 5_000 ms (5 seconds)', () => {
    expect(MS_PER_BLOCK).toBe(5_000);
  });
});

describe('block time constants', () => {
  it('BLOCKS_PER_DAY is 17_280', () => {
    expect(BLOCKS_PER_DAY).toBe(17_280);
  });
  it('BLOCKS_PER_WEEK is 120_960', () => {
    expect(BLOCKS_PER_WEEK).toBe(120_960);
  });
  it('BLOCKS_PER_MONTH is 518_400', () => {
    expect(BLOCKS_PER_MONTH).toBe(518_400);
  });
  it('BLOCKS_PER_YEAR is 6_307_200', () => {
    expect(BLOCKS_PER_YEAR).toBe(6_307_200);
  });
});
