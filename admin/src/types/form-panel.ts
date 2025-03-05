import { EnumFieldType } from '@/enums/EnumFieldType'
import { CSSProperties, Dispatch, SetStateAction } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'

export interface IFormFieldOption {
  value: string
  label: string
}

export interface ISliderOption {
  defaultValue: number[]
  max: number
  step: number
}

export interface IStylingProps {
  className?: string
  style?: CSSProperties
}

export interface ILabelProps extends IStylingProps {
  text?: string
  small?: string
}

export interface ITextProps {
  text?: string
  style?: CSSProperties
}

export type FieldType =
  | EnumFieldType.RICHTEXT
  | EnumFieldType.COLOR
  | EnumFieldType.RADIO
  | EnumFieldType.CHECKBOX
  | EnumFieldType.SELECT
  | EnumFieldType.MULTISELECT
  | EnumFieldType.SHEETPICKER
  | EnumFieldType.TEXT
  | EnumFieldType.DATEPICKER
  | EnumFieldType.RANGE
  | EnumFieldType.FILE
  | EnumFieldType.PASSWORD
  | EnumFieldType.COMBOBOX
  | EnumFieldType.SWITCH

export interface IFormFieldPropsBase {
  name: string
  type: FieldType | EnumFieldType
  defaultValue?: any
  value?: any
  onChange?: (value: any) => void
  label?: ILabelProps
  description?: ILabelProps
  input?: IStylingProps
  container?: IStylingProps
  required?: boolean
  options?: IFormFieldOption[]
  url?: string
  displayName?: string
  valueName?: string
  selectedIds?: (string | Record<string, any>)[]
  setSelectedIds?: Dispatch<SetStateAction<(string | Record<string, any>)[]>>
  title?: string
  subtitle?: string
  columnName?: string
}

export interface ISliderProps extends IFormFieldPropsBase {
  sliderOptions?: ISliderOption
}

export interface ICalendarProps extends IFormFieldPropsBase {
  calendar?: IStylingProps
}

export interface ISelectProps extends IFormFieldPropsBase {
  option?: IStylingProps
}

export interface IMultiSelectFieldProps extends IFormFieldPropsBase {
  badge?: IStylingProps
  actionButtons?: IStylingProps
  items?: IStylingProps
  search?: IStylingProps
  checkbox?: IStylingProps
}

export type FormPanelProps = {
  title?: ITextProps
  subtitle?: ITextProps
  button?: ITextProps
  fields: IFormFieldPropsBase[]
  form?: UseFormReturn<FieldValues>
  onSubmit?: (data: any) => void
}

export interface IFormValues {
  username: string
  email: string
  birthdate?: string
  country?: string
  color?: string
  description?: string
  city?: string[]
  cities?: string[]
  file?: FileList
  cidades?: string
  terms?: boolean
  percentage?: number
  password?: string
}

export type FieldProps = {
  value: string
  name?: string
  onChange: (value: string) => void
  required: boolean
  label?: ILabelProps
  options?: IFormFieldOption[]
  url?: string
  sliderOptions?: ISliderOption
  displayName?: string
  valueName?: string
}

export type IFormFieldProps =
  | IFormFieldPropsBase
  | ISliderProps
  | ICalendarProps
  | ISelectProps
  | IMultiSelectFieldProps
