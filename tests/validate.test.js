import Blockchain from '../src/blockchain/blockchain';
import validate from '../src/blockchain/modules/validate';
import Block from '../src/blockchain/block';

describe('validate()', () => {
  let blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
  });

  it('validates a valid chain', () => {
    // Bloque génesis con data string, bloques siguientes con array de transacciones
    blockchain.blocks[0].data = 'i like ramen.';
    blockchain.addBlock([]);
    blockchain.addBlock([]);
    expect(validate(blockchain.blocks)).toBe(true);
  });

  it('invalidates a chain with a corrupt genesis block', () => {
    blockchain.blocks[0].data = 'h4ck-data';
    expect(() => {
      validate(blockchain.blocks);
    }).toThrow('Invalid Genesis block.');
  });

  it('invalidates a chain with a corrupt previousHash within a block', () => {
    blockchain.addBlock([]);
    blockchain.blocks[1].previousHash = 'h4ck-previoushash';
    expect(() => {
      validate(blockchain.blocks);
    }).toThrow('Invalid previous hash.');
  });

  it('invalidates a chain with a corrupt hash within a block', () => {
    blockchain.addBlock([]);
    blockchain.blocks[1].hash = 'h4ck-hash';
    expect(() => {
      validate(blockchain.blocks);
    }).toThrow('Invalid hash.');
  });
});
