import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import {
  useSettingUserGet,
  useSettingUserUpdate,
} from '@/features/setting/setting-user'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { SettingUser } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type SettingUserUpdatePanelProps = {
  data: SettingUser
  onUpdated?: (data: SettingUser) => void
}

const SettingUserUpdatePanel = forwardRef(
  ({ data, onUpdated }: SettingUserUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions'])
    const { data: item, isLoading } = useSettingUserGet(
      (data as any).id as number
    )
    const { mutate: settingUserUpdate } = useSettingUserUpdate()
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
                      name: 'user_id',
                      label: { text: t('user_id', { ns: 'translation' }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: 'setting_id',
                      label: { text: t('setting_id', { ns: 'translation' }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: 'value',
                      label: { text: t('value', { ns: 'translation' }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                  ]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    settingUserUpdate({ id: data.id, data })
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

SettingUserUpdatePanel.displayName = 'SettingUserUpdatePanel'

export default SettingUserUpdatePanel
