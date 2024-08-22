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
  container?: {
    className?: string
    style?: CSSProperties
  }
  calendar?: {
    // only for datePicker
    style?: CSSProperties
  }
  element?: {
    className?: string
    style?: CSSProperties
  }
  required?: boolean
  type: string
  options?: IFormFieldOption[]
  sliderOptions?: ISliderOption
}

interface IFormPanelProps {
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
  fields: IFormFieldProps[]
  form: UseFormReturn<FieldValues>
  onSubmit: (data: any) => void
}

export default function FormPanel({
  title = {},
  subtitle = {},
  button = {},
  fields = [],
  form,
  onSubmit,
}: IFormPanelProps) {
  const renderField = (field: IFormFieldProps, index: number) => {
    const {
      label,
      description,
      container = {},
      element = {},
      calendar = {},
      required,
      type,
      name,
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
        key={index}
        render={({ field }) => (
          <FormItem style={container.style} className={container.className}>
            {label?.text && (
              <FormLabel style={label.style} className={label.className}>
                {label.text}
              </FormLabel>
            )}
            <FormControl>
              <>
                {type === 'richtext' && (
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
                {type === 'color' && (
                  <ColorPicker value={field.value} onChange={field.onChange} />
                )}
                {(type === 'text' || type === 'file') && (
                  <Input
                    className={element.className}
                    style={element.style}
                    required={required}
                    type={type}
                    value={field.value || ''}
                    onChange={field.onChange}
                  />
                )}
                {type === 'radio' && (
                  <RadioGroup
                    defaultValue='comfortable'
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                  >
                    {options.map((option) => (
                      <div
                        className={`flex items-center space-x-2 ${container.className || ''}`}
                        style={container.style}
                        key={option.label}
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={option.value}
                          className={element.className}
                          style={element.style}
                        />
                        <Label htmlFor={option.value}>{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
                {type === 'checkbox' &&
                  options.map((option) => (
                    <div
                      className={`flex items-center space-x-2 ${container.className || ''}`}
                      key={option.value}
                      style={container.style}
                    >
                      <Checkbox
                        checked={
                          Array.isArray(field.value)
                            ? field.value.includes(option.value)
                            : false
                        }
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...(field.value || []), option.value]
                            : (field.value || []).filter(
                                (value: string) => value !== option.value
                              )

                          field.onChange(newValue)
                        }}
                        id={option.value}
                        className={element.className}
                        style={element.style}
                      />
                      <Label
                        htmlFor={option.value}
                        className='text-sm font-medium leading-none'
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}

                {type === 'range' && (
                  <div
                    className={`flex items-center space-x-2 ${container.className || ''}`}
                    style={container.style}
                  >
                    <Slider
                      className={element.className}
                      style={element.style}
                      defaultValue={sliderOptions.defaultValue}
                      max={sliderOptions.max}
                      step={sliderOptions.step}
                      value={field.value || sliderOptions.defaultValue}
                      onValueChange={(value) => field.onChange(value)}
                    />
                    <Label>{field.value || sliderOptions.defaultValue}</Label>
                  </div>
                )}
                {type === 'select' && (
                  <Select
                    required={required}
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder={label?.text} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup
                        className={container.className}
                        style={container.style}
                      >
                        {options.map((option, index) => (
                          <SelectItem
                            style={element.style}
                            className={element.className}
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
                    className={element.className}
                    style={element.style}
                    value={field.value || []}
                    onChange={field.onChange}
                    options={options}
                  />
                )}
                {type === 'datepicker' && (
                  <DatePicker
                    className={element.className}
                    style={element.style}
                    calendar={calendar}
                    label={String(label?.text)}
                    icon={<CalendarIcon className='mr-2 h-4 w-4' />}
                    date={field.value ? new Date(field.value) : undefined}
                    onDateChange={(date) => field.onChange(date)}
                  />
                )}
                {type === 'pickersheet' && (
                  <PickerSheet
                    onValueChange={() => {}}
                    options={options}
                    title={String(label?.text)}
                    buttonText='Salvar'
                  />
                )}
              </>
            </FormControl>
            {description?.text && (
              <FormDescription
                style={description.style}
                className={description.className}
              >
                {description.text}
              </FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        {title.text && (
          <h1 style={title.style} className='text-xl font-bold'>
            {title.text}
          </h1>
        )}
        {subtitle.text && (
          <h3 style={subtitle.style} className='text-lg'>
            {subtitle.text}
          </h3>
        )}
        {fields.map((field, index) => renderField(field, index))}
        <Button type='submit' style={button.style} className='w-full'>
          {button.text}
        </Button>
      </form>
    </Form>
  )
}
