import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from '@/components/panels/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'

import { useContentCreate } from '@/features/content/content'
import { Content } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type ContentCreatePanelRef = {
  submit: () => void
}

export type ContentCreatePanelProps = {
  onCreated?: (data: Content) => void
}

const ContentCreatePanel = forwardRef(
  ({ onCreated }: ContentCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { mutateAsync: createContent } = useContentCreate()

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
          {
            name: 'slug',
            type: EnumFieldType.TEXT,
            label: {
              text: t('slug', { ns: 'translation' }),
            },
            required: true,
          },
          ...getFieldsLocale([
            { name: 'title', required: true },
            { name: 'body', type: EnumFieldType.HTML, required: true },
          ]),
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createContent({
            data,
          })
          if (typeof onCreated === 'function') {
            onCreated(createdData as any)
          }
        }}
      />
    )
  }
)

ContentCreatePanel.displayName = 'ContentCreatePanel'

export default ContentCreatePanel
