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
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react'
import { CheckedState } from '@radix-ui/react-checkbox'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { FormControl } from '../ui/form'

type FieldProps = (
  | {
      type: EnumFieldType.RICHTEXT | EnumFieldType.COLOR | EnumFieldType.SELECT
      value: string
      onChange: (value: string) => void
    }
  | {
      type: EnumFieldType.TEXT | EnumFieldType.FILE | EnumFieldType.PASSWORD
      name: string
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

export default function Field(props: FieldProps) {
  const [value, setValue] = useState<string>(props.value)

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  switch (props.type) {
    case EnumFieldType.RICHTEXT:
      return <RichTextField value={value} onChange={props.onChange} />

    case EnumFieldType.COLOR:
      return (
        <ColorPickerField
          value={value}
          onChange={props.onChange}
          required={props.required}
        />
      )

    case EnumFieldType.TEXT:
    case EnumFieldType.FILE:
      return (
        <FormControl>
          <Input
            name={props.name}
            required={props.required}
            type={props.type}
            value={value || ''}
            onChange={props.onChange}
          />
        </FormControl>
      )

    case EnumFieldType.PASSWORD:
      return (
        <PasswordInput
          name={props.name}
          required={props.required}
          value={value || ''}
          onChange={props.onChange}
        />
      )

    case EnumFieldType.RADIO:
      return (
        <RadioGroup
          defaultValue='comfortable'
          value={value}
          onChange={(value) => props.onChange(value)}
        >
          {(props.options ?? []).map((option) => (
            <div className={`flex items-center space-x-2`} key={option.label}>
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      )

    case EnumFieldType.CHECKBOX:
      return (props.options ?? []).map((option) => {
        const randomNum = String(Math.random() + option.value)

        return (
          <div className={`flex items-center space-x-2`} key={randomNum}>
            <Checkbox
              checked={value as CheckedState}
              onCheckedChange={(checked) => {
                props.onChange(checked as string)
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
            defaultValue={props.sliderOptions?.defaultValue || [50]}
            max={props.sliderOptions?.max || 100}
            step={props.sliderOptions?.step || 1}
            value={
              Array.isArray(value)
                ? value
                : props.sliderOptions?.defaultValue || [50]
            }
            onValueChange={(value) => props.onChange(value)}
          />
          <Label>{value || props.sliderOptions?.defaultValue || [50]}</Label>
        </div>
      )

    case EnumFieldType.SELECT:
      return (
        <Select
          required={props.required}
          value={String(value)}
          name={props.name}
          onValueChange={(value) => props.onChange(String(value))}
        >
          <FormControl>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder={props.label?.text} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              {(props.options ?? []).map((opt, index) => (
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
          value={Array.isArray(value) ? value : []}
          onChange={props.onChange}
          options={props.options || []}
          required={props.required}
        />
      )

    case EnumFieldType.DATEPICKER:
      return (
        <DatePickerField
          name={props.name}
          label={String(props.label?.text)}
          date={value ? new Date(value) : undefined}
          onDateChange={(date) => props.onChange(date)}
        />
      )

    case EnumFieldType.SHEETPICKER:
      return (
        <SheetPickerField
          onValueChange={props.onChange}
          options={props.options || []}
          title={String(props.label?.text)}
          buttonText='Salvar'
        />
      )
  }
}
