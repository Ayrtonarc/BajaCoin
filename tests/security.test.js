import Blockchain from '../src/blockchain/blockchain';
import validate from '../src/blockchain/modules/validate';

describe('Seguridad de la blockchain', () => {
  let blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
  });

  it('detecta bloques duplicados (hash repetido)', () => {
    blockchain.addBlock('bl4ck-1');
    // Duplicar el hash del bloque 1 en el bloque 2
    blockchain.addBlock('bl4ck-2');
    blockchain.blocks[2].hash = blockchain.blocks[1].hash;
    expect(() => validate(blockchain.blocks)).toThrow('Duplicate block hash detected.');
  });

  it('detecta tamaño de bloque mayor a 1MB', () => {
    const bigData = Array(1024 * 1024).fill('a').join('');
    blockchain.addBlock([ { inputs: [], outputs: [{ amount: 1 }], bigData } ]);
    expect(() => validate(blockchain.blocks)).toThrow('Block size exceeds 1MB.');
  });

  it('detecta transacción con monto negativo', () => {
    blockchain.addBlock([
      { inputs: [], outputs: [{ amount: -100 }] }
    ]);
    expect(() => validate(blockchain.blocks)).toThrow('Transaction output amount must be positive.');
  });

  it('detecta datos de bloque no array', () => {
    blockchain.addBlock('no-array');
    expect(() => validate(blockchain.blocks)).toThrow('Block data must be an array of transactions.');
  });

  it('detecta transacción inválida (sin inputs/outputs)', () => {
    blockchain.addBlock([ { foo: 'bar' } ]);
    expect(() => validate(blockchain.blocks)).toThrow('Transaction must have inputs and outputs arrays.');
  });
});
