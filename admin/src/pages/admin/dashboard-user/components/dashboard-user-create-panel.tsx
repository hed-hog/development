import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { useDashboardUserCreate } from '@/features/admin/dashboard-user'
import { DashboardUser } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type DashboardUserCreatePanelRef = {
  submit: () => void
}

export type DashboardUserCreatePanelProps = {
  onCreated?: (data: DashboardUser) => void
}

const DashboardUserCreatePanel = forwardRef(
  ({ onCreated }: DashboardUserCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { mutateAsync: createDashboardUser } = useDashboardUserCreate()

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
            name: 'item_id',
            label: { text: t('dashboard-user.item_id', { ns: 'fields' }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: '/dashboard-item',
            displayName: 'item',
            valueName: 'id',
          },

          {
            name: 'user_id',
            label: { text: t('dashboard-user.user_id', { ns: 'fields' }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: '/user',
            displayName: 'user',
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
          const createdData = await createDashboardUser({
            data: {
              ...data,
              item_id: Number(data.item_id),
              user_id: Number(data.user_id),
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

DashboardUserCreatePanel.displayName = 'DashboardUserCreatePanel'

export default DashboardUserCreatePanel
