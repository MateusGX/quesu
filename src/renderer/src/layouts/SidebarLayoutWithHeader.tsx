import { Sidebar } from '@renderer/components/quesu/sidebar'
import { SidebarWithHeader } from '@renderer/components/quesu/sidebar-with-header'
import { Button } from '@renderer/components/ui/button'
import { Separator } from '@renderer/components/ui/separator'
import { sidebarSettingsItems } from '@renderer/constants/menu'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

interface Props {}

export const SidebarLayoutWithHeader: React.FC<Props> = ({}) => {
  const navigate = useNavigate()
  return (
    <div className="tw-bg-background tw-flex tw-flex-col tw-space-y-6 tw-p-10 tw-pb-16">
      <div className="tw-space-y-0.5">
        <div className="tw-flex tw-gap-1 tw-items-center">
          <Button
            variant="ghost"
            onClick={() => {
              navigate(-1)
            }}
          >
            <ArrowLeft className="tw-h-5 tw-w-5" />
          </Button>
          <h2 className="tw-text-2xl tw-font-bold tw-tracking-tight">Settings</h2>
        </div>
        <p className="tw-text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="tw-my-6" />
      <div className="tw-h-full tw-flex">
        <SidebarWithHeader items={sidebarSettingsItems} />
        <div className="tw-mx-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
