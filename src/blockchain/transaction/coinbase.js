// coinbase.js
// Crea una transacción coinbase (recompensa de minería)
const { Transaction, TxInput, TxOutput } = require('./transaction');

function createCoinbaseTx(address, amount) {
  // Coinbase no tiene inputs, solo outputs
  return new Transaction([], [new TxOutput(address, amount)]);
}
module.exports = { createCoinbaseTx };
