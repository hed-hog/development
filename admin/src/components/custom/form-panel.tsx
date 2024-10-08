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
import { forwardRef, useImperativeHandle, useRef } from 'react'

export const FormPanel = forwardRef(
  (
    {
      title = {},
      subtitle = {},
      button = {},
      fields = [],
      form,
      onSubmit,
    }: IFormPanelProps,
    ref
  ) => {
    const formRef = useRef<HTMLFormElement>(null)
    const formSubmitRef = useRef<HTMLButtonElement>(null)

    useImperativeHandle(
      ref,
      () => ({
        submit() {
          formSubmitRef.current?.click()
        },
      }),
      [formSubmitRef, formRef]
    )

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
          render={({ field }: { field: any }) => (
            <FormItem>
              {label?.text && (
                <FormLabel style={label.style} className={label.className}>
                  {label.text}
                </FormLabel>
              )}
              <Field
                type={type}
                value={field.value}
                onChange={field.onChange}
                required={required}
                options={options}
                sliderOptions={sliderOptions}
                label={label}
              />
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
        <form
          onSubmit={onSubmit && form.handleSubmit(onSubmit)}
          className='w-full space-y-8'
          ref={formRef}
        >
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
          {button.text ? (
            <Button
              type='submit'
              style={button.style}
              className='w-full'
              ref={formSubmitRef}
            >
              {button.text}
            </Button>
          ) : (
            <button type='submit' className='hidden' ref={formSubmitRef} />
          )}
        </form>
      </Form>
    )
  }
)
