import {
  ICalendarProps,
  IFormFieldOption,
  IFormFieldPropsBase,
} from './form-panel'

export interface IEditableTableViewColumn
  extends Omit<IFormFieldPropsBase, 'name' | 'type' | 'defaultValue'> {
  header: string
  key: string
  type: string
  options?: IFormFieldOption[]
  calendar?: ICalendarProps
}

export interface IEditableTableViewProps {
  data: any[]
  columns: IEditableTableViewColumn[]
  caption?: string
  onSaveChanges: (updatedData: any[]) => void
}
