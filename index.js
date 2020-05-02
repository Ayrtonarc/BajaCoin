import PKG from './package.json';
import Block from './src/blockchain/block';

const {name, version} = PKG;

console.log('${name} v${version}');

const block = new Block (Date.now, 'previousHash', 'hash', 'date');
console.log(block.toString());