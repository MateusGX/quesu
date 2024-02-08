import { Input } from '@renderer/components/ui/input'
import { Label } from '@renderer/components/ui/label'
import React from 'react'
import { icons } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { DialogBase } from './dialog-base'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { useApi } from '@renderer/contexts/ApiContext'
import { useEvent } from '@renderer/contexts/EventContext'

const folderIconList = Object.keys(icons).filter((icon) =>
  icon.toLocaleLowerCase().includes('folder')
)

const formSchema = z.object({
  collectionName: z
    .string()
    .min(2, {
      message: 'Collection name must be at least 2 characters.'
    })
    .max(50, {
      message: 'Collection name must be at most 50 characters.'
    }),
  collectionIcon: z.string()
})

export const CreateCollectionDialog: React.FC = () => {
  const { ipc } = useApi()
  const [loading, setLoading] = React.useState(false)
  const {
    collectionCreatedEvent: { emitCollectionCreatedEvent },
    closeDialogs: { emitCloseDialogs }
  } = useEvent()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collectionName: '',
      collectionIcon: 'Folder'
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    ipc
      .post('/api/collections', {
        name: values.collectionName,
        icon: values.collectionIcon
      })
      .then((collection) => {
        emitCloseDialogs()
        emitCollectionCreatedEvent()
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <DialogBase
      loading={loading}
      actionName={{
        normal: 'Create',
        loading: 'Creating'
      }}
      title="Create Collection"
      description="Enter details for new collection"
      onSubmit={form.handleSubmit(onSubmit)}
      form={form}
    >
      <FormField
        name="collectionIcon"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Collection Icon</FormLabel>
            <FormControl>
              <Select disabled={loading} onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a icon to collection" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {folderIconList.map((icon) => {
                    const Icon = icons[icon]
                    return (
                      <SelectItem key={icon} value={icon}>
                        <div className="tw-flex tw-items-center tw-gap-3 tw-text-foreground">
                          <Icon className="tw-h-5 tw-w-5" />
                          {icon.split(/(?=[A-Z])|(?=[0-9])/).join(' ')}
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </FormControl>
            <FormDescription>
              This is the icon that will be displayed in the sidebar.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="collectionName"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Collection Name</FormLabel>
            <FormControl>
              <Input disabled={loading} {...field} placeholder="Collection Name" />
            </FormControl>
            <FormDescription>
              This is the name of the collection that will be displayed in the sidebar.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </DialogBase>
  )
}
