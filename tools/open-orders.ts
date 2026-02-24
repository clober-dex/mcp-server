import { z } from 'zod'
import { getOpenOrders } from '@clober/v2-sdk'

import { CHAIN_LIST_DESCRIPTION } from '../utils/chain.ts'
import { getWalletClient } from '../utils/wallet.ts'

export const openOrdersTool = {
  name: 'getOpenOrders',
  description: `
Get all open limit orders for the connected wallet on Clober.

Returns:
- order id
- side (bid / ask)
- price
- amount
- filled amount
- claimable amount
`,
  schema: {
    chainId: z.number().describe(CHAIN_LIST_DESCRIPTION),
  },
  handler: async ({ chainId }: { chainId: number }) => {
    const walletClient = getWalletClient(chainId)

    const openOrders = await getOpenOrders({
      chainId,
      userAddress: walletClient.account.address,
    })

    const formatted = openOrders.map((order) => ({
      id: order.id,
      side: order.isBid ? 'bid' : 'ask',
      base: order.inputCurrency.symbol,
      quote: order.outputCurrency.symbol,
      price: order.price,
      amount: order.amount.value,
      filled: order.filled.value,
      claimable: order.claimable.value,
      createdAt: new Date(order.createdAt * 1000).toISOString(),
    }))

    return {
      chainId,
      user: walletClient.account.address,
      totalOrders: formatted.length,
      orders: formatted,
    }
  },
}
