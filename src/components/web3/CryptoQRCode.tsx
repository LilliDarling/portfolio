'use client'

import { useState } from 'react'
import QRCode from 'react-qr-code'
import { CryptoQRCodeProps } from '@/types/web3'

export default function CryptoQRCode({ address, cryptoType }: CryptoQRCodeProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy address:', err)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col items-center space-y-3 p-4 bg-white rounded-lg relative">
        <QRCode
          value={address}
          size={200}
          level="M"
        />
        <button
          onClick={handleCopyAddress}
          className="text-xs text-gray-600 hover:text-gray-800 text-center break-all cursor-pointer transition-colors"
          title="Click to copy address"
        >
          {address}
        </button>

        {copied && (
          <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-lg animate-fade-in">
            ✓ Copied!
          </div>
        )}
      </div>
      <p className="text-xs text-gray-400 text-center">
        Scan with your {cryptoType === 'eth' ? 'Ethereum' : 'Solana'} wallet app or copy the address above
      </p>
    </div>
  )
}