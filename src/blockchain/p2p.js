// p2p.js
// Red P2P básica para BajaCoin usando WebSocket
const WebSocket = require('ws');

const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];
const PORT = process.env.P2P_PORT || 6001;

class P2PServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
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
  }

  messageHandler(socket) {
    socket.on('message', message => {
      const data = JSON.parse(message);
      switch (data.type) {
        case 'CHAIN':
          this.handleChain(data.chain);
          break;
        case 'TX':
          // Aquí se podría propagar transacciones
          break;
      }
    });
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
