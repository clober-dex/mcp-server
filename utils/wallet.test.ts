import { afterEach, expect, test } from 'bun:test'

const injectedWalletClient = {
  account: { address: '0x0000000000000000000000000000000000000001' },
  chain: { id: 1 },
  transport: { url: 'https://example.invalid' },
}

const originalPrivateKey = process.env.PRIVATE_KEY
const originalDotenvConfigPath = process.env.DOTENV_CONFIG_PATH

afterEach(async () => {
  const wallet = await import('./wallet.ts')
  wallet.clearWalletClientFactory()

  if (originalPrivateKey) {
    process.env.PRIVATE_KEY = originalPrivateKey
  } else {
    delete process.env.PRIVATE_KEY
  }

  if (originalDotenvConfigPath) {
    process.env.DOTENV_CONFIG_PATH = originalDotenvConfigPath
  } else {
    delete process.env.DOTENV_CONFIG_PATH
  }
})

test('uses an injected wallet client factory without requiring PRIVATE_KEY', async () => {
  delete process.env.PRIVATE_KEY
  process.env.DOTENV_CONFIG_PATH = '/tmp/clober-mcp-missing-env-file'

  const wallet = await import('./wallet.ts')

  wallet.setWalletClientFactory(() => injectedWalletClient as any)

  expect(wallet.getWalletClient(1 as any)).toBe(injectedWalletClient as any)
})

test('uses an injected wallet client without requiring PRIVATE_KEY', async () => {
  delete process.env.PRIVATE_KEY
  process.env.DOTENV_CONFIG_PATH = '/tmp/clober-mcp-missing-env-file'

  const wallet = await import('./wallet.ts')

  wallet.setWalletClient(injectedWalletClient as any)

  expect(wallet.getWalletClient(1 as any)).toBe(injectedWalletClient as any)
})
