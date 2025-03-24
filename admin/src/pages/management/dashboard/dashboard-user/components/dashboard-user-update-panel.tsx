import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  useDashboardUserGet,
  useDashboardUserUpdate,
} from '@/features/admin/dashboard-user'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { DashboardUser } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { EnumFieldType } from '@/enums/EnumFieldType'

export type DashboardUserUpdatePanelProps = {
  data: DashboardUser
  onUpdated?: (data: DashboardUser) => void
}

const DashboardUserUpdatePanel = forwardRef(
  ({ data, onUpdated }: DashboardUserUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = useDashboardUserGet(
      (data as any).id as number
    )

    const { mutate: dashboardUserUpdate } = useDashboardUserUpdate()
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
                      name: 'item_id',
                      label: {
                        text: t('dashboard-user.item_id', { ns: 'fields' }),
                      },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: '/dashboard-item',
                      displayName: 'item',
                      valueName: 'id',
                    },

                    {
                      name: 'user_id',
                      label: {
                        text: t('dashboard-user.user_id', { ns: 'fields' }),
                      },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: '/user',
                      displayName: 'user',
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
                    dashboardUserUpdate({
                      id: data.id,
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

DashboardUserUpdatePanel.displayName = 'DashboardUserUpdatePanel'

export default DashboardUserUpdatePanel
