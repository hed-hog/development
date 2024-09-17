import { RichTextField } from '@/components/custom/rich-text-field'
import { ColorPickerField } from '@/components/custom/color-picker-field'
import { Input } from '@/components/ui/input'
import { PasswordInput } from './password-input-field'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'

import { FieldProps as FieldPropsForm } from '@/types/form-panel'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MultiSelectField } from '@/components/ui/multi-select-field'
import { DatePickerField } from '@/components/ui/date-picker-field'
import { SheetPickerField } from './sheet-picker-field'
import { ChangeEventHandler, FormEventHandler } from 'react'
import { CheckedState } from '@radix-ui/react-checkbox'
import { EnumFieldType } from '@/enums/EnumFieldType'

type FieldProps = (
  | {
      type: EnumFieldType.RICHTEXT | EnumFieldType.COLOR | EnumFieldType.SELECT
      value: string
      onChange: (value: string) => void
    }
  | {
      type: EnumFieldType.TEXT | EnumFieldType.FILE | EnumFieldType.PASSWORD
      value: string
      onChange: ChangeEventHandler<HTMLInputElement>
    }
  | {
      type: EnumFieldType.RADIO
      value: string
      onChange: FormEventHandler<HTMLDivElement>
    }
  | {
      type:
        | EnumFieldType.CHECKBOX
        | EnumFieldType.SHEETPICKER
        | EnumFieldType.MULTISELECT
      value: string[]
      onChange: (value: string[]) => void
    }
  | {
      type: EnumFieldType.RANGE
      value: number[]
      onChange: (value: number[]) => void
    }
  | {
      type: EnumFieldType.DATEPICKER
      value: string
      onChange: (value: Date) => void
    }
) &
  FieldPropsForm

export default function Field({
  type,
  value,
  onChange,
  required,
  options = [],
  label,
  sliderOptions,
}: FieldProps) {
  switch (type) {
    case EnumFieldType.RICHTEXT:
      return <RichTextField value={value} onChange={onChange} />

    case EnumFieldType.COLOR:
      return (
        <ColorPickerField
          value={value}
          onChange={onChange}
          required={required}
        />
      )

    case EnumFieldType.TEXT:
    case EnumFieldType.FILE:
      return (
        <Input
          required={required}
          type={type}
          value={value || ''}
          onChange={onChange}
        />
      )

    case EnumFieldType.PASSWORD:
      return (
        <PasswordInput
          required={required}
          value={value || ''}
          onChange={onChange}
        />
      )

    case EnumFieldType.RADIO:
      return (
        <RadioGroup
          defaultValue='comfortable'
          value={value}
          onChange={(value) => onChange(value)}
        >
          {options.map((option) => (
            <div className={`flex items-center space-x-2`} key={option.label}>
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      )

    case EnumFieldType.CHECKBOX:
      return options.map((option) => {
        const randomNum = String(Math.random() + option.value)

        return (
          <div className={`flex items-center space-x-2`} key={randomNum}>
            <Checkbox
              checked={value as CheckedState}
              onCheckedChange={(checked) => {
                onChange(checked as string)
              }}
              id={randomNum}
            />
            <Label
              htmlFor={randomNum}
              className={`text-sm font-medium leading-none`}
            >
              {option.label}
            </Label>
          </div>
        )
      })

    case EnumFieldType.RANGE:
      return (
        <div className={`flex items-center space-x-2`}>
          <Slider
            defaultValue={sliderOptions?.defaultValue || [50]}
            max={sliderOptions?.max || 100}
            step={sliderOptions?.step || 1}
            value={value || sliderOptions?.defaultValue || [50]}
            onValueChange={(value) => onChange(value)}
          />
          <Label>{value || sliderOptions?.defaultValue || [50]}</Label>
        </div>
      )

    case EnumFieldType.SELECT:
      return (
        <Select
          required={required}
          value={value}
          onValueChange={(value) => onChange(value)}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder={label?.text} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.map((opt, index) => (
                <SelectItem key={index} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )

    case EnumFieldType.MULTISELECT:
      return (
        <MultiSelectField
          value={value || []}
          onChange={onChange}
          options={options}
          required={required}
        />
      )

    case EnumFieldType.DATEPICKER:
      return (
        <DatePickerField
          label={String(label?.text)}
          date={value ? new Date(value) : undefined}
          onDateChange={(date) => onChange(date)}
        />
      )

    case EnumFieldType.SHEETPICKER:
      return (
        <SheetPickerField
          onValueChange={onChange}
          options={options}
          title={String(label?.text)}
          buttonText='Salvar'
        />
      )
  }
}
