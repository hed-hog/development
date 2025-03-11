import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  useDashboardComponentGet,
  useDashboardComponentUpdate,
} from '@/features/dashboard/dashboard-component'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { DashboardComponent } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { EnumFieldType } from '@/enums/EnumFieldType'

export type DashboardComponentUpdatePanelProps = {
  data: DashboardComponent
  onUpdated?: (data: DashboardComponent) => void
}

const DashboardComponentUpdatePanel = forwardRef(
  ({ data, onUpdated }: DashboardComponentUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = useDashboardComponentGet(
      (data as any).component_id as number
    )
    const { mutate: dashboardComponentUpdate } = useDashboardComponentUpdate()
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
                    ...getFieldsLocale([{ name: 'name' }], item),
                    {
                      name: 'slug',
                      label: {
                        text: t('dashboard-component.slug', { ns: 'fields' }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                    {
                      name: 'path',
                      label: {
                        text: t('dashboard-component.path', { ns: 'fields' }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                    {
                      name: 'min_width',
                      label: {
                        text: t('dashboard-component.min_width', {
                          ns: 'fields',
                        }),
                      },
                      type: EnumFieldType.NUMBER,
                      required: true,
                    },
                    {
                      name: 'width',
                      label: {
                        text: t('dashboard-component.width', { ns: 'fields' }),
                      },
                      type: EnumFieldType.NUMBER,
                      required: true,
                    },
                    {
                      name: 'max_width',
                      label: {
                        text: t('dashboard-component.max_width', {
                          ns: 'fields',
                        }),
                      },
                      type: EnumFieldType.NUMBER,
                      required: true,
                    },
                    {
                      name: 'min_height',
                      label: {
                        text: t('dashboard-component.min_height', {
                          ns: 'fields',
                        }),
                      },
                      type: EnumFieldType.NUMBER,
                      required: true,
                    },
                    {
                      name: 'height',
                      label: {
                        text: t('dashboard-component.height', { ns: 'fields' }),
                      },
                      type: EnumFieldType.NUMBER,
                      required: true,
                    },
                    {
                      name: 'max_height',
                      label: {
                        text: t('dashboard-component.max_height', {
                          ns: 'fields',
                        }),
                      },
                      type: EnumFieldType.NUMBER,
                      required: true,
                    },
                    {
                      name: 'is_resizable',
                      label: {
                        text: t('dashboard-component.is_resizable', {
                          ns: 'fields',
                        }),
                      },
                      type: EnumFieldType.SWITCH,
                      required: true,
                    },
                  ]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    dashboardComponentUpdate({
                      id: data.id,
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

DashboardComponentUpdatePanel.displayName = 'DashboardComponentUpdatePanel'

export default DashboardComponentUpdatePanel
