// api.js
// API REST para BajaCoin
const express = require('express');
const Blockchain = require('./src/blockchain/blockchain').default || require('./src/blockchain/blockchain');
const Mempool = require('./src/blockchain/transaction/mempool');
const { Transaction } = require('./src/blockchain/transaction/transaction');

const app = express();
app.use(express.json());

// Instancias globales (en un proyecto real, usar inyección de dependencias)
const blockchain = new Blockchain();
const mempool = new Mempool();

// GET /blocks - Listar la blockchain
app.get('/blocks', (req, res) => {
  res.json(blockchain.blocks);
});

// GET /block/:hash - Consultar bloque por hash
app.get('/block/:hash', (req, res) => {
  const block = blockchain.blocks.find(b => b.hash === req.params.hash);
  if (!block) return res.status(404).json({ error: 'Block not found' });
  res.json(block);
});

// GET /mempool - Ver transacciones pendientes
app.get('/mempool', (req, res) => {
  res.json(mempool.getTransactions());
});

// POST /transactions - Enviar transacción al mempool
app.post('/transactions', (req, res) => {
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

// Iniciar servidor
const PORT = process.env.API_PORT || 3000;
app.listen(PORT, () => {
  console.log(`API REST listening on port ${PORT}`);
});
