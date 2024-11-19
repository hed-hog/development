import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { useLocaleListEnabled } from '@/features/locale'
import {
  FieldType,
  FormPanelProps,
  IFormFieldPropsBase,
  ISliderProps,
} from '@/types/form-panel'
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'
import Field from '@/components/fields/field'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export type FieldLocale = {
  name: string
  required?: boolean
}

export const getFieldsLocale = (fieldNames: FieldLocale[], itemData?: any) => {
  const { data: localeEnabled } = useLocaleListEnabled()
  const { t } = useTranslation(['translation'])
  const fields: IFormFieldPropsBase[] = []

  for (const locale of localeEnabled?.data || []) {
    for (const field of fieldNames) {
      const fieldValue = itemData?.locale[locale.code]?.name || ''

      fields.push({
        name: `${locale.code}-${field.name}`,
        label: {
          text: t(field.name, { ns: 'translation' }),
          ...(locale?.code ? { small: locale.code } : {}),
        },
        type: EnumFieldType.TEXT as FieldType,
        required: field.required ?? false,
        value: fieldValue,
      })
    }
  }

  return fields
}

const FormPanelForm = forwardRef(
  ({ form, fields, button = {}, onSubmit }: FormPanelProps, ref) => {
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
        className='w-full space-y-3'
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
                  required={renderField.required ?? false}
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
        <div className='flex justify-end gap-2'>
          {button.text ? (
            <Button type='submit' style={button.style} ref={formSubmitRef}>
              {button.text}
            </Button>
          ) : (
            <button type='submit' className='hidden' ref={formSubmitRef} />
          )}
        </div>
      </form>
    )
  }
)

export type FormPanelRef = {
  setValuesFromItem: (item: Record<string, any>) => void
  setValues: (values: Record<string, any>) => void
  submit: () => void
}

const FormPanel = forwardRef<FormPanelRef, FormPanelProps>(
  ({ title = {}, subtitle = {}, ...props }: FormPanelProps, ref) => {
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
          })
        },
        setValues(values: Record<string, any>) {
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
