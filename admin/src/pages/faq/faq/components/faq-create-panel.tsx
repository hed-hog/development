import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from '@/components/panels/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'

import { useFaqCreate } from '@/features/faq'
import { Faq } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type FaqCreatePanelRef = {
  submit: () => void
}

export type FaqCreatePanelProps = {
  onCreated?: (data: Faq) => void
}

const FaqCreatePanel = forwardRef(({ onCreated }: FaqCreatePanelProps, ref) => {
  const formRef = useRef<FormPanelRef>(null)
  const { t } = useTranslation(['actions', 'fields', 'translations'])
  const { mutateAsync: createFaq } = useFaqCreate()

  useImperativeHandle(
    ref,
    () => ({
      submit: () => {
        formRef.current?.submit()
      },
    }),
    [formRef]
  )

  return (
    <FormPanel
      ref={formRef}
      fields={[
        ...getFieldsLocale([
          { name: 'question' },
          { name: 'answer', type: EnumFieldType.HTML },
        ]),
      ]}
      button={{ text: t('create', { ns: 'actions' }) }}
      onSubmit={async (data) => {
        const createdData = await createFaq({
          data,
        })
        if (typeof onCreated === 'function') {
          onCreated(createdData as any)
        }
      }}
    />
  )
})

FaqCreatePanel.displayName = 'FaqCreatePanel'

export default FaqCreatePanel
