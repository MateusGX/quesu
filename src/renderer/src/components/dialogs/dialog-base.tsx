import { Button } from '@renderer/components/ui/button'
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@renderer/components/ui/dialog'
import { Input } from '@renderer/components/ui/input'
import { Label } from '@renderer/components/ui/label'
import { title } from 'process'
import React, { FormEventHandler } from 'react'
import { Form } from '../ui/form'
import { UseFormReturn } from 'react-hook-form'
import { Loader2, X } from 'lucide-react'

type DialogBaseProps = {
  children: React.ReactNode
  loading: boolean
  title: string
  description: string
  actionName: {
    normal: string
    loading: string
  }
  form: UseFormReturn<any>
  onSubmit: FormEventHandler<HTMLFormElement>
}

export const DialogBase: React.FC<DialogBaseProps> = ({
  children,
  title,
  actionName,
  form,
  onSubmit,
  description,
  loading
}: DialogBaseProps) => {
  return (
    <DialogContent
      className="tw-sm:tw-max-w-[425px]"
      onPointerDownOutside={(e) => e.preventDefault()}
    >
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogClose
        disabled={loading}
        className="tw-absolute tw-right-4 tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground"
      >
        <X className="tw-h-4 tw-w-4" />
        <span className="tw-sr-only">Close</span>
      </DialogClose>
      <Form {...form}>
        <form onSubmit={onSubmit} className="tw-space-y-8">
          {children}
          <DialogFooter>
            <Button disabled={loading} type="submit">
              {loading ? (
                <>
                  <Loader2 className="tw-mr-2 tw-h-4 tw-w-4 tw-animate-spin" />
                  {actionName.loading}
                </>
              ) : (
                <>{actionName.normal}</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
