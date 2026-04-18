// coinbase.js
// Crea una transacción coinbase (recompensa de minería)
import { Transaction, TxInput, TxOutput } from './transaction';

export function createCoinbaseTx(address, amount) {
  // Coinbase no tiene inputs, solo outputs
  return new Transaction([], [new TxOutput(address, amount)]);
}
