import { Folder, LucideIcon } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { cn } from '@renderer/lib/utils'
import React from 'react'

type Collection = {
  id: string
  name: string
  icon: LucideIcon
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  collections: Collection[]
}

export function AccountSwitcher({ collections }: Props) {
  const [selectedAccount, setSelectedAccount] = React.useState<Collection>(collections[0])
  return (
    <Select defaultValue={selectedAccount} onValueChange={setSelectedAccount}>
      <SelectTrigger className="[&>svg]:tw-hidden tw-flex tw-m-2" aria-label="Select account">
        <SelectValue placeholder="Select an account">
          <selectedAccount.icon className="tw-h-4 tw-w-4 tw-p-0" />
          <span className={cn('tw-ml-2', 'tw-hidden')}>{selectedAccount.name}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {collections.map((account) => (
          <SelectItem key={account.id} value={account}>
            <div className="tw-flex tw-items-center tw-gap-3 tw-text-foreground">
              <account.icon className="tw-h-4 tw-w-4" />
              {account.name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
