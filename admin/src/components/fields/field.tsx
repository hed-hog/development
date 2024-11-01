import { RichTextField } from '@/components/fields/rich-text-field'
import { ColorPickerField } from '@/components/pickers/color-picker-field'
import { DatePickerField } from '@/components/pickers/date-picker-field'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MultiSelectField } from '@/components/ui/multi-select-field'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { FieldProps as FieldPropsForm } from '@/types/form-panel'
import { CheckedState } from '@radix-ui/react-checkbox'
import {
  ChangeEventHandler,
  FormEventHandler,
  forwardRef,
  useEffect,
  useState,
} from 'react'
import { SheetPickerField } from '@/components/pickers/sheet-picker-field'
import { FormControl } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { Combobox } from '@/components/custom/combo-box'
import { PasswordInput } from '@/components/fields/password-input-field'

export type FieldProps = (
  | {
      type:
        | EnumFieldType.RICHTEXT
        | EnumFieldType.COLOR
        | EnumFieldType.SELECT
        | EnumFieldType.COMBOBOX
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
        | EnumFieldType.SWITCH
      value: string[] | boolean
      onChange: (value: string[] | boolean) => void
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

const Field = forwardRef<HTMLDivElement, FieldProps>((props, _ref) => {
  const [value, setValue] = useState<string | string[]>(props.value)
  const [options, setOptions] = useState(props.options)

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  useEffect(() => {
    setOptions(props.options)
  }, [props.options])

  switch (props.type) {
    case EnumFieldType.COMBOBOX:
      return (
        <Combobox
          value={String(value)}
          onChange={props.onChange}
          options={options || []}
        />
      )

    case EnumFieldType.RICHTEXT:
      return <RichTextField value={value as string} onChange={props.onChange} />

    case EnumFieldType.COLOR:
      return (
        <ColorPickerField
          value={value as string}
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
            onChange={(event) => props.onChange(event.target.value)}
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
          value={value as string}
          onChange={(value) => props.onChange(value)}
        >
          {(options ?? []).map((option) => (
            <div className={`flex items-center space-x-2`} key={option.label}>
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      )

    case EnumFieldType.CHECKBOX:
      return (options ?? []).map((option) => {
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

    case EnumFieldType.SWITCH:
      return (
        <div>
          <FormControl>
            <Switch
              value={value as unknown as string}
              onCheckedChange={(value) => props.onChange(value)}
            />
          </FormControl>
        </div>
      )

    case EnumFieldType.RANGE:
      return (
        <div className={`flex items-center space-x-2`}>
          <Slider
            defaultValue={props.sliderOptions?.defaultValue || [50]}
            max={props.sliderOptions?.max || 100}
            step={props.sliderOptions?.step || 1}
            value={
              Array.isArray(value)
                ? ((value as string[]).map((v) =>
                    Number(v)
                  ) as unknown as number[])
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
              {(options ?? []).map((opt, index) => (
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
          options={options || []}
          required={props.required}
        />
      )

    case EnumFieldType.DATEPICKER:
      return (
        <DatePickerField
          name={props.name}
          label={String(props.label?.text)}
          date={value ? new Date(value as string) : undefined}
          onDateChange={(date) => props.onChange(date)}
        />
      )

    case EnumFieldType.SHEETPICKER:
      return (
        <SheetPickerField
          onValueChange={props.onChange}
          options={options || []}
          title={String(props.label?.text)}
          buttonText='Salvar'
        />
      )

    default:
      return null
  }
})

Field.displayName = 'Field'

export default Field
