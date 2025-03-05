import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { Setting } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useSettingGet, useSettingUpdate } from '@/features/setting/setting'

export type SettingUpdatePanelProps = {
  data: Setting
  onUpdated?: (data: Setting) => void
}

const SettingUpdatePanel = forwardRef(
  ({ data, onUpdated }: SettingUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions'])
    const { data: item, isLoading } = useSettingGet(data.id as number)
    const { mutate: settingUpdate } = useSettingUpdate()
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
                      name: 'group_id',
                      label: { text: t('group_id', { ns: 'translation' }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: 'type',
                      label: { text: t('type', { ns: 'translation' }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: 'value',
                      label: { text: t('value', { ns: 'translation' }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: 'user_override',
                      label: {
                        text: t('user_override', { ns: 'translation' }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    ...getFieldsLocale([{ name: 'name' }]),
                  ]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    settingUpdate({ id: data.id, data })
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

SettingUpdatePanel.displayName = 'SettingUpdatePanel'

export default SettingUpdatePanel
