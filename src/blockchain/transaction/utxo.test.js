// utxo.test.js
import { Transaction, TxInput, TxOutput } from './transaction';
import { getUTXOSet, validateTransaction } from './utxo';

describe('UTXO', () => {
  it('calculates UTXO set and validates tx', () => {
    // Bloque 1: coinbase para A
    const coinbase = new Transaction([], [new TxOutput('A', 50)]);
    // Bloque 2: A paga 30 a B
    const tx1 = new Transaction([new TxInput(coinbase.id, 0, 'A')], [new TxOutput('B', 30), new TxOutput('A', 20)]);
    // Simular blockchain
    const blocks = [
      { data: [coinbase] }
    ];
    let utxos = getUTXOSet(blocks);
    // Validar tx1 ANTES de aplicarla
    expect(validateTransaction(tx1, utxos)).toBe(true);
    // Tx inválida: A intenta gastar más de lo que tiene
    const tx2 = new Transaction([new TxInput(coinbase.id, 0, 'A')], [new TxOutput('B', 60)]);
    expect(validateTransaction(tx2, utxos)).toBe(false);
    // Ahora aplicar tx1 y verificar UTXOs
    blocks.push({ data: [tx1] });
    utxos = getUTXOSet(blocks);
    expect(utxos['A'].length).toBe(1);
    expect(utxos['A'][0].amount).toBe(20);
    expect(utxos['B'].length).toBe(1);
    expect(utxos['B'][0].amount).toBe(30);
  });
});
