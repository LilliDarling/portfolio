'use client'
import { TransactionStatusProps } from '@/types/web3'

export default function TransactionStatus({
  isEthPending,
  isEthConfirming,
  isEthSuccess,
  solTxStatus,
  ethTxHash,
  solTxSignature,
  txError,
  isTestMode
}: TransactionStatusProps) {
  if (isEthPending || isEthConfirming || solTxStatus === 'pending') {
    return (
      <div className="p-3 bg-blue-500/20 border border-blue-500 rounded-lg">
        <p className="text-blue-400 text-center flex items-center justify-center gap-2">
          <span className="animate-spin">⏳</span>
          Processing transaction...
        </p>
      </div>
    )
  }

  if (isEthSuccess || solTxStatus === 'success') {
    return (
      <div className="p-3 bg-green-500/20 border border-green-500 rounded-lg space-y-2">
        <p className="text-green-400 text-center font-semibold">✅ Transaction Successful!</p>
        <p className="text-green-300 text-xs text-center">Thank you for your support! 💖</p>
        {ethTxHash && (
          <a 
            href={`https://${isTestMode ? 'sepolia.' : ''}etherscan.io/tx/${ethTxHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:text-blue-300 text-center block underline"
          >
            View on {isTestMode ? 'Sepolia ' : ''}Etherscan →
          </a>
        )}
        {solTxSignature && (
          <a 
            href={`https://explorer.solana.com/tx/${solTxSignature}${isTestMode ? '?cluster=devnet' : ''}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:text-blue-300 text-center block underline"
          >
            View on Solana Explorer →
          </a>
        )}
      </div>
    )
  }

  if (txError || solTxStatus === 'error') {
    return (
      <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg">
        <p className="text-red-400 text-center">❌ Transaction Failed</p>
        {txError && (
          <p className="text-red-300 text-xs text-center mt-1">{txError}</p>
        )}
      </div>
    )
  }

  return null
}