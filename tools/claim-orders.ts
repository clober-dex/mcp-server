import { z } from 'zod'
import { claimOrders } from '@clober/v2-sdk'

import { CHAIN_LIST_DESCRIPTION } from '../utils/chain.ts'
import { getWalletClient } from '../utils/wallet.ts'

export const claimOrdersTool = {
  name: 'claimOrders',
  description: `
Claim filled amount from one or multiple orders.

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

    const { transaction, result } = await claimOrders({
      chainId,
      userAddress: walletClient.account.address,
      ids,
    })

    const hash = await walletClient.sendTransaction(transaction)

    return {
      chainId,
      txHash: hash,
      claimedIds: ids,
      result,
    }
  },
}
