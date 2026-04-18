import Block from './block';

describe('Block', () => {
  let timestamp;
  let previousBlock;
  let data;
  let hash;

  beforeEach(() => {
    timestamp = new Date(2010, 0, 1);
    previousBlock = Block.genesis;
    data = 't3St-d4t4';
    hash = 'h4S4';
  });

  it('create an instance with parameters', () => {
    const block = new Block(timestamp, previousBlock.hash, hash, data);

    expect(block.timestamp).toEqual(timestamp);
    expect(block.previousHash).toEqual(previousBlock.hash);
    expect(block.data).toEqual(data);
    expect(block.hash).toEqual(hash);
  });

  it('use static mine()', () => {
    const block = Block.mine(previousBlock, data);

    expect(block.hash.length).toEqual(64);
    expect(block.previousHash).toEqual(previousBlock.hash);
    expect(block.data).toEqual(data);
    // El hash debe cumplir con la dificultad
    expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
    expect(typeof block.nonce).toBe('number');
    expect(typeof block.difficulty).toBe('number');
  });

  it('use static hash()', () => {
    // El hash ahora depende de nonce y dificultad
    hash = Block.hash(timestamp, previousBlock.hash, data, 0, 2);
    expect(typeof hash).toBe('string');
    expect(hash.length).toEqual(64);
  });

  it('use toString()', () => {
    const block = Block.mine(previousBlock, data);

    expect(typeof block.toString()).toEqual('string');
    expect(block.toString()).toMatch(/nonce/);
    expect(block.toString()).toMatch(/difficulty/);
  });
});
