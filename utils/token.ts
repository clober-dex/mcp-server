import { getAddress, isAddress } from 'viem'

type TokenInfo = {
  chainId: number
  address: string
  decimals: number
  symbol: string
  name: string
}

type TokenListResponse = Record<string, TokenInfo>

const tokenCache: Record<number, TokenListResponse> = {}

export async function resolveTokenAddress(
  chainId: number,
  symbolOrAddress: string,
): Promise<`0x${string}`> {
  if (isAddress(symbolOrAddress)) {
    return getAddress(symbolOrAddress)
  }

  if (!tokenCache[chainId]) {
    const res = await fetch(
      `https://d3g10bzo9rdluh.cloudfront.net/tokenlists-${chainId}.json`,
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch token list for chain ${chainId}`)
    }

    tokenCache[chainId] = await res.json()
  }

  const tokenList = tokenCache[chainId]
  const target = symbolOrAddress.toLowerCase()

  for (const token of Object.values(tokenList)) {
    if (token.symbol.toLowerCase() === target) {
      return getAddress(token.address)
    }
  }

  throw new Error(
    `Token symbol ${symbolOrAddress} not found on chain ${chainId}`,
  )
}
