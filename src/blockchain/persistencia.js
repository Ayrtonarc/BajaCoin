// persistencia.js
// Módulo para guardar y cargar la blockchain y el mempool en disco
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../../data');
const CHAIN_FILE = path.join(DATA_DIR, 'blockchain.json');
const MEMPOOL_FILE = path.join(DATA_DIR, 'mempool.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
  }
}

function saveBlockchain(blocks) {
  ensureDataDir();
  fs.writeFileSync(CHAIN_FILE, JSON.stringify(blocks, null, 2));
}

function loadBlockchain() {
  if (fs.existsSync(CHAIN_FILE)) {
    return JSON.parse(fs.readFileSync(CHAIN_FILE));
  }
  return null;
}

function saveMempool(transactions) {
  ensureDataDir();
  fs.writeFileSync(MEMPOOL_FILE, JSON.stringify(transactions, null, 2));
}

function loadMempool() {
  if (fs.existsSync(MEMPOOL_FILE)) {
    return JSON.parse(fs.readFileSync(MEMPOOL_FILE));
  }
  return null;
}

module.exports = {
  saveBlockchain,
  loadBlockchain,
  saveMempool,
  loadMempool,
};
