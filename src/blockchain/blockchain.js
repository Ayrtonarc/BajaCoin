import Block from './block';

class Blockchain {
    constructor() {
        this.blocks = [Block.genesis];
    }

    addBlock(data){  //metodo
        const previousBlock = this.blocks[this.blocks.length - 1];
        const block = Block.mine(previousBlock, data);  //minar

        this.blocks.push(block);

        return block;
    }
}

export default Blockchain;