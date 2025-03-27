import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  usePersonUserGet,
  usePersonUserUpdate,
} from '@/features/contact/person-user'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { PersonUser } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type PersonUserUpdatePanelProps = {
  id: number
  data: PersonUser
  onUpdated?: (data: PersonUser) => void
}

const PersonUserUpdatePanel = forwardRef(
  ({ id, data, onUpdated }: PersonUserUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = usePersonUserGet(id, data.id as number)
    const { mutate: personUserUpdate } = usePersonUserUpdate()
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
                  fields={[]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    personUserUpdate({
                      personId: id,
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

PersonUserUpdatePanel.displayName = 'PersonUserUpdatePanel'

export default PersonUserUpdatePanel
