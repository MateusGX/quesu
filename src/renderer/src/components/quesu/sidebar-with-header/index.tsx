import { Button } from '@renderer/components/ui/button'
import { cn } from '@renderer/lib/utils'
import { Plus, PlusCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    href: string
    title: string
  }[]
}

export function SidebarWithHeader({ items }: SidebarProps) {
  const navigate = useNavigate()

  return (
    <div className="tw-w-60 tw-select-none tw-flex tw-flex-col tw-space-x-0 tw-space-y-1">
      {items.map((item) => (
        <Button variant="ghost" className="tw-w-full tw-justify-start">
          {item.title}
        </Button>
      ))}
    </div>
  )
}
