'use client'

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

const Web3Provider = dynamic(
  () => import('./Web3Provider').then(mod => mod.Web3Provider),
  { 
    ssr: false,
    loading: () => null
  }
)

export default function Web3Wrapper({ children }: { children: ReactNode }) {
  return <Web3Provider>{children}</Web3Provider>
}