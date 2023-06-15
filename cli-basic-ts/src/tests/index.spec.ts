import { expect } from 'chai';
import { main } from '../index';

describe('Example Test Suite', () => {
  it('should perform a simple assertion', async () => {
    const result = await main({name: 'Roland'});
    expect(result).to.equal('Roland');
  });
});
