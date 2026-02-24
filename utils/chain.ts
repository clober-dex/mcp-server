import * as chains from 'viem/chains'
import type { Chain } from 'viem'
import { CHAIN_IDS } from '@clober/v2-sdk'

export const CHAIN_LIST: [string, number][] = Object.entries(CHAIN_IDS)
  .filter(([, value]) => typeof value === 'number')
  .filter(
    ([key]) =>
      !key.toString().toLowerCase().includes('test') &&
      !key.toString().toLowerCase().includes('sepolia'),
  ) as [string, number][]

export const CHAIN_LIST_DESCRIPTION = CHAIN_LIST.map(
  ([key, value]) => `${key} (${value})`,
).join(', ')

export function getChainById(chainId: CHAIN_IDS): Chain {
  const chainList = Object.values(chains) as Chain[]

  const found = chainList.find((c) => c.id === chainId)

  if (!found || Object.keys(CHAIN_IDS).indexOf(found.id.toString()) === -1) {
    throw new Error(`Unsupported chainId: ${chainId}`)
  }

  return found
}
