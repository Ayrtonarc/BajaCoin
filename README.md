# BajaCoin

BajaCoin es una implementación educativa de una blockchain inspirada en Bitcoin, desarrollada en Node.js. Incluye los conceptos fundamentales de una criptomoneda real: bloques, prueba de trabajo, transacciones UTXO, minería con recompensa y red P2P básica.

## Características principales

- **Blockchain básica**: Estructura de bloques enlazados con hash, timestamp y referencia al bloque anterior.
- **Prueba de trabajo (PoW)**: Minado de bloques con dificultad ajustable.
- **Transacciones UTXO**: Modelo de transacciones con entradas y salidas no gastadas.
- **Minería con recompensa**: Generación de transacción coinbase para recompensar al minero.
- **Validación de bloques y transacciones**: Verificación de integridad y gasto correcto de UTXOs.
- **Red P2P**: Sincronización de la blockchain entre nodos usando WebSocket.
- **Pruebas unitarias**: Cobertura de las funcionalidades principales con Jest.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Ayrtonarc/BajaCoin.git
   cd BajaCoin
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Uso

### Ejecutar la blockchain localmente
```bash
npm start
```

### Ejecutar los tests
```bash
npm test
```

### Iniciar un nodo P2P
Puedes iniciar un nodo P2P con:
```bash
P2P_PORT=6002 PEERS=ws://localhost:6001 npm start
```
- Cambia `P2P_PORT` para el puerto de tu nodo.
- Usa `PEERS` para conectar con otros nodos (separados por coma).

## Estructura del proyecto

- `src/blockchain/block.js` — Lógica de bloques
- `src/blockchain/blockchain.js` — Lógica de la cadena de bloques
- `src/blockchain/transaction/` — Lógica de transacciones y UTXO
- `src/blockchain/p2p.js` — Red P2P con WebSocket
- `src/blockchain/modules/validate.js` — Validación de la cadena
- Pruebas en archivos `.test.js`

## Créditos
Desarrollado por Ayrtonarc y colaboradores.

## Licencia
MIT
