// mempool.js
// Mempool para almacenar transacciones pendientes
const { saveMempool, loadMempool } = require('../persistencia');
class Mempool {
  constructor() {
    const loaded = loadMempool();
    this.transactions = loaded || [];
  }

  addTransaction(tx) {
    // Evitar duplicados por id
    if (!this.transactions.find(t => t.id === tx.id)) {
      this.transactions.push(tx);
      saveMempool(this.transactions);
    }
  }

  removeTransactions(txs) {
    this.transactions = this.transactions.filter(
      t => !txs.find(tx => tx.id === t.id)
    );
    saveMempool(this.transactions);
  }

  getTransactions() {
    return this.transactions;
  }
}

module.exports = Mempool;
