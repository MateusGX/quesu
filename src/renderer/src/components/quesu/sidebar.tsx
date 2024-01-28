import { Button } from '@renderer/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@renderer/components/ui/tooltip'
import { cn } from '@renderer/lib/utils'
import { LucideIcon, Plus, PlusCircle } from 'lucide-react'
import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    title: string
    label?: string
    icon: LucideIcon
    variant: 'default' | 'ghost'
  }[]
}

export function Sidebar({ items }: SidebarProps) {
  return (
    <div className="tw-group tw-flex tw-flex-col tw-gap-4 tw-py-2">
      <nav className="tw-grid tw-gap-1 tw-px-2 tw-justify-center">
        {items.map((e) => (
          <Tooltip key={nanoid()} delayDuration={0}>
            <TooltipTrigger asChild>
              <Button variant={e.variant} size="icon" className="tw-h-9 tw-w-9">
                <e.icon className="tw-h-4 tw-2-4" />
                <span className="tw-sr-only">{e.title}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="tw-flex tw-items-center tw-gap-4">
              {e.title}
              {e.label && <span className="tw-ml-auto tw-text-muted-foreground">{e.label}</span>}
            </TooltipContent>
          </Tooltip>
        ))}
      </nav>
    </div>
  )
}
