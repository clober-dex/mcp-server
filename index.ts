import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

import { openOrdersTool } from './tools/open-orders.ts'
import { limitTool } from './tools/limit'
import { supportedChainsTool } from './tools/supported-chains.ts'
import { resolveTokenTool } from './tools/resolve-token.ts'
import { claimOrdersTool } from './tools/claim-orders.ts'
import { cancelOrdersTool } from './tools/cancel-orders.ts'

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED_REJECTION', err)
})

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT_EXCEPTION', err)
})

const server = new McpServer({
  name: 'Clober MCP',
  version: '1.0.0',
})

server.tool(
  supportedChainsTool.name,
  supportedChainsTool.description,
  supportedChainsTool.schema,
  async () => {
    const result = await supportedChainsTool.handler()

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    }
  },
)

server.tool(
  resolveTokenTool.name,
  resolveTokenTool.description,
  resolveTokenTool.schema,
  async (args) => {
    const result = await resolveTokenTool.handler(args)

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    }
  },
)

server.tool(
  openOrdersTool.name,
  openOrdersTool.description,
  openOrdersTool.schema,
  async (args) => {
    const result = await openOrdersTool.handler(args)

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    }
  },
)

server.tool(
  limitTool.name,
  limitTool.description,
  limitTool.schema,
  async (args) => {
    const result = await limitTool.handler(args)

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    }
  },
)

server.tool(
  cancelOrdersTool.name,
  cancelOrdersTool.description,
  cancelOrdersTool.schema,
  async (args) => {
    const result = await cancelOrdersTool.handler(args)
    return {
      content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
    }
  },
)

server.tool(
  claimOrdersTool.name,
  claimOrdersTool.description,
  claimOrdersTool.schema,
  async (args) => {
    const result = await claimOrdersTool.handler(args)
    return {
      content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
    }
  },
)

async function start() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

start()
