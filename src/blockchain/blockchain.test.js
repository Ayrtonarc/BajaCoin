import Blockchain from './blockchain';
import Block from './block';

describe('Blockchain', () => {
  let blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
  });

  it('every blockchain has a genesis blockchain', () => {
    const [genesisBlock] = blockchain.blocks;

    expect(genesisBlock).toEqual(Block.genesis);
    expect(blockchain.blocks.length).toEqual(1);
  });

  it('use addBlock()', () => {
    const data = 'd4t4';
    blockchain.addBlock([data]);

    const [, lastBlock] = blockchain.blocks;
    // El primer elemento es la coinbase, el segundo es el dato de usuario
    expect(lastBlock.data[1]).toEqual(data);
    expect(blockchain.blocks.length).toEqual(2);
    // Verifica que la coinbase esté presente
    expect(lastBlock.data[0].outputs[0].address).toBe(blockchain.minerAddress);
    expect(lastBlock.data[0].outputs[0].amount).toBe(blockchain.blockReward);
  });
});
