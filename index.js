import PKG from './package.json';
import Block from './src/blockchain/block'; //se importa la clase block de block src

const {name, version} = PKG;

console.log('${name} v${version}'); //bloque genesis
const { genesis } = Block;
console.log(genesis.toString());

const block = new Block (Date.now(), genesis.hash, 'hash', 'date');  //bloque 1 conreferencia al bloque genesis
console.log(block.toString());

const block_2 = new Block(Date.now(), block.hash, 'hash-2', 'date-2'); //bloque 2 con referenciaal 1
console.log(block_2.toString());