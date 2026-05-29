# Clober MCP (Local)

This guide explains how to run the Clober MCP server locally using **Bun** and Claude Desktop.

---

## 1️⃣ Requirements

- Bun installed
- Claude Desktop installed
- A wallet private key, or an injected viem wallet client

---

## 2️⃣ Install Dependencies

```bash
bun install
```

---

## 3️⃣ Run MCP Manually (Optional Test)

```bash
bun index.ts
```

---

## 4️⃣ Claude Desktop MCP Configuration

Open:

Claude Desktop → Settings → Developer → MCP Servers

Add this:

```json
{
  "clober": {
    "command": "/path/to/bun",
    "args": ["/absolute/path/to/index.ts"],
    "env": {
      "PRIVATE_KEY": "0xYOUR_PRIVATE_KEY",
      "RPC_URL": "YOUR_RPC_URL(OPTIONAL)"
    }
  }
}
```

⚠️ Use absolute paths  
⚠️ Replace PRIVATE_KEY with your actual key  
⚠️ Never commit this config

Restart Claude Desktop after saving.

---

## Managed Wallets

The `PRIVATE_KEY` env path is still supported for local EVM wallets. For
managed wallets where the key must stay in an OS keychain, TEE, or external
signer, inject a viem-compatible wallet client before using the tools:

```ts
import { setWalletClient } from './utils/wallet.ts'

setWalletClient(moonpayWalletClient)
```

For chain-specific signers, inject a factory:

```ts
import { setWalletClientFactory } from './utils/wallet.ts'

setWalletClientFactory((chainId) => moonpayWalletClientFor(chainId))
```

When a wallet client or factory is injected, `PRIVATE_KEY` is not required.
The injected client must expose the viem wallet client methods used by the
tools, including `account.address`, `chain`, `transport.url`, `sendTransaction`,
and `writeContract`.
