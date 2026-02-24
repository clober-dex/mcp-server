import {
  createPublicClient,
  erc20Abi,
  http,
  isAddressEqual,
  zeroAddress,
} from 'viem'

export async function ensureAllowance({
  walletClient,
  token,
  spender,
  amount,
}: {
  walletClient: any
  token: `0x${string}`
  spender: `0x${string}`
  amount: bigint
}) {
  if (isAddressEqual(zeroAddress, token)) {
    return
  }

  const publicClient = createPublicClient({
    chain: walletClient.chain,
    transport: http(walletClient.transport.url),
  })

  const owner = walletClient.account.address

  const allowance = await publicClient.readContract({
    address: token,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [owner, spender],
  })

  if (allowance >= amount) {
    return
  }

  return walletClient.writeContract({
    address: token,
    abi: erc20Abi,
    functionName: 'approve',
    args: [spender, amount],
  })
}
