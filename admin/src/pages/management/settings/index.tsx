import DataPanel from '@/components/custom/data-panel'
import { FormPanel } from '@/components/custom/form-panel'
import { TabPanel } from '@/components/custom/tab-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import {
  useCreateSetting,
  useDeleteSettings,
  useEditSetting,
} from '@/features/settings'
import { useApp } from '@/hooks/use-app'
import { SettingType } from '@/types/setting'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useRef } from 'react'
import { Helmet } from 'react-helmet'
import { FieldValues, useForm } from 'react-hook-form'

export default function Page() {
  const formEdit = useRef<any>(null)

  const form = useForm<FieldValues>({
    defaultValues: {
      id: '',
      name: '',
    },
    mode: 'onChange',
  })

  const { openDialog, closeDialog, openSheet, closeSheet } = useApp()

  const { mutate: createSetting } = useCreateSetting()
  const { mutate: editSetting } = useEditSetting()
  const { mutate: deleteSettings } = useDeleteSettings()

  const openCreateDialog = () => {
    form.reset({
      id: '',
      name: '',
      email: '',
      password: '',
    })

    const id = openDialog({
      title: 'Criar Nova Configuração',
      description: 'Preencha as informações da configuração.',
      children: () => (
        <FormPanel
          fields={[
            {
              name: 'name',
              label: { text: 'Nome' },
              type: EnumFieldType.TEXT,
              required: true,
            },
          ]}
          form={form}
          button={{ text: 'Criar' }}
          onSubmit={(data: SettingType) => {
            createSetting(data)
            closeDialog(id)
          }}
        />
      ),
    })

    return id
  }

  const openDeleteDialog = (items: SettingType[]) => {
    const id = openDialog({
      children: () => (
        <div className='flex flex-col'>
          {items.map((item: SettingType) => (
            <div key={item.name} className='mb-5'>
              <h3 className='text-md font-semibold'>{item.name}</h3>
            </div>
          ))}
        </div>
      ),
      title: 'Excluir Configuração',
      description: 'Tem certeza de que deseja deletar estas configurações?',
      buttons: [
        {
          variant: 'secondary',
          text: 'Cancelar',
          onClick: () => {
            closeDialog(id)
          },
        },
        {
          text: 'Deletar',
          variant: 'destructive',
          onClick: () => {
            deleteSettings(items.map((item) => item.id))
            closeDialog(id)
          },
        },
      ],
    })

    return id
  }

  const openEditDialog = (item: SettingType) => {
    form.reset({
      id: item.id || '',
      name: item.name || '',
    })

    const id = openSheet({
      children: () => (
        <TabPanel
          activeTabIndex={0}
          tabs={[
            {
              title: 'Detalhes',
              buttons: [
                {
                  text: 'Salvar',
                  variant: 'default',
                  onClick: () => {
                    formEdit.current?.submit()
                  },
                },
              ],
              children: (
                <FormPanel
                  ref={formEdit}
                  fields={[
                    {
                      name: 'name',
                      label: { text: 'Nome' },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                  ]}
                  form={form}
                  onSubmit={(data: SettingType) => {
                    editSetting({ id: String(data.id), data })
                    closeSheet(id)
                  }}
                />
              ),
            },
          ]}
        />
      ),
      title: 'Editar Configuração',
      description: 'Visualize e edite as informações da configuração.',
    })

    return id
  }

  return (
    <>
      <Helmet>
        <title>Settings - Hedhog</title>
      </Helmet>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Settings</h1>
        </div>
      </div>

      <DataPanel
        url='/settings'
        layout='table'
        id='settings'
        selectable
        columns={[
          { key: 'id', header: 'ID' },
          { key: 'name', header: 'Nome' },
        ]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openEditDialog(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: 'Editar',
            tooltip: 'Editar configurações selecionadas',
            handler: (items: SettingType[]) => {
              if (items.length === 1) openEditDialog(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: 'Excluir',
            variant: 'destructive',
            tooltip: 'Excluir as configurações selecionadas',
            handler: openDeleteDialog,
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: 'Criar',
            variant: 'default',
            tooltip: 'Criar nova configuração',
            handler: openCreateDialog,
            show: 'none',
          },
        ]}
      />
    </>
  )
}
