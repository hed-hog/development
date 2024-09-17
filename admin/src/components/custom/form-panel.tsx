import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  IFormFieldProps,
  IFormPanelProps,
  ISliderProps,
} from '@/types/form-panel'
import Field from './field'
import { Button } from './button'

export default function FormPanel({
  title = {},
  subtitle = {},
  button = {},
  fields = [],
  form,
  onSubmit,
}: IFormPanelProps) {
  const renderField = (field: IFormFieldProps, index: number) => {
    const { label, description, required, type, name, options = [] } = field

    const sliderOptions = (field as ISliderProps).sliderOptions || {
      defaultValue: [50],
      max: 100,
      step: 1,
    }

    return (
      <FormField
        control={form.control}
        name={name}
        key={index}
        render={({ field }) => (
          <FormItem>
            {label?.text && (
              <FormLabel style={label.style} className={label.className}>
                {label.text}
              </FormLabel>
            )}
            <FormControl>
              <Field
                type={type}
                value={field.value}
                onChange={field.onChange}
                required={required}
                options={options}
                sliderOptions={sliderOptions}
                label={label}
              />
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
        {button.text && (
          <Button type='submit' style={button.style} className='w-full'>
            {button.text}
          </Button>
        )}
      </form>
    </Form>
  )
}
