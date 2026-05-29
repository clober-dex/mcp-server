import 'dotenv/config'

import { createWalletClient, http } from 'viem'
import type { Account, Chain, Transport, WalletClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { CHAIN_IDS } from '@clober/v2-sdk'

import { getChainById } from './chain.ts'

export type CloberWalletClient = WalletClient<Transport, Chain, Account> & {
  account: Account
  chain: Chain
  transport: Transport & { url?: string }
}

export type WalletClientFactory = (chainId: CHAIN_IDS) => CloberWalletClient

let walletClientFactory: WalletClientFactory | undefined

export function setWalletClientFactory(factory: WalletClientFactory) {
  walletClientFactory = factory
}

export function setWalletClient(walletClient: CloberWalletClient) {
  setWalletClientFactory(() => walletClient)
}

export function clearWalletClientFactory() {
  walletClientFactory = undefined
}

export function getWalletClient(chainId: CHAIN_IDS): CloberWalletClient {
  if (walletClientFactory) {
    return walletClientFactory(chainId)
  }

  const rpcUrl = process.env.RPC_URL as string
  const privateKey = process.env.PRIVATE_KEY as `0x${string}` | undefined

  if (!privateKey) {
    throw new Error(
      'PRIVATE_KEY is required unless a wallet client factory is injected',
    )
  }

  return createWalletClient({
    chain: getChainById(chainId),
    account: privateKeyToAccount(privateKey),
    transport: rpcUrl ? http(rpcUrl) : http(),
  }) as CloberWalletClient
}
