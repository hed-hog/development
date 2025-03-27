import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import { useChatRoomGet, useChatRoomUpdate } from '@/features/chat/chat-room'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { ChatRoom } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type ChatRoomUpdatePanelProps = {
  data: ChatRoom
  onUpdated?: (data: ChatRoom) => void
}

const ChatRoomUpdatePanel = forwardRef(
  ({ data, onUpdated }: ChatRoomUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = useChatRoomGet(data.id as number)
    const { mutate: chatRoomUpdate } = useChatRoomUpdate()
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
                    chatRoomUpdate({
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

ChatRoomUpdatePanel.displayName = 'ChatRoomUpdatePanel'

export default ChatRoomUpdatePanel
