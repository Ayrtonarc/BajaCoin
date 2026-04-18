import Block from '../block';

export default (blockchain) => {
  const [genesisBlock, ...blocks] = blockchain;

  // Validar bloque génesis
  if (JSON.stringify(genesisBlock) !== JSON.stringify(Block.genesis)) throw Error('Invalid Genesis block.');

  const seenHashes = new Set();
  for (let i = 0; i < blocks.length; i += 1) {
    const {
      previousHash, timestamp, hash, data, nonce, difficulty,
    } = blocks[i];
    const previousBlock = blockchain[i];

    // Validar hash previo
    if (previousHash !== previousBlock.hash) throw Error('Invalid previous hash.');
    // Validar hash propio
    if (hash !== Block.hash(timestamp, previousHash, data, nonce, difficulty)) throw Error('Invalid hash.');
    // Validar dificultad
    if (hash.substring(0, difficulty) !== '0'.repeat(difficulty)) throw Error('Hash does not meet difficulty.');
    // Validar duplicados
    if (seenHashes.has(hash)) throw Error('Duplicate block hash detected.');
    seenHashes.add(hash);
    // Validar tamaño de bloque (ejemplo: máx 1MB)
    const blockSize = Buffer.byteLength(JSON.stringify(blocks[i]), 'utf8');
    if (blockSize > 1_000_000) throw Error('Block size exceeds 1MB.');
    // Validar estructura de transacciones
    if (!Array.isArray(data)) throw Error('Block data must be an array of transactions.');
    for (const tx of data) {
      if (!tx || typeof tx !== 'object') throw Error('Invalid transaction object.');
      if (!Array.isArray(tx.inputs) || !Array.isArray(tx.outputs)) throw Error('Transaction must have inputs and outputs arrays.');
      // Validar que los montos sean positivos
      for (const output of tx.outputs) {
        if (typeof output.amount !== 'number' || output.amount < 0) throw Error('Transaction output amount must be positive.');
      }
    }
  }
  return true;
};
