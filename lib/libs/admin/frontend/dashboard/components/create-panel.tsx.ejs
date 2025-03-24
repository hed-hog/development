import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from '@/components/panels/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { useDashboardCreate } from '@/features/dashboard/dashboard'
import { Dashboard } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type DashboardCreatePanelRef = {
  submit: () => void
}

export type DashboardCreatePanelProps = {
  onCreated?: (data: Dashboard) => void
}

const DashboardCreatePanel = forwardRef(
  ({ onCreated }: DashboardCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { mutateAsync: createDashboard } = useDashboardCreate()

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
            label: { text: t('dashboard.slug', { ns: 'fields' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
          ...getFieldsLocale([{ name: 'name' }]),
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createDashboard({
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

DashboardCreatePanel.displayName = 'DashboardCreatePanel'

export default DashboardCreatePanel
