import { ButtonProps } from '@/components/custom/button'
import { FunctionComponent } from 'react'

export type DialogType = {
  id: string
  open: boolean
  dialog: OpenDialogType
}

export type OpenDialogType = {
  title?: string
  description?: string
  children: FunctionComponent<any>
  buttons?: (ButtonProps & { text: string })[]
  props?: any
}
