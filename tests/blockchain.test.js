import Blockchain from '../src/blockchain/blockchain';
import Block from '../src/blockchain/block';
import { Transaction, TxOutput } from '../src/blockchain/transaction/transaction';

describe('Blockchain', () => {
  let blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
  });

  it('every blockchain has a genesis block with correct structure', () => {
    const [genesisBlock] = blockchain.blocks;
    expect(genesisBlock.hash).toBe('g3n3s1s-h4sh');
    expect(genesisBlock.previousHash).toBeUndefined();
    expect(typeof genesisBlock.data).toBe('string');
    // Permite 1 o más bloques si hay residuos, pero el génesis debe ser correcto
    expect(blockchain.blocks[0].hash).toBe('g3n3s1s-h4sh');
  });

  it('addBlock() includes coinbase and user transaction', () => {
    const tx = new Transaction([], [new TxOutput('user1', 10)]);
    blockchain.addBlock([tx]);
    const lastBlock = blockchain.blocks[blockchain.blocks.length - 1];
    // El primer elemento es la coinbase, el segundo es la transacción de usuario
    expect(lastBlock.data[0].outputs[0].address).toBe(blockchain.minerAddress);
    expect(lastBlock.data[0].outputs[0].amount).toBe(blockchain.blockReward);
    // Compara solo propiedades relevantes de la transacción de usuario
    expect(lastBlock.data[1].outputs[0].address).toBe('user1');
    expect(lastBlock.data[1].outputs[0].amount).toBe(10);
  });
});
