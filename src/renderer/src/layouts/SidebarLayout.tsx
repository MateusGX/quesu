import { AccountSwitcher } from '@renderer/components/quesu/account-switcher'
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
            <AccountSwitcher
              collections={[
                {
                  id: '0000-000',
                  name: 'Mateus Collection',
                  icon: Folder
                }
              ]}
            />
          </div>
          <Separator />
          <Sidebar
            items={[
              {
                title: 'Page',
                label: '128',
                icon: File,
                variant: 'default'
              },
              {
                title: 'Page Actions',
                label: '128',
                icon: FileCode,
                variant: 'ghost'
              },
              {
                title: 'Page Settings',
                label: '128',
                icon: FileCog,
                variant: 'ghost'
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
                title: 'Extensions',
                label: '23',
                icon: Blocks,
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
