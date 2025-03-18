import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  useDashboardItemGet,
  useDashboardItemUpdate,
} from '@/features/dashboard/dashboard-item'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { DashboardItem } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { EnumFieldType } from '@/enums/EnumFieldType'

export type DashboardItemUpdatePanelProps = {
  data: DashboardItem
  onUpdated?: (data: DashboardItem) => void
}

const DashboardItemUpdatePanel = forwardRef(
  ({ data, onUpdated }: DashboardItemUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = useDashboardItemGet(
      (data as any).id as number
    )
    const { mutate: dashboardItemUpdate } = useDashboardItemUpdate()
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
                      name: 'component_id',
                      label: {
                        text: t('dashboard-item.component_id', {
                          ns: 'fields',
                        }),
                      },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: '/dashboard-component',
                      displayName: 'component',
                      valueName: 'id',
                    },

                    {
                      name: 'dashboard_id',
                      label: {
                        text: t('dashboard-item.dashboard_id', {
                          ns: 'fields',
                        }),
                      },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: '/dashboard',
                      displayName: 'dashboard',
                      valueName: 'id',
                    },

                    {
                      name: 'width',
                      label: {
                        text: t('dashboard-user.width', { ns: 'fields' }),
                      },
                      type: EnumFieldType.NUMBER,
                      required: true,
                    },

                    {
                      name: 'height',
                      label: {
                        text: t('dashboard-user.height', { ns: 'fields' }),
                      },
                      type: EnumFieldType.NUMBER,
                      required: true,
                    },

                    {
                      name: 'x_axis',
                      label: {
                        text: t('dashboard-user.x_axis', { ns: 'fields' }),
                      },
                      type: EnumFieldType.NUMBER,
                      required: true,
                    },

                    {
                      name: 'y_axis',
                      label: {
                        text: t('dashboard-user.y_axis', { ns: 'fields' }),
                      },
                      type: EnumFieldType.NUMBER,
                      required: true,
                    },
                  ]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    dashboardItemUpdate({
                      id: data.id,
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

DashboardItemUpdatePanel.displayName = 'DashboardItemUpdatePanel'

export default DashboardItemUpdatePanel
