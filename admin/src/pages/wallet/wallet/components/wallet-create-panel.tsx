import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { useWalletCreate } from '@/features/wallet/wallet'
import { Wallet } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type WalletCreatePanelRef = {
  submit: () => void
}

export type WalletCreatePanelProps = {
  onCreated?: (data: Wallet) => void
}

const WalletCreatePanel = forwardRef(
  ({ onCreated }: WalletCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { mutateAsync: createWallet } = useWalletCreate()

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
          {
            name: 'name',
            label: { text: t('wallet.name', { ns: 'fields' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: 'balance',
            label: { text: t('wallet.balance', { ns: 'fields' }) },
            type: EnumFieldType.NUMBER,
            required: true,
          },
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createWallet({
            data,
          })
          if (typeof onCreated === 'function') {
            onCreated(createdData as any)
          }
        }}
      />
    )
  }
)

WalletCreatePanel.displayName = 'WalletCreatePanel'

export default WalletCreatePanel
