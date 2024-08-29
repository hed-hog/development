import { EnumFieldType } from '@/components/custom/field'
import { CSSProperties } from 'react'
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
}

export interface ITextProps {
  text?: string
  style?: CSSProperties
}

export interface IFormFieldPropsBase {
  name: string
  type:
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

  defaultValue?: any
  label?: ILabelProps
  description?: ILabelProps
  input?: IStylingProps
  container?: IStylingProps
  required: boolean
  options?: IFormFieldOption[]
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

export interface IMultiSelectProps extends IFormFieldPropsBase {
  badge?: IStylingProps
  actionButtons?: IStylingProps
  items?: IStylingProps
  search?: IStylingProps
  checkbox?: IStylingProps
}

export interface IFormPanelProps {
  title?: ITextProps
  subtitle?: ITextProps
  button?: ITextProps
  fields: IFormFieldPropsBase[]
  form: UseFormReturn<FieldValues>
  onSubmit: (data: any) => void
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
  files?: FileList
  cidades?: string
  terms?: boolean
  percentage?: number
  password?: string
}

export type FieldProps = {
  value: string
  onChange: (value: string) => void
  required: boolean
  label?: ILabelProps
  options?: IFormFieldOption[]
  sliderOptions?: ISliderOption
}

export type IFormFieldProps =
  | IFormFieldPropsBase
  | ISliderProps
  | ICalendarProps
  | ISelectProps
  | IMultiSelectProps
