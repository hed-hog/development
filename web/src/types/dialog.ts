import { ButtonProps } from '@/components/custom/button'
import { ReactNode } from 'react'

export type DialogType = {
  id: string
  open: boolean
  dialog: OpenDialogType
}

export type OpenDialogType = {
  title?: string
  description?: string
  children: ReactNode
  buttons?: (ButtonProps & { text: string })[]
}
