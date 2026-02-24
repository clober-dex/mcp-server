import { CHAIN_LIST } from '../utils/chain.ts'

export const supportedChainsTool = {
  name: 'supportedChains',
  description: 'List all supported chains',
  schema: {},
  handler: async () => {
    return {
      chains: CHAIN_LIST,
      count: CHAIN_LIST.length,
    }
  },
}
