import 'dotenv/config'

import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { CHAIN_IDS } from '@clober/v2-sdk'

import { getChainById } from './chain.ts'

const RPC_URL = process.env.RPC_URL as string
const PRIVATE_KEY = process.env.PRIVATE_KEY as `0x${string}`

if (!PRIVATE_KEY) {
  throw new Error('PRIVATE_KEY is required')
}

export function getWalletClient(chainId: CHAIN_IDS) {
  return createWalletClient({
    chain: getChainById(chainId),
    account: privateKeyToAccount(PRIVATE_KEY),
    transport: RPC_URL ? http(RPC_URL) : http(),
  })
}
