// Transaction.js
// Estructura de transacción tipo Bitcoin (UTXO)

import { SHA256 } from 'crypto-js';

export class Transaction {
  constructor(inputs, outputs) {
    this.inputs = inputs; // [{ txId, outputIndex, signature }]
    this.outputs = outputs; // [{ address, amount }]
    this.id = this.calculateId();
  }

  calculateId() {
    return SHA256(JSON.stringify(this.inputs) + JSON.stringify(this.outputs)).toString();
  }
}

export class TxInput {
  constructor(txId, outputIndex, signature = null) {
    this.txId = txId;
    this.outputIndex = outputIndex;
    this.signature = signature; // Para simplificar, puede ser null
  }
}

export class TxOutput {
  constructor(address, amount) {
    this.address = address;
    this.amount = amount;
  }
}
