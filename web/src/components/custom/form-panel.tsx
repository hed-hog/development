import { CSSProperties } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import DatePicker from '../ui/date-picker'
import { MultiSelect } from '../ui/multi-select'
import { Button } from './button'
import { CalendarIcon } from 'lucide-react'
import { ColorPicker } from './color-picker'
import RichTextEditor from './rich-text-editor'
import PickerSheet from './picker-sheet'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { Slider } from '../ui/slider'

interface IFormFieldOption {
  value: string
  label: string
}

interface ISliderOption {
  defaultValue: number[]
  max: number
  step: number
}

interface IFormFieldProps {
  name: string
  label?: string
  labelClassName?: string
  labelStyle?: string
  type: string
  containerClassName?: string
  containerStyle?: CSSProperties
  elementClassName?: string
  elementStyle?: CSSProperties
  required?: boolean
  formStyle?: CSSProperties
  description?: string
  options?: IFormFieldOption[] // Required for 'select' and 'multiselect'
  sliderOptions?: ISliderOption
}

interface IFormPanelProps {
  title?: string
  titleStyle?: CSSProperties
  subtitle?: string
  subtitleStyle?: CSSProperties
  buttonText?: string
  buttonStyle?: CSSProperties
  fields: IFormFieldProps[]
  form: UseFormReturn<FieldValues>
  onSubmit: (data: any) => void
}

export default function FormPanel({
  title = '',
  titleStyle = {},
  subtitle = '',
  subtitleStyle = {},
  buttonText = 'Submit',
  buttonStyle = {},
  fields = [],
  form,
  onSubmit,
}: IFormPanelProps) {
  const renderField = (field: IFormFieldProps) => {
    const {
      label,
      labelClassName = '',
      labelStyle = {},
      type,
      required,
      formStyle = {},
      description = '',
      name,
      elementClassName = '',
      elementStyle = {},
      containerClassName = '',
      containerStyle = {},
      options = [],
      sliderOptions = {
        defaultValue: [50],
        max: 100,
        step: 1,
      },
    } = field

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem style={formStyle}>
            {label && (
              <FormLabel className={labelClassName} style={labelStyle}>
                {label}
              </FormLabel>
            )}
            <FormControl>
              <>
                {type === 'richtext' && (
                  <RichTextEditor value='' onChange={() => {}} />
                )}
                {type === 'color' && <ColorPicker />}
                {(type === 'text' || type === 'file') && (
                  <Input
                    className={elementClassName}
                    style={elementStyle}
                    required={required}
                    type={type}
                    {...field}
                  />
                )}
                {type === 'radio' && (
                  <RadioGroup defaultValue='comfortable'>
                    {options.map((option) => (
                      <div
                        className={`flex items-center space-x-2 ${containerClassName}`}
                        style={containerStyle}
                        key={option.label}
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={option.value}
                          className={elementClassName}
                          style={elementStyle}
                        />
                        <Label htmlFor={option.value}>{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
                {type === 'checkbox' &&
                  options.map((option) => (
                    <div
                      className={`flex items-center ${containerClassName} space-x-2`}
                      key={option.value}
                      style={containerStyle}
                    >
                      <Checkbox
                        id={option.value}
                        className={elementClassName}
                        style={elementStyle}
                      />
                      <Label
                        htmlFor={option.value}
                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                {type === 'range' && (
                  <Slider
                    style={elementStyle}
                    className={elementClassName}
                    defaultValue={sliderOptions.defaultValue}
                    max={sliderOptions.max}
                    step={sliderOptions.step}
                  />
                )}
                {type === 'select' && (
                  <Select
                    required={required}
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder={label} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup
                        className={containerClassName}
                        style={containerStyle}
                      >
                        {options.map((option, index) => (
                          <SelectItem
                            style={elementStyle}
                            className={elementClassName}
                            key={index}
                            value={option.value}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
                {type === 'multiselect' && (
                  <MultiSelect
                    className={elementClassName}
                    style={elementStyle}
                    options={options}
                    defaultValue={[]}
                    onValueChange={() => {}}
                  />
                )}
                {type === 'datepicker' && (
                  <DatePicker
                    className={elementClassName}
                    style={elementStyle}
                    label={String(label)}
                    icon={<CalendarIcon className='mr-2 h-4 w-4' />}
                    date={field.value ? new Date(field.value) : undefined}
                    onDateChange={(date) => field.onChange(date)}
                  />
                )}
                {type === 'pickersheet' && (
                  <PickerSheet
                    onValueChange={() => {}}
                    options={options}
                    title={String(label)}
                    buttonText='Salvar'
                  />
                )}
              </>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        {title && (
          <h1 style={titleStyle} className='text-xl font-bold'>
            {title}
          </h1>
        )}
        {subtitle && (
          <h3 style={subtitleStyle} className='text-lg'>
            {subtitle}
          </h3>
        )}
        {fields.map((field) => renderField(field))}
        <Button type='submit' style={buttonStyle} className='w-full'>
          {buttonText}
        </Button>
      </form>
    </Form>
  )
}
