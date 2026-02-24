import { z } from 'zod'
import { cancelOrders } from '@clober/v2-sdk'

import { CHAIN_LIST_DESCRIPTION } from '../utils/chain.ts'
import { getWalletClient } from '../utils/wallet.ts'

export const cancelOrdersTool = {
  name: 'cancelOrders',
  description: `
Cancel one or multiple open limit orders.

Requires:
- chainId
- order ids (array of order id strings)
`,
  schema: {
    chainId: z.number().describe(CHAIN_LIST_DESCRIPTION),
    ids: z.array(z.string()).min(1),
  },
  handler: async ({ chainId, ids }: { chainId: number; ids: string[] }) => {
    const walletClient = getWalletClient(chainId)

    const { transaction, result } = await cancelOrders({
      chainId,
      userAddress: walletClient.account.address,
      ids,
    })

    const hash = await walletClient.sendTransaction(transaction)

    return {
      chainId,
      txHash: hash,
      canceledIds: ids,
      result,
    }
  },
}
