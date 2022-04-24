import { jest } from '@jest/globals'; // https://jestjs.io/docs/ecmascript-modules#differences-between-esm-and-commonjs
import { main } from '../index.js';

describe('test suite', () => {
  it('test case', async () => {
    const result = await main({});
    expect(result).toBe('hello');
  });
});
