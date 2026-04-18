
import Block from './block';
import validate from './modules/validate';
import { createCoinbaseTx } from './transaction/coinbase';

class Blockchain {
  constructor(minerAddress = 'miner-address') {
    this.blocks = [Block.genesis];
    this.minerAddress = minerAddress;
    this.blockReward = 50; // Recompensa fija para demo
  }

  addBlock(transactions = []) {
    const previousBlock = this.blocks[this.blocks.length - 1];
    // Agregar transacción coinbase al inicio
    const coinbaseTx = createCoinbaseTx(this.minerAddress, this.blockReward);
    const blockData = [coinbaseTx, ...transactions];
    const block = Block.mine(previousBlock, blockData);
    this.blocks.push(block);
    return block;
  }
  
  replace (newBlocks = []) {
    if (newBlocks.length < this.blocks.length) throw Error('Cadena recibida no es tan larga como la esperada');
    try { 
      validate(newBlocks);
    } catch (error) {
      throw Error('Received chain is invalid');
    }
    this.blocks = newBlocks;
    return this.blocks;
  }
}

export default Blockchain;
