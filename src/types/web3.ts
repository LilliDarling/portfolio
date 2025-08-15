export interface WalletConnectButtonProps {
  type: 'eth' | 'sol'
}

export interface TransactionStatusProps {
  isEthPending?: boolean
  isEthConfirming?: boolean
  isEthSuccess?: boolean
  solTxStatus?: 'idle' | 'pending' | 'success' | 'error'
  ethTxHash?: string
  solTxSignature?: string
  txError?: string
  isTestMode?: boolean
}

export interface CryptoQRCodeProps {
  address: string
  cryptoType: 'eth' | 'sol'
}

export interface TipButtonProps {
  ethAddress?: string
  solAddress?: string
}