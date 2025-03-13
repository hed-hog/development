import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  useDashboardGet,
  useDashboardUpdate,
} from '@/features/dashboard/dashboard'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { Dashboard } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { EnumFieldType } from '@/enums/EnumFieldType'

export type DashboardUpdatePanelProps = {
  data: Dashboard
  onUpdated?: (data: Dashboard) => void
}

const DashboardUpdatePanel = forwardRef(
  ({ data, onUpdated }: DashboardUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = useDashboardGet(
      (data as any).dashboard_id as number
    )
    const { mutate: dashboardUpdate } = useDashboardUpdate()
    const formRef = useRef<FormPanelRef>(null)

    useEffectAfterFirstUpdate(() => {
      if (item && formRef.current) {
        formRef.current.setValuesFromItem(item)
      }
    }, [item])

    useImperativeHandle(ref, () => ({}))

    return (
      <TabPanel
        activeTabIndex={0}
        tabs={[
          {
            title: t('details', { ns: 'actions' }),
            children: (
              <Overlay loading={isLoading}>
                <FormPanel
                  ref={formRef}
                  fields={[
                    {
                      name: 'slug',
                      label: { text: t('dashboard.slug', { ns: 'fields' }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                    ...getFieldsLocale([{ name: 'name' }], item),
                  ]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    dashboardUpdate({
                      id: data.id,
                      data,
                    })
                    if (typeof onUpdated === 'function') {
                      onUpdated(data)
                    }
                  }}
                />
              </Overlay>
            ),
          },
        ]}
      />
    )
  }
)

DashboardUpdatePanel.displayName = 'DashboardUpdatePanel'

export default DashboardUpdatePanel
