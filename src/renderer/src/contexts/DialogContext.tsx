import { createContext, useContext, useEffect, useState } from 'react'

type DialogProviderProps = {
  children: React.ReactNode
}

type DialogProviderState = {
}

const initialState: DialogProviderState = {
}

const DialogProviderContext = createContext<DialogProviderState>(initialState)

export function DialogProvider({
  children,
  ...props
}: DialogProviderProps) {

  return (
    <DialogProviderContext.Provider {...props} value={{}}>
      {children}
    </DialogProviderContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(DialogProviderContext)

  if (context === undefined) throw new Error('useDialog must be used within a DialogProvider')

  return context
}
