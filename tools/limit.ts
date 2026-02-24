import { z } from 'zod'
import { limitOrder, CHAIN_IDS, getContractAddresses } from '@clober/v2-sdk'

import { getWalletClient } from '../utils/wallet.ts'
import { CHAIN_LIST_DESCRIPTION } from '../utils/chain.ts'
import { ensureAllowance } from '../utils/allowance.ts'

export const limitTool = {
  name: 'limitOrder',
  description: `
Place a limit order.

IMPORTANT:
- inputToken and outputToken MUST be contract addresses.
- If user provides token symbols (e.g., MON, USDC),
  you MUST call resolveToken tool first.
- Never guess token addresses.
`,
  schema: {
    chainId: z.number().describe(CHAIN_LIST_DESCRIPTION),
    inputToken: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
    outputToken: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
    amount: z.string(),
    price: z.string(),
  },
  handler: async ({
    chainId,
    inputToken,
    outputToken,
    amount,
    price,
  }: {
    chainId: CHAIN_IDS
    inputToken: string
    outputToken: string
    amount: string
    price: string
  }) => {
    const walletClient = getWalletClient(chainId)

    await ensureAllowance({
      walletClient,
      token: inputToken as `0x${string}`,
      spender: getContractAddresses({ chainId }).Controller,
      amount: 2n ** 256n - 1n,
    })

    const {
      transaction,
      result: { make, taken, spent },
    } = await limitOrder({
      chainId,
      userAddress: walletClient.account.address,
      inputToken: inputToken as `0x${string}`,
      outputToken: outputToken as `0x${string}`,
      amount,
      price,
      options: {
        useSubgraph: false,
        rpcUrl: walletClient.transport.url!,
      },
    })

    const hash = await walletClient.sendTransaction(transaction)

    return {
      chainId,
      txHash: hash,
      make,
      taken,
      spent,
    }
  },
}
