const { SHA256 } = require('crypto-js');


class Block {
  constructor(timestamp, previousHash, hash, data, nonce = 0, difficulty = 2) {
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static get genesis() {
    const timestamp = (new Date(2000, 0, 1)).getTime();
    return new this(timestamp, undefined, 'g3n3s1s-h4sh', 'i like ramen.', 0, 2);
  }

  static mine(previousBlock, data) {
    const { hash: previousHash, difficulty: prevDifficulty } = previousBlock;
    let nonce = 0;
    let hash, timestamp;
    const difficulty = Block.adjustDifficulty(previousBlock);
    do {
      timestamp = Date.now();
      hash = Block.hash(timestamp, previousHash, data, nonce, difficulty);
      nonce++;
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));
    return new this(timestamp, previousHash, hash, data, nonce - 1, difficulty);
  }

  static hash(timestamp, previousHash, data, nonce = 0, difficulty = 2) {
    return SHA256(`${timestamp}${previousHash}${data}${nonce}${difficulty}`).toString();
  }

  static adjustDifficulty(previousBlock) {
    // Para demo, dificultad fija. Se puede hacer dinámica según el tiempo de minado.
    return previousBlock.difficulty || 2;
  }

  toString() {
    const {
      timestamp, previousHash, hash, data, nonce, difficulty,
    } = this;

    return `Block -
      timestamp       : ${timestamp}
      previousHash    : ${previousHash}
      hash            : ${hash}
      data            : ${data}
      nonce           : ${nonce}
      difficulty      : ${difficulty}
    `;
  }
}

module.exports = Block;
