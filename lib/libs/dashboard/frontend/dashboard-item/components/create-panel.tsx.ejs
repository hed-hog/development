import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { useDashboardItemCreate } from '@/features/dashboard/dashboard-item'
import { DashboardItem } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type DashboardItemCreatePanelRef = {
  submit: () => void
}

export type DashboardItemCreatePanelProps = {
  onCreated?: (data: DashboardItem) => void
}

const DashboardItemCreatePanel = forwardRef(
  ({ onCreated }: DashboardItemCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { mutateAsync: createDashboardItem } = useDashboardItemCreate()

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
            name: 'component_id',
            label: { text: t('dashboard-item.component_id', { ns: 'fields' }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: '/dashboard-component',
            displayName: 'component',
            valueName: 'id',
          },

          {
            name: 'dashboard_id',
            label: { text: t('dashboard-item.dashboard_id', { ns: 'fields' }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: '/dashboard',
            displayName: 'dashboard',
            valueName: 'id',
          },

          {
            name: 'width',
            label: { text: t('dashboard-user.width', { ns: 'fields' }) },
            type: EnumFieldType.NUMBER,
            required: true,
          },

          {
            name: 'height',
            label: { text: t('dashboard-user.height', { ns: 'fields' }) },
            type: EnumFieldType.NUMBER,
            required: true,
          },

          {
            name: 'x_axis',
            label: { text: t('dashboard-user.x_axis', { ns: 'fields' }) },
            type: EnumFieldType.NUMBER,
            required: true,
          },

          {
            name: 'y_axis',
            label: { text: t('dashboard-user.y_axis', { ns: 'fields' }) },
            type: EnumFieldType.NUMBER,
            required: true,
          },
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createDashboardItem({
            data: {
              ...data,
              component_id: Number(data.component_id),
              dashboard_id: Number(data.dashboard_id),
              width: Number(data.width),
              height: Number(data.height),
              x_axis: Number(data.x_axis),
              y_axis: Number(data.y_axis),
            },
          })
          if (typeof onCreated === 'function') {
            onCreated(createdData as any)
          }
        }}
      />
    )
  }
)

DashboardItemCreatePanel.displayName = 'DashboardItemCreatePanel'

export default DashboardItemCreatePanel
