# BajaCoin

BajaCoin es una implementación educativa de una blockchain inspirada en Bitcoin, desarrollada en Node.js. Incluye los conceptos fundamentales de una criptomoneda real: bloques, prueba de trabajo, transacciones UTXO, minería con recompensa y red P2P básica.

## Características principales

- **Blockchain básica**: Estructura de bloques enlazados con hash, timestamp y referencia al bloque anterior.
- **Prueba de trabajo (PoW)**: Minado de bloques con dificultad ajustable.
- **Transacciones UTXO**: Modelo de transacciones con entradas y salidas no gastadas.
- **Minería con recompensa**: Generación de transacción coinbase para recompensar al minero.
- **Validación estricta**: Integridad de bloques, duplicados, tamaño máximo, estructura y montos de transacciones.
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

- `src/blockchain/block.js` — Lógica de bloques (estructura, minado, hash, dificultad)
- `src/blockchain/blockchain.js` — Lógica de la cadena de bloques (agregado, reemplazo, recompensa)
- `src/blockchain/transaction/` — Lógica de transacciones, coinbase y UTXO
- `src/blockchain/p2p.js` — Red P2P con WebSocket (sincronización y broadcast)
- `src/blockchain/modules/validate.js` — Validación estricta de la cadena y transacciones
- Pruebas en archivos `.test.js`

## Estructura de un bloque

```json
{
   "timestamp": 1713300000000,
   "previousHash": "...",
   "hash": "...",
   "data": [
      {
         "inputs": [ { "txId": "...", "outputIndex": 0, "signature": null } ],
         "outputs": [ { "address": "addr1", "amount": 10 } ],
         "id": "..."
      }
   ],
   "nonce": 12345,
   "difficulty": 2
}
```

## Estructura de una transacción

```json
{
   "inputs": [ { "txId": "...", "outputIndex": 0, "signature": null } ],
   "outputs": [ { "address": "addr1", "amount": 10 } ],
   "id": "..."
}
```

## Ejemplo de uso de nodos P2P

Inicia dos nodos en diferentes terminales:

```bash
P2P_PORT=6001 npm start
P2P_PORT=6002 PEERS=ws://localhost:6001 npm start
```

## Validaciones estrictas

- El bloque génesis debe coincidir exactamente.
- No se permiten hashes de bloque duplicados.
- El tamaño máximo de bloque es 1MB.
- Cada bloque debe tener un hash válido y cumplir la dificultad.
- Las transacciones deben tener inputs y outputs bien formados y montos positivos.

## Pruebas

Ejecuta todas las pruebas unitarias:

```bash
npm test
```

## Créditos
Desarrollado por Ayrtonarc y colaboradores.

## Licencia
MIT

## Créditos
Desarrollado por Ayrtonarc y colaboradores.

## Licencia
MIT
