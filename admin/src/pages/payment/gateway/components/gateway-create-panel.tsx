import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { useGatewayCreate } from '@/features/payment/gateway'
import { PaymentGateway } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type GatewayCreatePanelRef = {
  submit: () => void
}

export type GatewayCreatePanelProps = {
  onCreated?: (data: PaymentGateway) => void
}

const GatewayCreatePanel = forwardRef(
  ({ onCreated }: GatewayCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { mutateAsync: createGateway } = useGatewayCreate()

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
            label: { text: t('gateway.name', { ns: 'fields' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createGateway({
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

GatewayCreatePanel.displayName = 'GatewayCreatePanel'

export default GatewayCreatePanel
