'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletReadyState } from '@solana/wallet-adapter-base'
import { WalletConnectButtonProps } from '@/types/web3'


export default function WalletConnectButton({ type }: WalletConnectButtonProps) {
  const { wallets, select, connect, disconnect, publicKey, connected, connecting } = useWallet()

  if (type === 'eth') {
    return (
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          const ready = mounted
          const connected = ready && account && chain

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      type="button"
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Connect Ethereum Wallet
                    </button>
                  )
                }

                if (chain.unsupported) {
                  return (
                    <button
                      onClick={openChainModal}
                      type="button"
                      className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Wrong network
                    </button>
                  )
                }

                return (
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                  >
                    {account.displayName}
                  </button>
                )
              })()}
            </div>
          )
        }}
      </ConnectButton.Custom>
    )
  }
  
  const handleSolanaWallet = async () => {
    if (connected) {
      await disconnect()
      return
    }

    const phantomWallet = wallets.find(w => w.adapter.name === 'Phantom')
    const wallet = phantomWallet || wallets.find(w => w.readyState === WalletReadyState.Installed) || wallets[0]
    
    if (wallet) {
      select(wallet.adapter.name)
      await connect()
    }
  }

  if (!connected) {
    return (
      <button
        onClick={handleSolanaWallet}
        disabled={connecting}
        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors"
      >
        {connecting ? 'Connecting...' : 'Connect Solana Wallet'}
      </button>
    )
  }

  return (
    <button
      onClick={handleSolanaWallet}
      className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
    >
      {publicKey?.toBase58().slice(0, 8)}...{publicKey?.toBase58().slice(-8)}
    </button>
  )
}