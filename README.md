# Clober MCP (Local)

This guide explains how to run the Clober MCP server locally using **Bun** and Claude Desktop.

---

## 1️⃣ Requirements

- Bun installed
- Claude Desktop installed
- A wallet private key

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
    "args": [
      "/absolute/path/to/index.ts"
    ],
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
