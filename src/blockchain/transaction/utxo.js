// utxo.js
// Módulo para calcular el set de UTXOs y validar transacciones
import { Transaction } from './transaction';

// Devuelve un mapa de UTXOs: { address: [{ txId, outputIndex, amount }] }
export function getUTXOSet(blocks) {
  const utxos = {};
  // Primero, agregar todos los outputs
  for (const block of blocks) {
    for (const tx of block.data) {
      tx.outputs.forEach((output, idx) => {
        if (!utxos[output.address]) utxos[output.address] = [];
        utxos[output.address].push({ txId: tx.id, outputIndex: idx, amount: output.amount });
      });
    }
  }
  // Luego, eliminar los outputs gastados
  for (const block of blocks) {
    for (const tx of block.data) {
      for (const input of tx.inputs || []) {
        for (const address in utxos) {
          utxos[address] = utxos[address].filter(
            (utxo) => !(utxo.txId === input.txId && utxo.outputIndex === input.outputIndex)
          );
        }
      }
    }
  }
  return utxos;
}

// Valida que los inputs existan y no estén gastados
export function validateTransaction(tx, utxoSet) {
  let inputSum = 0;
  let outputSum = 0;
  for (const input of tx.inputs) {
    let found = false;
    // Buscar el UTXO en todo el set
    for (const address in utxoSet) {
      for (const utxo of utxoSet[address]) {
        if (utxo.txId === input.txId && utxo.outputIndex === input.outputIndex) {
          inputSum += utxo.amount;
          found = true;
          break;
        }
      }
      if (found) break;
    }
    if (!found) return false;
  }
  for (const output of tx.outputs) {
    outputSum += output.amount;
  }
  // Permitir coinbase (sin inputs)
  if (tx.inputs.length === 0) return true;
  return inputSum >= outputSum;
}
