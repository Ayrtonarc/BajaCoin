// blockchain.mining.test.js
import Blockchain from '../src/blockchain/blockchain';
import { Transaction, TxInput, TxOutput } from '../src/blockchain/transaction/transaction';


describe('Blockchain mining', () => {
  it('adds a block with coinbase transaction', () => {
    const miner = 'miner1';
    const blockchain = new Blockchain(miner);
    blockchain.addBlock();
    const lastBlock = blockchain.blocks[blockchain.blocks.length - 1];
    const coinbaseTx = lastBlock.data[0];
    expect(coinbaseTx.outputs[0].address).toBe(miner);
    expect(coinbaseTx.outputs[0].amount).toBe(blockchain.blockReward);
  });

  it('adds a block with user transactions and coinbase', () => {
    const miner = 'miner2';
    const blockchain = new Blockchain(miner);
    const tx = new Transaction([], [new TxOutput('user1', 10)]);
    blockchain.addBlock([tx]);
    const lastBlock = blockchain.blocks[blockchain.blocks.length - 1];
    expect(lastBlock.data.length).toBe(2); // coinbase + user tx
    expect(lastBlock.data[0].outputs[0].address).toBe(miner);
    expect(lastBlock.data[1].outputs[0].address).toBe('user1');
  });
});
