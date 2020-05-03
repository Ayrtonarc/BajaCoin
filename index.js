import PKG from './package.json';
import Block from './src/blockchain/block'; //se importa la clase block de block src

const {name, version} = PKG;

console.log('${name} v${version}'); //bloque genesis
const { genesis } = Block;

const block1 = Block.mine(genesis, 'data-1');
console.log(block1.toString());

const block2 = Block.mine(block1, 'data-2');
console.log(block2.toString());

