// transaction.test.js
import { Transaction, TxInput, TxOutput } from './transaction';

describe('Transaction', () => {
  it('creates a transaction with inputs and outputs', () => {
    const inputs = [new TxInput('txid1', 0, 'signature1')];
    const outputs = [new TxOutput('address1', 50)];
    const tx = new Transaction(inputs, outputs);

    expect(tx.inputs.length).toBe(1);
    expect(tx.outputs.length).toBe(1);
    expect(typeof tx.id).toBe('string');
    expect(tx.id.length).toBe(64);
  });

  it('generates a unique id for different transactions', () => {
    const tx1 = new Transaction([new TxInput('a', 0)], [new TxOutput('b', 10)]);
    const tx2 = new Transaction([new TxInput('a', 1)], [new TxOutput('b', 10)]);
    expect(tx1.id).not.toBe(tx2.id);
  });
});
