import Blockchain from '../src/blockchain/blockchain';
import validate from '../src/blockchain/modules/validate';
import Block from '../src/blockchain/block';
import fs from 'fs';
import path from 'path';
const CHAIN_FILE = path.join(__dirname, '../data/blockchain.json');

describe('validate()', () => {
  let blockchain;

  beforeEach(() => {
    if (fs.existsSync(CHAIN_FILE)) fs.unlinkSync(CHAIN_FILE);
    blockchain = new Blockchain();
  });

  it('validates a valid chain', () => {
    // Bloque génesis con data string, bloques siguientes con array de transacciones válidas
    blockchain.blocks[0].data = 'i like ramen.';
    // Elimina bloques extra si existen
    blockchain.blocks = [blockchain.blocks[0]];
    const tx = { inputs: [], outputs: [{ address: 'A', amount: 1 }] };
    blockchain.addBlock([tx]);
    blockchain.addBlock([tx]);
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
