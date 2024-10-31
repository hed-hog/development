import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { IFormPanelProps, ISliderProps } from '@/types/form-panel'
import { getObjectFromLocaleFields } from '@hedhog/utils'
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { Badge } from '../ui/badge'
import { Button } from './button'
import Field from './field'

const FormPanelForm = forwardRef(
  ({ form, fields, button = {}, onSubmit }: IFormPanelProps, ref) => {
    const formRef = useRef<HTMLFormElement>(null)
    const formSubmitRef = useRef<HTMLButtonElement>(null)
    form = useForm()

    useImperativeHandle(
      ref,
      () => ({
        setValues(values: Record<string, any>) {
          form.reset(values)
        },
        submit() {
          formSubmitRef.current?.click()
        },
      }),
      [formSubmitRef, formRef]
    )

    return (
      <form
        onSubmit={
          onSubmit &&
          (form as UseFormReturn<FieldValues>).handleSubmit(onSubmit)
        }
        className='w-full space-y-8'
      >
        {fields.map((renderField) => (
          <FormField
            control={(form as UseFormReturn<FieldValues>).control}
            name={renderField.name}
            key={uuidv4()}
            defaultValue={renderField.value}
            render={({ field }) => (
              <FormItem>
                {renderField.label?.text && (
                  <FormLabel
                    style={renderField.label.style}
                    className={renderField.label.className}
                  >
                    {renderField.label.text}
                    {renderField.label.small && (
                      <Badge variant='secondary' className='ml-2 text-[0.7rem]'>
                        {renderField.label.small}
                      </Badge>
                    )}
                  </FormLabel>
                )}
                <Field
                  {...(field as any)}
                  type={renderField.type}
                  required={renderField.required}
                  options={renderField.options}
                  sliderOptions={Object.assign(
                    {},
                    {
                      defaultValue: [50],
                      max: 100,
                      step: 1,
                    },
                    (renderField as ISliderProps).sliderOptions
                  )}
                  label={renderField.label}
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
                {renderField.description?.text && (
                  <FormDescription
                    style={renderField.description.style}
                    className={renderField.description.className}
                  >
                    {renderField.description.text}
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <div className='h-1' />
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
    )
  }
)

export type FormPanelRefType = {
  setValuesFromItem: (item: Record<string, any>) => void
  setValues: (values: Record<string, any>) => void
  submit: () => void
}

const FormPanel = forwardRef<FormPanelRefType, IFormPanelProps>(
  ({ title = {}, subtitle = {}, ...props }: IFormPanelProps, ref) => {
    const formRef = useRef<any>(null)

    const getValues = useCallback(() => {
      return props.fields.reduce((acc: any, field) => {
        acc[field.name] = field.value
        return acc
      }, {})
    }, [props.fields])

    const form = useForm({
      defaultValues: getValues(),
    })

    useImperativeHandle(
      ref,
      () => ({
        setValuesFromItem(item: Record<string, any>) {
          formRef.current?.setValues({
            ...item,
            ...getObjectFromLocaleFields(item),
          })
        },
        setValues(values: Record<string, any>) {
          console.log('setValues', values)
          formRef.current?.setValues(values)
        },
        submit() {
          formRef.current?.submit()
        },
      }),
      [formRef]
    )

    return (
      <Form {...form}>
        <div className='w-full'>
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
          <FormPanelForm {...props} ref={formRef} />
        </div>
      </Form>
    )
  }
)

FormPanel.displayName = 'FormPanel'

export default FormPanel
