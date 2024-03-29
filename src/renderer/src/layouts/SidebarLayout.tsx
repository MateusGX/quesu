import { CollectionSwitcher } from '@renderer/components/quesu/collection-switcher'
import { Sidebar } from '@renderer/components/quesu/sidebar'
import { Separator } from '@renderer/components/ui/separator'
import {
  Inbox,
  Send,
  ArchiveX,
  Trash2,
  Archive,
  File,
  Database,
  Package,
  Settings,
  Blocks,
  LucideBlocks,
  Group,
  Folder,
  FileCog,
  FileCode,
  Shapes
} from 'lucide-react'
import React from 'react'
import { Outlet } from 'react-router-dom'

interface Props {}

export const SidebarLayout: React.FC<Props> = ({}) => {
  return (
    <div className="tw-bg-background tw-h-screen">
      <div className="tw-h-full tw-flex">
        <div className="tw-h-full tw-border-r">
          <div className="tw-flex tw-h-[52px] tw-items-center tw-justify-center">
            <CollectionSwitcher />
          </div>
          <Separator />
          <Sidebar
            items={[
              {
                title: 'Page',
                label: '128',
                icon: File,
                variant: 'default'
              }
            ]}
          />
          <Separator />
          <Sidebar
            items={[
              {
                title: 'Collection Database',
                label: '9',
                icon: Database,
                variant: 'ghost'
              }
            ]}
          />
          <Separator />
          <Sidebar
            items={[
              {
                title: 'Custom Blocks',
                label: '',
                icon: Shapes,
                variant: 'ghost'
              },
              {
                title: 'Settings',
                label: '',
                icon: Settings,
                variant: 'ghost'
              }
            ]}
          />
        </div>
        <div className="tw-flex tw-items-center tw-justify-center tw-w-full tw-overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
