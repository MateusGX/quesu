import { createContext, useContext, useEffect, useState } from 'react'
import { createEvent } from 'react-event-hook'
import { CreatedEvent } from 'react-event-hook/react-event-hook.def'

type EventProviderProps = {
  children: React.ReactNode
}

type EventProviderState = {
  collectionCreatedEvent: CreatedEvent<'collectionCreatedEvent', void>
  closeDialogs: CreatedEvent<'closeDialogs', void>
  dialogsLoading: CreatedEvent<'dialogsLoading', boolean>
}

const initialState: EventProviderState = {
  collectionCreatedEvent: createEvent('collectionCreatedEvent')(),
  closeDialogs: createEvent('closeDialogs')(),
  dialogsLoading: createEvent('dialogsLoading')<boolean>()
}

const EventProviderContext = createContext<EventProviderState>(initialState)

export function EventProvider({ children }: EventProviderProps) {
  const value = { ...initialState }

  return <EventProviderContext.Provider value={value}>{children}</EventProviderContext.Provider>
}

export const useEvent = () => {
  const context = useContext(EventProviderContext)

  if (context === undefined) throw new Error('useEvent must be used within a EventProvider')

  return context
}
