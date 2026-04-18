// api.js
// API REST para BajaCoin
const express = require('express');
const path = require('path');
const Blockchain = require('./src/blockchain/blockchain');
const Mempool = require('./src/blockchain/transaction/mempool');
const { Transaction } = require('./src/blockchain/transaction/transaction');
const P2PServer = require('./src/blockchain/p2p');




const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Instancias globales (en un proyecto real, usar inyección de dependencias)
const blockchain = new Blockchain();
const mempool = new Mempool();
const p2pServer = new P2PServer(blockchain, mempool);

const api = express.Router();

// POST /api/mine - Minar un nuevo bloque con las transacciones pendientes
api.post('/mine', (req, res) => {
  try {
    const txs = mempool.getTransactions();
    if (txs.length === 0) return res.status(400).json({ error: 'No hay transacciones para minar.' });
    const block = blockchain.addBlock(txs);
    mempool.removeTransactions(txs);
    res.status(201).json({ message: 'Bloque minado', block });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/peers - Listar peers conectados
api.get('/peers', (req, res) => {
  res.json({ peers: p2pServer.sockets.map(s => s._socket.remoteAddress + ':' + s._socket.remotePort) });
});

// POST /api/peers - Agregar un nuevo peer
api.post('/peers', (req, res) => {
  const { address } = req.body;
  if (!address) return res.status(400).json({ error: 'Falta dirección del peer' });
  try {
    const socket = new (require('ws'))(address);
    socket.on('open', () => {
      p2pServer.connectSocket(socket);
      res.status(201).json({ message: 'Peer conectado', address });
    });
    socket.on('error', err => {
      res.status(500).json({ error: 'No se pudo conectar al peer', details: err.message });
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/blocks - Listar la blockchain
api.get('/blocks', (req, res) => {
  res.json(blockchain.blocks);
});

// GET /api/block/:hash - Consultar bloque por hash
api.get('/block/:hash', (req, res) => {
  const block = blockchain.blocks.find(b => b.hash === req.params.hash);
  if (!block) return res.status(404).json({ error: 'Block not found' });
  res.json(block);
});

// GET /api/mempool - Ver transacciones pendientes
api.get('/mempool', (req, res) => {
  res.json(mempool.getTransactions());
});

// POST /api/transactions - Enviar transacción al mempool
api.post('/transactions', (req, res) => {
  try {
    const { inputs, outputs } = req.body;
    if (!Array.isArray(inputs) || !Array.isArray(outputs)) {
      return res.status(400).json({ error: 'Invalid transaction format' });
    }
    const tx = new Transaction(inputs, outputs);
    mempool.addTransaction(tx);
    res.status(201).json({ message: 'Transaction added', tx });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.use('/api', api);

// Iniciar servidores
const PORT = process.env.API_PORT || 3000;
const P2P_PORT = process.env.P2P_PORT || 6001;
app.listen(PORT, () => {
  console.log(`Web UI y API REST escuchando en el puerto ${PORT}`);
});
p2pServer.listen();
