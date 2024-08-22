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

interface FormFieldOption {
  value: string
  label: string
}

interface FormFieldProps {
  name: string
  label: string
  type: string
  required?: boolean
  style?: CSSProperties
  description?: string
  options?: FormFieldOption[] // Required for 'select' and 'multiselect'
}

interface FormPanelProps {
  title?: string
  titleStyle?: CSSProperties
  subtitle?: string
  subtitleStyle?: CSSProperties
  buttonText?: string
  buttonStyle?: CSSProperties
  fields: FormFieldProps[]
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
}: FormPanelProps) {
  const renderField = (field: FormFieldProps) => {
    const {
      label,
      type,
      required,
      style = {},
      description = '',
      name,
      options = [],
    } = field

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem style={style}>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <>
                {type === 'text' && <Input required={required} {...field} />}
                {type === 'select' && (
                  <Select
                    required={required}
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className='w-full' style={style}>
                      <SelectValue placeholder={label} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {options.map((option, index) => (
                          <SelectItem key={index} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
                {type === 'multiselect' && (
                  <MultiSelect
                    options={options}
                    defaultValue={[]}
                    onValueChange={() => {}}
                  />
                )}
                {type === 'datepicker' && (
                  <DatePicker
                    label='Pick a date'
                    icon={<CalendarIcon className='mr-2 h-4 w-4' />}
                    date={field.value ? new Date(field.value) : undefined}
                    onDateChange={(date) => field.onChange(date)}
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
