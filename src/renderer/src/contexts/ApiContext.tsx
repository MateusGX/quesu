import { createContext, useContext, useEffect, useState } from 'react'
import { IpcClient } from 'ipc-express'
const { ipcRenderer } = window.electron

type ApiProviderProps = {
  children: React.ReactNode
}

type ApiProviderState = {
  ipc: IpcClient
}

const initialState: ApiProviderState = {
  // @ts-ignore
  ipc: new IpcClient(ipcRenderer)
}

const ApiProviderContext = createContext<ApiProviderState>(initialState)

export function ApiProvider({ children }: ApiProviderProps) {
  const value = { ...initialState }

  return <ApiProviderContext.Provider value={value}>{children}</ApiProviderContext.Provider>
}

export const useApi = () => {
  const context = useContext(ApiProviderContext)

  if (context === undefined) throw new Error('useApi must be used within a ApiProvider')

  return context
}
