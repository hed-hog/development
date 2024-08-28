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
import { ColorPicker } from './color-picker'
import RichTextEditor from './rich-text-editor'
import PickerSheet from './picker-sheet'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { Slider } from '../ui/slider'
import { PasswordInput } from './password-input'
import {
  ICalendarProps,
  IFormFieldProps,
  IFormPanelProps,
  IMultiSelectProps,
  ISelectProps,
  ISliderProps,
} from '@/types/form-panel'

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
      input = {},
      required,
      type,
      name,
      options = [],
    } = field

    const { sliderOptions = { defaultValue: [50], max: 100, step: 1 } } =
      field as ISliderProps

    const { option = {} } = field as ISelectProps

    const {
      actionButtons = {},
      badge = {},
      items = {},
    } = field as IMultiSelectProps

    const { calendar = {} } = field as ICalendarProps

    return (
      <FormField
        control={form.control}
        name={name}
        key={index}
        render={({ field }) => (
          <FormItem className='flex flex-col'>
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
                    className={input.className}
                    style={input.style}
                    required={required}
                    type={type}
                    value={field.value || ''}
                    onChange={field.onChange}
                  />
                )}
                {type === 'password' && (
                  <PasswordInput
                    className={input.className}
                    style={input.style}
                    required={required}
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
                        className={`flex items-center space-x-2 ${container?.className}`}
                        style={container.style}
                        key={option.label}
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={option.value}
                          className={input.className}
                          style={input.style}
                        />
                        <Label
                          htmlFor={option.value}
                          className={label?.className}
                          style={label?.style}
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
                {type === 'checkbox' &&
                  options.map((option) => (
                    <div
                      className={`flex items-center space-x-2 ${container.className}`}
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
                        className={input.className}
                        style={input.style}
                      />
                      <Label
                        htmlFor={option.value}
                        className={`${label?.className} text-sm font-medium leading-none`}
                        style={label?.style}
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}

                {type === 'range' && (
                  <div
                    className={`flex items-center space-x-2 ${container.className}`}
                    style={container.style}
                  >
                    <Slider
                      className={input.className}
                      style={input.style}
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
                    <SelectTrigger className='w-full' style={input.style}>
                      <SelectValue placeholder={label?.text} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup
                        className={container.className}
                        style={container.style}
                      >
                        {options.map((opt, index) => (
                          <SelectItem
                            style={option.style}
                            className={option.className}
                            key={index}
                            value={opt.value}
                          >
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
                {type === 'multiselect' && (
                  <MultiSelect
                    actionButtons={actionButtons}
                    badge={badge}
                    items={items}
                    input={input}
                    value={field.value || []}
                    onChange={field.onChange}
                    options={options}
                  />
                )}
                {type === 'datepicker' && (
                  <DatePicker
                    className={input.className}
                    style={input.style}
                    calendar={calendar}
                    label={String(label?.text)}
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
