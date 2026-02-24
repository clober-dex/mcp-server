import { z } from 'zod'

import { resolveTokenAddress } from '../utils/token.ts'

export const resolveTokenTool = {
  name: 'resolveToken',
  description: 'Resolve token symbol to contract address on given chain.',
  schema: {
    chainId: z.number(),
    symbol: z.string(),
  },
  handler: async ({ chainId, symbol }: { chainId: number; symbol: string }) => {
    const address = await resolveTokenAddress(chainId, symbol)

    return {
      chainId,
      symbol,
      address,
    }
  },
}
