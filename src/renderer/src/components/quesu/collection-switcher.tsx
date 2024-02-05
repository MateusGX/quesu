import { Folder, LucideIcon } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { cn } from '@renderer/lib/utils'
import React, { useEffect } from 'react'
import { icons } from 'lucide-react'
import { useApi } from '@renderer/contexts/ApiContext'
import { useEvent } from '@renderer/contexts/EventContext'

type Collection = {
  id: string
  name: string
  icon: string
  createdAt: string
  updatedAt: string
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export function CollectionSwitcher({}: Props) {
  const { ipc } = useApi()
  const {
    collectionCreatedEvent: { useCollectionCreatedEventListener }
  } = useEvent()
  const [collections, setCollections] = React.useState<Collection[]>([])
  const [selectedCollection, setSelectedCollection] = React.useState<string>('')

  const loadCollections = () => {
    ipc.get('/api/collections', {}).then((collections) => {
      setCollections(collections.data)
      if (collections.data.length > 0) {
        setSelectedCollection(collections.data[0].id)
      }
    })
  }

  useEffect(() => {
    loadCollections()
  }, [])

  useCollectionCreatedEventListener(() => {
    loadCollections()
  })

  return (
    <Select value={selectedCollection} onValueChange={setSelectedCollection}>
      <SelectTrigger className="[&>svg]:tw-hidden tw-flex tw-m-2" aria-label="Select collection">
        <SelectValue placeholder="Select an collection">
          {selectedCollection &&
            (() => {
              let collection = collections.find(
                (collection) => collection.id === selectedCollection
              )
              if (!collection)
                collection = {
                  icon: 'Folder',
                  name: 'Collection',
                  id: '0',
                  createdAt: '',
                  updatedAt: ''
                }
              const Icon = icons[collection.icon]
              return (
                <>
                  <Icon className="tw-h-4 tw-w-4 tw-p-0" />
                  <span className={cn('tw-ml-2', 'tw-hidden')}>{collection.name}</span>
                </>
              )
            })()}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {collections.map((collection) => {
          const Icon = icons[collection.icon]
          return (
            <SelectItem key={collection.id} value={collection.id}>
              <div className="tw-flex tw-items-center tw-gap-3 tw-text-foreground">
                <Icon className="tw-h-4 tw-w-4" />
                {collection.name}
              </div>
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
