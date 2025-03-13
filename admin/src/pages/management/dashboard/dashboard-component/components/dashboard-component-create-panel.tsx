import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from '@/components/panels/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { useDashboardComponentCreate } from '@/features/dashboard/dashboard-component'
import { DashboardComponent } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type DashboardComponentCreatePanelRef = {
  submit: () => void
}

export type DashboardComponentCreatePanelProps = {
  onCreated?: (data: DashboardComponent) => void
}

const DashboardComponentCreatePanel = forwardRef(
  ({ onCreated }: DashboardComponentCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { mutateAsync: createDashboardComponent } =
      useDashboardComponentCreate()

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
          ...getFieldsLocale([{ name: 'name' }]),
          {
            name: 'slug',
            label: { text: t('dashboard-component.slug', { ns: 'fields' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
          {
            name: 'path',
            label: { text: t('dashboard-component.path', { ns: 'fields' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
          {
            name: 'min_width',
            label: {
              text: t('dashboard-component.min_width', { ns: 'fields' }),
            },
            type: EnumFieldType.NUMBER,
            required: true,
          },
          {
            name: 'width',
            label: { text: t('dashboard-component.width', { ns: 'fields' }) },
            type: EnumFieldType.NUMBER,
            required: true,
          },
          {
            name: 'max_width',
            label: {
              text: t('dashboard-component.max_width', { ns: 'fields' }),
            },
            type: EnumFieldType.NUMBER,
            required: true,
          },
          {
            name: 'min_height',
            label: {
              text: t('dashboard-component.min_height', { ns: 'fields' }),
            },
            type: EnumFieldType.NUMBER,
            required: true,
          },
          {
            name: 'height',
            label: { text: t('dashboard-component.height', { ns: 'fields' }) },
            type: EnumFieldType.NUMBER,
            required: true,
          },
          {
            name: 'max_height',
            label: {
              text: t('dashboard-component.max_height', { ns: 'fields' }),
            },
            type: EnumFieldType.NUMBER,
            required: true,
          },
          {
            name: 'is_resizable',
            label: {
              text: t('dashboard-component.is_resizable', { ns: 'fields' }),
            },
            type: EnumFieldType.SWITCH,
            required: true,
          },
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createDashboardComponent({
            data: {
              ...data,
              min_width: Number(data.min_width),
              width: Number(data.width),
              max_width: Number(data.max_width),
              min_height: Number(data.min_height),
              height: Number(data.height),
              max_height: Number(data.max_height),
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

DashboardComponentCreatePanel.displayName = 'DashboardComponentCreatePanel'

export default DashboardComponentCreatePanel
