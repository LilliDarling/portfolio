'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import { useWallet } from '@solana/wallet-adapter-react'
import { parseEther } from 'viem'
import { Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import WalletConnectButton from '@/components/web3/WalletConnectButton'
import TransactionStatus from '@/components/web3/TransactionStatus'
import CryptoQRCode from '@/components/web3/CryptoQRCode'
import { TipButtonProps } from '@/types/web3'
import { isValidEthAddress, isValidSolAddress, isValidCryptoAmount } from '@/lib/validation'

const CRYPTO_OPTIONS = [
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', color: 'bg-blue-600' },
  { id: 'sol', name: 'Solana', symbol: 'SOL', color: 'bg-purple-600' },
] as const

const AMOUNTS = ['0.001', '0.01', '0.1', '1']

export default function TipButton({ ethAddress = '', solAddress = '' }: TipButtonProps) {
  const isTestMode = process.env.NEXT_PUBLIC_TEST_MODE === 'true'

  const testEthAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
  const testSolAddress = 'DTestWjvB6XF1qVzxaNgXjKYrJSJf9bgYEUBQT5N7p6tY'
  
  const finalEthAddress = isTestMode ? (ethAddress || testEthAddress) : ethAddress
  const finalSolAddress = isTestMode ? (solAddress || testSolAddress) : solAddress

  const [isOpen, setIsOpen] = useState(false)
  const [selectedCrypto, setSelectedCrypto] = useState<'eth' | 'sol' | null>(null)
  const [amount, setAmount] = useState('')
  const [showQR, setShowQR] = useState(false)
  const [solTxStatus, setSolTxStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')
  const [solTxSignature, setSolTxSignature] = useState('')
  const [txError, setTxError] = useState('')

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  const { isConnected: isEthConnected } = useAccount()
  const { sendTransaction: sendEthTransaction, data: ethTxHash, isPending: isEthPending } = useSendTransaction()
  const { isLoading: isEthConfirming, isSuccess: isEthSuccess } = useWaitForTransactionReceipt({ hash: ethTxHash })

  const { publicKey: solPublicKey, sendTransaction: sendSolTransaction, connected: isSolConnected } = useWallet()

  const closeModal = () => {
    setIsOpen(false)
    setSelectedCrypto(null)
    setAmount('')
    setShowQR(false)
  }

  const handleEthTip = async () => {
    if (!finalEthAddress || !amount) return
    if (!isValidEthAddress(finalEthAddress)) {
      setTxError('Invalid Ethereum address')
      return
    }
    const amountCheck = isValidCryptoAmount(amount)
    if (!amountCheck.valid) {
      setTxError(amountCheck.error || 'Invalid amount')
      return
    }
    try {
      setTxError('')
      sendEthTransaction({
        to: finalEthAddress as `0x${string}`,
        value: parseEther(amount),
      })
    } catch (error: unknown) {
      const err = error as { message?: string; code?: number }
      if (err?.message?.includes('User rejected') || err?.code === 4001) {
        setTxError('')
        return
      }
      setTxError(err?.message || 'Transaction failed')
    }
  }

  const handleSolTip = async () => {
    if (!finalSolAddress || !amount || !solPublicKey) return
    if (!isValidSolAddress(finalSolAddress)) {
      setTxError('Invalid Solana address')
      return
    }
    const amountCheck = isValidCryptoAmount(amount)
    if (!amountCheck.valid) {
      setTxError(amountCheck.error || 'Invalid amount')
      return
    }
    try {
      setTxError('')
      setSolTxStatus('pending')
      
      const connection = new Connection(isTestMode ? 'https://api.devnet.solana.com' : 'https://api.mainnet-beta.solana.com')
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: solPublicKey,
          toPubkey: new PublicKey(finalSolAddress),
          lamports: Math.floor(parseFloat(amount) * 1e9),
        })
      )

      const signature = await sendSolTransaction(transaction, connection)
      setSolTxSignature(signature)
      setSolTxStatus('success')
      
      setTimeout(() => {
        setSolTxStatus('idle')
        setSolTxSignature('')
      }, 10000)
    } catch (error: unknown) {
      const err = error as { message?: string; code?: number }
      if (err?.message?.includes('User rejected') || err?.code === 4001) {
        setSolTxStatus('idle')
        setTxError('')
        return
      }
      setSolTxStatus('error')
      setTxError(err?.message || 'Transaction failed')
    }
  }

  const handleTip = () => {
    if (selectedCrypto === 'eth') {
      handleEthTip()
    } else {
      handleSolTip()
    }
  }

  const currentAddress = selectedCrypto === 'eth' ? finalEthAddress : finalSolAddress
  const isConnected = selectedCrypto === 'eth' ? isEthConnected : isSolConnected
  const isPending = isEthPending || isEthConfirming || solTxStatus === 'pending'

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl text-white transition-all duration-300 hover:shadow-lg hover:scale-105 relative"
      >
        <span>💎</span>
        <span className="hidden sm:inline">{isTestMode ? 'Connect Wallet (Test)' : 'Connect Wallet'}</span>
        <span className="sm:hidden">{isTestMode ? 'Test' : 'Tip'}</span>
        {isTestMode && <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full" />}
      </button>

      {isOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-md" onClick={closeModal} />
          
          <div className="bg-neutral-900/95 backdrop-blur-md rounded-2xl p-6 max-w-md w-full max-h-[85vh] overflow-y-auto border border-indigo-800/30 relative z-10">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-semibold">Support with Crypto</h3>
                {isTestMode && <p className="text-sm text-yellow-400 mt-1">⚠️ Test Mode - Using Testnet</p>}
              </div>
              <button onClick={closeModal} className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg p-1 transition-colors text-2xl leading-none">
                ×
              </button>
            </div>

            {!selectedCrypto ? (
              <div className="space-y-4">
                <p className="text-gray-300 text-center mb-6">Choose your preferred cryptocurrency:</p>
                {CRYPTO_OPTIONS.map((crypto) => (
                  <button
                    key={crypto.id}
                    onClick={() => setSelectedCrypto(crypto.id as 'eth' | 'sol')}
                    className={`w-full p-4 rounded-xl ${crypto.color} hover:opacity-80 transition-opacity flex items-center justify-between`}
                  >
                    <span className="text-white font-medium">{crypto.name}</span>
                    <span className="text-white/80">{crypto.symbol}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium">
                    Tip with {CRYPTO_OPTIONS.find(c => c.id === selectedCrypto)?.name}
                  </h4>
                  <button onClick={() => setSelectedCrypto(null)} className="text-indigo-400 hover:text-indigo-300">
                    ← Back
                  </button>
                </div>

                <div className="flex justify-center">
                  <WalletConnectButton type={selectedCrypto} />
                </div>

                {!isConnected && currentAddress && (
                  <div className="text-center">
                    <p className="text-gray-400 mb-4">Or scan QR code to send directly:</p>
                    <CryptoQRCode address={currentAddress} cryptoType={selectedCrypto} />
                  </div>
                )}

                {isConnected && (
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-300">
                      Amount ({CRYPTO_OPTIONS.find(c => c.id === selectedCrypto)?.symbol})
                    </label>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {AMOUNTS.map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setAmount(amt)}
                          className={`p-2 rounded-lg border transition-colors ${
                            amount === amt ? 'border-indigo-500 bg-indigo-500/20' : 'border-gray-600 hover:border-gray-500'
                          }`}
                        >
                          {amt} {CRYPTO_OPTIONS.find(c => c.id === selectedCrypto)?.symbol}
                        </button>
                      ))}
                    </div>

                    <input
                      type="number"
                      step="0.001"
                      min="0.0001"
                      max="10"
                      placeholder="Custom amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full p-3 bg-neutral-800 border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none"
                    />

                    <div className="flex gap-3">
                      <button
                        onClick={handleTip}
                        disabled={!amount || isPending}
                        className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
                      >
                        {isPending ? 'Processing...' : `Send ${amount} ${CRYPTO_OPTIONS.find(c => c.id === selectedCrypto)?.symbol}`}
                      </button>
                      
                      <button
                        onClick={() => setShowQR(!showQR)}
                        className="px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                      >
                        QR
                      </button>
                    </div>

                    {showQR && currentAddress && (
                      <CryptoQRCode address={currentAddress} cryptoType={selectedCrypto} />
                    )}

                    <TransactionStatus
                        isEthPending={isEthPending}
                        isEthConfirming={isEthConfirming}
                        isEthSuccess={isEthSuccess}
                        solTxStatus={solTxStatus}
                        ethTxHash={ethTxHash}
                        solTxSignature={solTxSignature}
                        txError={txError}
                        isTestMode={isTestMode}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  )
}