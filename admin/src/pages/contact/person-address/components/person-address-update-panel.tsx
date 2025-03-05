import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  usePersonAddressGet,
  usePersonAddressUpdate,
} from '@/features/contact/person-address'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { PersonAddress } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { EnumFieldType } from '@/enums/EnumFieldType'

export type PersonAddressUpdatePanelProps = {
  id: number
  data: PersonAddress
  onUpdated?: (data: PersonAddress) => void
}

const PersonAddressUpdatePanel = forwardRef(
  ({ id, data, onUpdated }: PersonAddressUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = usePersonAddressGet(id, data.id as number)
    const { mutate: personAddressUpdate } = usePersonAddressUpdate()
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
                      name: 'country_id',
                      label: {
                        text: t('person_address.country_id', { ns: 'fields' }),
                      },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: '/country?pageSize=200',
                      displayName: 'country',
                      valueName: 'id',
                    },

                    {
                      name: 'type_id',
                      label: {
                        text: t('person_address.type_id', { ns: 'fields' }),
                      },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: '/person-address-type',
                      displayName: 'type',
                      valueName: 'id',
                    },

                    {
                      name: 'primary',
                      label: {
                        text: t('person_address.primary', { ns: 'fields' }),
                      },
                      type: EnumFieldType.SWITCH,
                      required: true,
                    },

                    {
                      name: 'street',
                      label: {
                        text: t('person_address.street', { ns: 'fields' }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: 'number',
                      label: {
                        text: t('person_address.number', { ns: 'fields' }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: 'complement',
                      label: {
                        text: t('person_address.complement', { ns: 'fields' }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: 'district',
                      label: {
                        text: t('person_address.district', { ns: 'fields' }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: 'city',
                      label: {
                        text: t('person_address.city', { ns: 'fields' }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: 'state',
                      label: {
                        text: t('person_address.state', { ns: 'fields' }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: 'postal_code',
                      label: {
                        text: t('person_address.postal_code', { ns: 'fields' }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: 'reference',
                      label: {
                        text: t('person_address.reference', { ns: 'fields' }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                  ]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    personAddressUpdate({
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

PersonAddressUpdatePanel.displayName = 'PersonAddressUpdatePanel'

export default PersonAddressUpdatePanel
