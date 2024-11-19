import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import {
  usePersonDocumentTypeGet,
  usePersonDocumentTypeUpdate,
} from '@/features/contact/person-document-type'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { PersonDocumentType } from '@/types/models'
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { useApp } from '@/hooks/use-app'
import { IFormFieldOption } from '@/types'

export type PersonDocumentTypeUpdatePanelProps = {
  data: PersonDocumentType
  onUpdated?: (data: PersonDocumentType) => void
}

const PersonDocumentTypeUpdatePanel = forwardRef(
  ({ data, onUpdated }: PersonDocumentTypeUpdatePanelProps, ref) => {
    const [options, setOptions] = useState<IFormFieldOption[]>([])
    const { t } = useTranslation(['actions'])
    const { data: item, isLoading } = usePersonDocumentTypeGet(
      data.id as number
    )
    const { request } = useApp()
    const { mutate: personDocumentTypeUpdate } = usePersonDocumentTypeUpdate()
    const formRef = useRef<FormPanelRef>(null)

    const { data: countries } = useQuery({
      queryKey: ['country'],
      queryFn: () =>
        request({
          url: '/country',
        }),
    })

    useEffect(() => {
      if (countries) {
        const countryOptions = (countries?.data as any).map((item: any) => {
          return {
            value: item.id,
            label: item.locale.en?.name || 'N/A',
          }
        })
        setOptions(countryOptions)
      }
    }, [countries])

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
                      label: { text: t('country_id', { ns: 'translation' }) },
                      type: EnumFieldType.SELECT,
                      required: true,
                      options,
                    },

                    {
                      name: 'slug',
                      label: { text: t('slug', { ns: 'translation' }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    ...getFieldsLocale([{ name: 'name' }], item),
                  ]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    personDocumentTypeUpdate({ id: data.id, data })
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

PersonDocumentTypeUpdatePanel.displayName = 'PersonDocumentTypeUpdatePanel'

export default PersonDocumentTypeUpdatePanel
