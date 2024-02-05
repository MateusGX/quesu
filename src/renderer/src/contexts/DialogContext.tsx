import { Button } from '@renderer/components/ui/button'
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription
} from '@renderer/components/ui/dialog'
import { Input } from '@renderer/components/ui/input'
import { createContext, useContext, useEffect, useState } from 'react'
import { useEvent } from './EventContext'

type DialogProviderProps = {
  children: React.ReactNode
}

type DialogItems = {
  content: React.ReactNode
}

type DialogProviderState = {
  openDialog: (items: DialogItems) => void
}

const initialState: DialogProviderState = {
  openDialog: () => null
}

const DialogProviderContext = createContext<DialogProviderState>(initialState)

export function DialogProvider({ children }: DialogProviderProps) {
  const {
    closeDialogs: { useCloseDialogsListener }
  } = useEvent()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState<React.ReactNode | null>(null)

  const openDialog = ({ content }: DialogItems) => {
    setContent(content)
    setOpen(true)
  }

  const clearAll = () => {
    setOpen(false)
    setContent(null)
  }

  useCloseDialogsListener(() => {
    clearAll()
  })

  return (
    <DialogProviderContext.Provider
      value={{
        openDialog
      }}
    >
      {children}
      <Dialog
        open={open}
        onOpenChange={(open) => {
          if (!open) {
            clearAll()
          }
          setOpen(open)
        }}
      >
        {content}
      </Dialog>
    </DialogProviderContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(DialogProviderContext)

  if (context === undefined) throw new Error('useDialog must be used within a DialogProvider')

  return context
}
