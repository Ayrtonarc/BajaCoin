// Transaction.js
// Estructura de transacción tipo Bitcoin (UTXO)

const { SHA256 } = require('crypto-js');

class Transaction {
  constructor(inputs, outputs) {
    this.inputs = inputs; // [{ txId, outputIndex, signature }]
    this.outputs = outputs; // [{ address, amount }]
    this.id = this.calculateId();
  }

  calculateId() {
    return SHA256(JSON.stringify(this.inputs) + JSON.stringify(this.outputs)).toString();
  }
}

class TxInput {
  constructor(txId, outputIndex, signature = null) {
    this.txId = txId;
    this.outputIndex = outputIndex;
    this.signature = signature; // Para simplificar, puede ser null
  }
}

class TxOutput {
  constructor(address, amount) {
    this.address = address;
    this.amount = amount;
  }
}
module.exports = { Transaction, TxInput, TxOutput };
