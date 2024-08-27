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

export interface IFormFieldPropsBase {
  name: string
  type: string
  defaultValue?: any
  label?: {
    text?: string
    className?: string
    style?: CSSProperties
  }
  description?: {
    text?: string
    className?: string
    style?: CSSProperties
  }
  input?: {
    className?: string
    style?: CSSProperties
  }
  container?: {
    className?: string
    style?: CSSProperties
  }
  required?: boolean
  options?: IFormFieldOption[]
}

export interface ISliderProps extends IFormFieldPropsBase {
  sliderOptions?: ISliderOption
}

export interface ICalendarProps extends IFormFieldPropsBase {
  calendar?: {
    // only for datePicker
    style?: CSSProperties
  }
}

export interface ISelectProps extends IFormFieldPropsBase {
  option?: {
    // only for select and multiselect
    className?: string
    style?: CSSProperties
  }
}

export interface IMultiSelectProps extends IFormFieldPropsBase {
  badge?: {
    className?: string
    style?: CSSProperties
  }
  actionButtons?: {
    className?: string
    style?: CSSProperties
  }
  items?: {
    className?: string
    style?: CSSProperties
  }
  search?: {
    className?: string
    style?: React.CSSProperties
  }
  checkbox?: {
    className?: string
    style?: React.CSSProperties
  }
}

export interface IFormPanelProps {
  title?: {
    text?: string
    style?: CSSProperties
  }
  subtitle?: {
    text?: string
    style?: CSSProperties
  }
  button?: {
    text?: string
    style?: CSSProperties
  }
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

export type IFormFieldProps =
  | IFormFieldPropsBase
  | ISliderProps
  | ICalendarProps
  | ISelectProps
  | IMultiSelectProps
