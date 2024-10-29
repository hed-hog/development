import {
  Form,
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
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { Badge } from '../ui/badge'
import { Button } from './button'
import Field from './field'

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
    if (!form) {
      form = useForm<FieldValues>({
        mode: 'onSubmit',
        values: {
          ...(fields.map((field) => ({ [field.name]: field.value })) as any),
        },
      })
    }

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

    const renderField = (renderField: IFormFieldProps) => {
      const id = uuidv4()

      const {
        label,
        description,
        required,
        type,
        name,
        options = [],
      } = renderField

      const sliderOptions = (renderField as ISliderProps).sliderOptions || {
        defaultValue: [50],
        max: 100,
        step: 1,
      }

      return (
        <FormField
          control={form.control}
          name={name}
          key={id}
          defaultValue={renderField.value}
          render={({ field }) => (
            <FormItem>
              {label?.text && (
                <FormLabel style={label.style} className={label.className}>
                  {label.text}
                  {label.small && (
                    <Badge variant='secondary' className='ml-2 text-[0.7rem]'>
                      {label.small}
                    </Badge>
                  )}
                </FormLabel>
              )}
              <Field
                {...field}
                type={type}
                required={required}
                options={options}
                sliderOptions={sliderOptions}
                label={label}
                value={field.value ?? renderField.value ?? ''}
                onChange={(value: string) => {
                  if (typeof field.onChange === 'function') {
                    field.onChange(value)
                  }
                  if (typeof renderField.onChange === 'function') {
                    renderField.onChange(value)
                  }
                }}
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
          {fields.map((field, index) => renderField(field))}
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
