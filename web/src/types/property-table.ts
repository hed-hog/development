import {
  ICalendarProps,
  IFormFieldOption,
  IFormFieldPropsBase,
} from './form-panel'

export interface IPropertyTableViewColumn
  extends Omit<IFormFieldPropsBase, 'name' | 'type' | 'defaultValue'> {
  header: string
  key: string
  type: string
  options?: IFormFieldOption[]
  calendar?: ICalendarProps
}

export interface IPropertyTableViewProps {
  data: any[]
  columns: IPropertyTableViewColumn[]
  pagination?: boolean
  itemsPerPage?: number
  caption?: string
  onSaveChanges: (updatedData: any[]) => void
}
