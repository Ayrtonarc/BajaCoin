// api.js
// API REST para BajaCoin
const express = require('express');
const path = require('path');
const Blockchain = require('./src/blockchain/blockchain').default || require('./src/blockchain/blockchain');
const Mempool = require('./src/blockchain/transaction/mempool');
const { Transaction } = require('./src/blockchain/transaction/transaction');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Instancias globales (en un proyecto real, usar inyección de dependencias)
const blockchain = new Blockchain();
const mempool = new Mempool();

const api = express.Router();

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

// Iniciar servidor
const PORT = process.env.API_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Web UI y API REST escuchando en el puerto ${PORT}`);
});
