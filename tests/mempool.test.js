// mempool.test.js

const fs = require('fs');
const path = require('path');
const Mempool = require('../src/blockchain/transaction/mempool');
const MEMPOOL_FILE = path.join(__dirname, '../data/mempool.json');

const tx1 = { id: 'tx1' };
const tx2 = { id: 'tx2' };

describe('Mempool', () => {
  beforeEach(() => {
    if (fs.existsSync(MEMPOOL_FILE)) fs.unlinkSync(MEMPOOL_FILE);
  });
  it('adds and retrieves transactions', () => {
    const mempool = new Mempool();
    mempool.addTransaction(tx1);
    mempool.addTransaction(tx2);
    expect(mempool.getTransactions().length).toBe(2);
  });

  it('does not add duplicate transactions', () => {
    const mempool = new Mempool();
    mempool.addTransaction(tx1);
    mempool.addTransaction(tx1);
    expect(mempool.getTransactions().length).toBe(1);
  });

  it('removes transactions', () => {
    const mempool = new Mempool();
    mempool.addTransaction(tx1);
    mempool.addTransaction(tx2);
    mempool.removeTransactions([tx1]);
    expect(mempool.getTransactions().length).toBe(1);
    expect(mempool.getTransactions()[0].id).toBe('tx2');
  });
});
