import { OpenDialogType } from './dialog'

export type OpenSheetType = {
  side: 'top' | 'right' | 'bottom' | 'left'
} & OpenDialogType

export type SheetType = {
  id: string
  open: boolean
  sheet: OpenSheetType
}
