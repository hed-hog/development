import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import { useMenuGet, useMenuUpdate } from '@/features/admin/menu'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { Menu } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type MenuUpdatePanelProps = {
  data: Menu
  onUpdated?: (data: Menu) => void
}

const MenuUpdatePanel = forwardRef(
  ({ data, onUpdated }: MenuUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = useMenuGet(data.id as number)
    const { mutate: menuUpdate } = useMenuUpdate()
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
                  fields={[...getFieldsLocale([{ name: 'name' }], item)]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    menuUpdate({
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

MenuUpdatePanel.displayName = 'MenuUpdatePanel'

export default MenuUpdatePanel
