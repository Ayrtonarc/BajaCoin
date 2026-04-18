// p2p.tx.test.js
// Test de propagación de transacciones en la red P2P (mock)
const Mempool = require('../src/blockchain/transaction/mempool');
const P2PServer = require('../src/blockchain/p2p');

describe('P2PServer TX propagation', () => {
  it('should add received TX to mempool', () => {
    const blockchain = { blocks: [] };
    const mempool = new Mempool();
    const p2p = new P2PServer(blockchain, mempool);
    // Mock socket
    const messages = [];
    const socket = { on: (event, cb) => {
      if (event === 'message') {
        cb(JSON.stringify({ type: 'TX', tx: { id: 'tx123' } }));
      }
    }, send: (msg) => messages.push(msg) };
    p2p.connectSocket(socket);
    expect(mempool.getTransactions().find(tx => tx.id === 'tx123')).toBeTruthy();
  });
});
