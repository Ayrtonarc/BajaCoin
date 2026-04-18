import Blockchain from '../src/blockchain/blockchain';
import validate from '../src/blockchain/modules/validate';
import fs from 'fs';
import path from 'path';
const CHAIN_FILE = path.join(__dirname, '../data/blockchain.json');

describe('Seguridad de la blockchain', () => {
  let blockchain;

  beforeEach(() => {
    if (fs.existsSync(CHAIN_FILE)) fs.unlinkSync(CHAIN_FILE);
    blockchain = new Blockchain();
  });

  it('detecta bloques duplicados (hash repetido)', () => {
    const tx = { inputs: [], outputs: [{ address: 'A', amount: 1 }] };
    blockchain.addBlock([tx]);
    blockchain.addBlock([tx]);
    // Duplicar el hash del bloque 1 en el bloque 2
    blockchain.blocks[2].hash = blockchain.blocks[1].hash;
    expect(() => validate(blockchain.blocks)).toThrow(/Duplicate block hash detected.|Invalid hash/);
  });

  it('detecta tamaño de bloque mayor a 1MB', () => {
    const bigData = Array(1024 * 1024).fill('a').join('');
    const tx = { inputs: [], outputs: [{ address: 'A', amount: 1 }], bigData };
    blockchain.addBlock([tx]);
    expect(() => validate(blockchain.blocks)).toThrow('Block size exceeds 1MB.');
  });

  it('detecta transacción con monto negativo', () => {
    const tx = { inputs: [], outputs: [{ address: 'A', amount: -100 }] };
    blockchain.addBlock([tx]);
    expect(() => validate(blockchain.blocks)).toThrow('Transaction output amount must be positive.');
  });

  it('detecta datos de bloque no array', () => {
    blockchain.addBlock('no-array');
    expect(() => validate(blockchain.blocks)).toThrow(/Block data must be an array of transactions.|Invalid transaction object/);
  });

  it('detecta transacción inválida (sin inputs/outputs)', () => {
    blockchain.addBlock([ { foo: 'bar' } ]);
    expect(() => validate(blockchain.blocks)).toThrow('Transaction must have inputs and outputs arrays.');
  });
});
