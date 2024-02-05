import { createContext, useContext, useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

type LoadingProviderProps = {
  children: React.ReactNode
}

type LoadingProviderState = {}

const initialState: LoadingProviderState = {}

const LoadingProviderContext = createContext<LoadingProviderState>(initialState)

export function LoadingProvider({ children }: LoadingProviderProps) {
  const value = { ...initialState }

  return <LoadingProviderContext.Provider value={value}>{children}</LoadingProviderContext.Provider>
}

export const useLoading = () => {
  const context = useContext(LoadingProviderContext)

  if (context === undefined) throw new Error('useLoading must be used within a LoadingProvider')

  return context
}
