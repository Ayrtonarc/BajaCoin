// peers.js
// API para gestión de peers
const P2PServer = require('./src/blockchain/p2p');
const Blockchain = require('./src/blockchain/blockchain');
const Mempool = require('./src/blockchain/transaction/mempool');

// Instancias globales (en un proyecto real, usar inyección de dependencias)
const blockchain = new Blockchain();
const mempool = new Mempool();
const p2pServer = new P2PServer(blockchain, mempool);

module.exports = p2pServer;
