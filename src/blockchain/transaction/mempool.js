// mempool.js
// Mempool para almacenar transacciones pendientes
class Mempool {
  constructor() {
    this.transactions = [];
  }

  addTransaction(tx) {
    // Evitar duplicados por id
    if (!this.transactions.find(t => t.id === tx.id)) {
      this.transactions.push(tx);
    }
  }

  removeTransactions(txs) {
    this.transactions = this.transactions.filter(
      t => !txs.find(tx => tx.id === t.id)
    );
  }

  getTransactions() {
    return this.transactions;
  }
}

module.exports = Mempool;
