import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  useChatRoomPersonGet,
  useChatRoomPersonUpdate,
} from '@/features/chat/chat-room-person'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { ChatRoomPerson } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type ChatRoomPersonUpdatePanelProps = {
  data: ChatRoomPerson
  onUpdated?: (data: ChatRoomPerson) => void
}

const ChatRoomPersonUpdatePanel = forwardRef(
  ({ data, onUpdated }: ChatRoomPersonUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = useChatRoomPersonGet(data.id as number)
    const { mutate: chatRoomPersonUpdate } = useChatRoomPersonUpdate()
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
                    chatRoomPersonUpdate({
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

ChatRoomPersonUpdatePanel.displayName = 'ChatRoomPersonUpdatePanel'

export default ChatRoomPersonUpdatePanel
