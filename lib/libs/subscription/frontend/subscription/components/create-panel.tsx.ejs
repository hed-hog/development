import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { toast } from 'sonner'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { useApp } from '@/hooks/use-app'
import { Subscription } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export type SubscriptionCreatePanelRef = {
  submit: () => void
}

export type SubscriptionCreatePanelProps = {
  onCreated?: (data: Subscription) => void
}

const SubscriptionCreatePanel = forwardRef(
  ({ onCreated }: SubscriptionCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const [selectedIds, setSelectedIds] = useState<Record<string, any>[]>([])
    const { t } = useTranslation([
      'actions',
      'fields',
      'translations',
      'subscription.subscription',
    ])
    const { request } = useApp()
    const selectedIdsRef = useRef<(string | Record<string, any>)[]>([])

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
            name: 'plan_id',
            type: EnumFieldType.COMBOBOX,
            label: {
              text: t('subscription.plan_id', { ns: 'fields' }),
            },
            required: true,
            url: '/subscription-plan',
            displayName: 'name',
            valueName: 'id',
          },
          {
            name: 'limit',
            type: EnumFieldType.NUMBER,
            label: {
              text: t('subscription.limit', { ns: 'fields' }),
            },
            required: true,
            value: 1,
          },
          {
            name: 'role',
            type: EnumFieldType.SELECT,
            label: {
              text: t('subscription.role', { ns: 'fields' }),
            },
            required: true,
            options: [
              {
                value: 'admin',
                label: 'Administrador',
              },
              {
                value: 'user',
                label: 'Usuário',
              },
            ],
          },
          {
            name: 'persons',
            type: EnumFieldType.PICKER,
            label: {
              text: t('subscription.person_id', { ns: 'fields' }),
            },
            required: true,
            url: '/person',
            value: selectedIds,
            onChange: setSelectedIds,
            columnName: t('name', { ns: 'subscription.subscription' }),
          },
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          try {
            if (Number(data.limit) < selectedIdsRef.current.length) {
              toast.error(`Limite de pessoas ultrapassado!`)
              return
            }

            const createdData = await request({
              method: 'POST',
              url: '/subscription-create',
              data: {
                ...data,
                status: 'active',
                plan_id: Number(data.plan_id),
                limit: Number(data.limit),
                person_ids: data.persons.map((p: any) => p.id),
                role: data.role,
              },
            })

            toast.success('Assinatura criada com sucesso!')

            if (typeof onCreated === 'function') {
              onCreated(createdData as any)
            }
          } catch (error) {
            toast.error(`Erro ao criar assinatura. Tente novamente.`)
            console.error(error)
          }
        }}
      />
    )
  }
)

SubscriptionCreatePanel.displayName = 'SubscriptionCreatePanel'

export default SubscriptionCreatePanel
