import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut
} from '@renderer/components/ui/command'
import {
  Calendar,
  Smile,
  Calculator,
  User,
  CreditCard,
  Settings,
  Folder,
  FilePlus,
  FilePen,
  FileX,
  FolderPen,
  FolderX,
  Files
} from 'lucide-react'
import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { useTheme } from './ThemeContext'

type CommandProviderProps = {
  children: React.ReactNode
}

type CommandProviderState = {}

const initialState: CommandProviderState = {}

const CommandProviderContext = createContext<CommandProviderState>(initialState)

export function CommandProvider({ children, ...props }: CommandProviderProps) {
  const [openMain, setOpenMain] = React.useState(false)
  const [openPages, setOpenPages] = React.useState(false)
  const { toggleTheme, theme } = useTheme()
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpenPages(false)
        setOpenMain((open) => !open)
      } else if (e.key === 'p' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpenMain(false)
        setOpenPages((open) => !open)
      } else if (e.key === 't' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggleTheme()
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <CommandProviderContext.Provider {...props} value={{}}>
      {children}
      <CommandDialog open={openMain} onOpenChange={setOpenMain}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Quick Actions">
            <CommandItem
              onSelect={() => {
                toggleTheme()
              }}
            >
              <Files className="mr-2 h-4 w-4" />
              <span>Change theme to {theme === 'dark' ? 'light' : 'dark'}</span>
              <CommandShortcut>⌘T</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Pages Actions">
            <CommandItem
              onSelect={() => {
                setOpenMain(false)
                setOpenPages(true)
              }}
            >
              <Files className="mr-2 h-4 w-4" />
              <span>Pages</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <FilePlus className="mr-2 h-4 w-4" />
              <span>Create new page</span>
            </CommandItem>
            <CommandItem>
              <FilePen className="mr-2 h-4 w-4" />
              <span>Rename current page</span>
            </CommandItem>
            <CommandItem>
              <FileX className="mr-2 h-4 w-4" />
              <span>Delete current page</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Collections Actions">
            <CommandItem
              onSelect={() => {
                setOpenMain(false)
                setOpenPages(true)
              }}
            >
              <Folder className="mr-2 h-4 w-4" />
              <span>Create new collection</span>
            </CommandItem>
            <CommandItem>
              <FolderPen className="mr-2 h-4 w-4" />
              <span>Edit current collection</span>
            </CommandItem>
            <CommandItem>
              <FolderX className="mr-2 h-4 w-4" />
              <span>Delete current collection</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <CommandDialog open={openPages} onOpenChange={setOpenPages}>
        <CommandInput placeholder="Type a page or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem>
              <Files className="mr-2 h-4 w-4" />
              <span>Mateus Page</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </CommandProviderContext.Provider>
  )
}
