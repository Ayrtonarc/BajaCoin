// p2p.js
// Red P2P básica para BajaCoin usando WebSocket
const WebSocket = require('ws');

const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];
const PORT = process.env.P2P_PORT || 6001;

class P2PServer {
  constructor(blockchain, mempool) {
    this.blockchain = blockchain;
    this.mempool = mempool;
    this.sockets = [];
  }

  listen() {
    const server = new WebSocket.Server({ port: PORT });
    server.on('connection', socket => this.connectSocket(socket));
    this.connectToPeers();
    console.log(`P2P server listening on port ${PORT}`);
  }

  connectToPeers() {
    peers.forEach(peer => {
      const socket = new WebSocket(peer);
      socket.on('open', () => this.connectSocket(socket));
    });
  }

  connectSocket(socket) {
    this.sockets.push(socket);
    console.log('Socket connected');
    this.messageHandler(socket);
    this.sendChain(socket);
    this.sendMempool(socket);
  }

  messageHandler(socket) {
    socket.on('message', message => {
      const data = JSON.parse(message);
      switch (data.type) {
        case 'CHAIN':
          this.handleChain(data.chain);
          break;
        case 'TX':
          if (this.mempool && data.tx) {
            this.mempool.addTransaction(data.tx);
            this.broadcastTx(data.tx, socket); // Propaga a otros nodos menos al origen
          }
          break;
        case 'MEMPOOL':
          if (this.mempool && Array.isArray(data.txs)) {
            data.txs.forEach(tx => this.mempool.addTransaction(tx));
          }
          break;
      }
    });
  }

  sendTx(socket, tx) {
    socket.send(JSON.stringify({ type: 'TX', tx }));
  }

  broadcastTx(tx, exceptSocket = null) {
    this.sockets.forEach(s => {
      if (s !== exceptSocket) this.sendTx(s, tx);
    });
  }

  sendMempool(socket) {
    if (this.mempool) {
      socket.send(JSON.stringify({ type: 'MEMPOOL', txs: this.mempool.getTransactions() }));
    }
  }

  sendChain(socket) {
    socket.send(JSON.stringify({ type: 'CHAIN', chain: this.blockchain.blocks }));
  }

  syncChains() {
    this.sockets.forEach(socket => this.sendChain(socket));
  }

  handleChain(chain) {
    try {
      this.blockchain.replace(chain);
    } catch (e) {
      // Cadena inválida, ignorar
    }
  }
}

module.exports = P2PServer;
