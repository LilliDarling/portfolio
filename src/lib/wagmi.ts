import { http, createConfig } from 'wagmi'
import { mainnet, polygon, arbitrum, base, sepolia, polygonMumbai } from 'wagmi/chains'
import { coinbaseWallet, injected } from 'wagmi/connectors'

const isTestMode = process.env.NEXT_PUBLIC_TEST_MODE === 'true'

const connectors = [
  injected(),
  coinbaseWallet({ appName: 'Lillith Long Portfolio' }),
]

const testConfig = createConfig({
  chains: [sepolia, polygonMumbai],
  connectors,
  transports: {
    [sepolia.id]: http(),
    [polygonMumbai.id]: http(),
  },
})

const prodConfig = createConfig({
  chains: [mainnet, polygon, arbitrum, base],
  connectors,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
  },
})

export const config = isTestMode ? testConfig : prodConfig

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}