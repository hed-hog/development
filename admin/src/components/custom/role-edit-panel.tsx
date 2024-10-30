import { EnumFieldType } from '@/enums/EnumFieldType'
import {
  useEditRole,
  useEditRoleMenus,
  useEditRoleRoutes,
  useEditRoleScreens,
  useEditRoleUsers,
  useRolesShow,
} from '@/features/roles'
import { getIcon } from '@/lib/get-icon'
import { queryClient } from '@/lib/query-provider'
import { FieldType } from '@/types/form-panel'
import { Menus, Roles, Routes, Screens, Users } from '@/types/models'
import {
  getLocaleFields,
  getLocalesFromItem,
  getObjectFromLocaleFields,
} from '@hedhog/utils'
import { forwardRef, useEffect, useRef } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import DataPanel from './data-panel'
import FormPanel from './form-panel'
import { Overlay } from './overlay'
import { TabPanel } from './tab-panel'

export type RoleEditPanelProps = {
  data: Roles
  onEdit?: (data: Roles) => void
}

export const RoleEditPanel = forwardRef(
  ({ data, onEdit }: RoleEditPanelProps) => {
    const { t } = useTranslation(['actions', 'roles', 'modules', 'translation'])

    const { data: item, isLoading } = useRolesShow(data.id as number)
    const { mutate: editRoleRoutes } = useEditRoleRoutes()
    const { mutate: editRoleScreens } = useEditRoleScreens()
    const { mutate: editRoleUsers } = useEditRoleUsers()
    const { mutate: editRoleMenus } = useEditRoleMenus()
    const { mutate: editRole } = useEditRole()

    const formRef = useRef<any>(null)
    const roleScreensRef = useRef<any>(null)
    const roleMenusRef = useRef<any>(null)
    const roleRoutesRef = useRef<any>(null)
    const roleUsersRef = useRef<any>(null)

    const form = useForm<FieldValues>({
      mode: 'onChange',
    })

    useEffect(() => {
      if (item) {
        form.reset({
          id: item.id || '',
          slug: item.slug || '',
          ...getObjectFromLocaleFields(item),
        })
      }
    }, [item])

    return (
      <Overlay loading={isLoading}>
        {item && (
          <TabPanel
            activeTabIndex={0}
            tabs={[
              {
                title: t('details', { ns: 'actions' }),
                buttons: [
                  {
                    text: t('save', { ns: 'actions' }),
                    variant: 'default',
                    onClick: () => {
                      formRef.current?.submit()
                    },
                  },
                ],
                children: (
                  <FormPanel
                    ref={formRef}
                    fields={[
                      {
                        name: 'slug',
                        required: true,
                        type: EnumFieldType.TEXT,
                        label: { text: t('slug', { ns: 'translation' }) },
                      },
                      ...getLocaleFields(item).map((field) => ({
                        name: field.fieldNameLocale,
                        required: false,
                        type: EnumFieldType.TEXT as FieldType,
                        label: {
                          text: t(field.fieldName, { ns: 'translation' }),
                          ...(getLocalesFromItem(item).length > 1
                            ? { small: field.localeCode }
                            : {}),
                        },
                      })),
                    ]}
                    form={form}
                    onSubmit={(data: Roles) => {
                      editRole({ id: String(data.id), data })

                      if (typeof onEdit === 'function') {
                        onEdit(data)
                      }
                    }}
                  />
                ),
              },
              {
                title: t('users', { ns: 'modules' }),
                children: (
                  <DataPanel
                    ref={roleUsersRef}
                    selectable
                    extractKey={(item) => String(item.id)}
                    multiple
                    layout='list'
                    id={`role-users-${item.id}`}
                    url={`/roles/${item.id}/users`}
                    checked={(item: Roles) => {
                      return Boolean((item.role_users ?? []).length)
                    }}
                  />
                ),
                buttons: [
                  {
                    text: t('apply', { ns: 'actions' }),
                    variant: 'default',
                    onClick: () => {
                      if (roleUsersRef.current) {
                        const items = roleUsersRef.current.getSelectedItems()

                        if (items) {
                          editRoleUsers(
                            {
                              roleId: String(item.id),
                              userIds: items.map((u: Users) => u.id),
                            },
                            {
                              onSuccess: () => {
                                queryClient.invalidateQueries({
                                  queryKey: [`role-users-${item.id}`],
                                })
                              },
                            }
                          )
                        }
                      }
                    },
                  },
                ],
              },
              {
                title: t('routes', { ns: 'modules' }),
                children: (
                  <DataPanel
                    ref={roleRoutesRef}
                    selectable
                    multiple
                    layout='list'
                    id={`role-routes-${item.id}`}
                    url={`/roles/${item.id}/routes`}
                    render={(item: Routes) => (
                      <div className='flex flex-row gap-2'>
                        <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
                          {item.method}
                        </code>
                        <code>{item.url}</code>
                      </div>
                    )}
                    checked={(item: Routes) => {
                      return Boolean((item.role_routes ?? []).length)
                    }}
                  />
                ),
                buttons: [
                  {
                    text: t('apply', { ns: 'actions' }),
                    variant: 'default',
                    onClick: () => {
                      if (roleRoutesRef.current) {
                        const items = roleRoutesRef.current.getSelectedItems()

                        if (items) {
                          editRoleRoutes(
                            {
                              roleId: String(item.id),
                              routeIds: items.map((r: Routes) => r.id),
                            },
                            {
                              onSuccess: () => {
                                queryClient.invalidateQueries({
                                  queryKey: [`role-routes-${item.id}`],
                                })
                              },
                            }
                          )
                        }
                      }
                    },
                  },
                ],
              },
              {
                title: t('menus', { ns: 'modules' }),
                children: (
                  <DataPanel
                    ref={roleMenusRef}
                    selectable
                    multiple
                    layout='list'
                    id={`role-menus-${item.id}`}
                    url={`/roles/${item.id}/menus`}
                    render={(item: Menus) => (
                      <div className='flex flex-row items-center gap-2'>
                        {getIcon(item.icon || '')}
                        <code>
                          {item.name} - {item.url}
                        </code>
                      </div>
                    )}
                    checked={(item: Menus) => {
                      return Boolean((item.role_menus ?? []).length)
                    }}
                  />
                ),
                buttons: [
                  {
                    text: t('apply', { ns: 'actions' }),
                    variant: 'default',
                    onClick: () => {
                      if (roleMenusRef.current) {
                        const items = roleMenusRef.current.getSelectedItems()

                        if (items) {
                          editRoleMenus(
                            {
                              roleId: String(item.id),
                              menuIds: items.map((m: Menus) => m.id),
                            },
                            {
                              onSuccess: () => {
                                queryClient.invalidateQueries({
                                  queryKey: [`role-menus-${item.id}`],
                                })
                              },
                            }
                          )
                        }
                      }
                    },
                  },
                ],
              },
              {
                title: t('screens', { ns: 'modules' }),
                children: (
                  <DataPanel
                    ref={roleScreensRef}
                    selectable
                    multiple
                    layout='list'
                    id={`role-screens-${item.id}`}
                    url={`/roles/${item.id}/screens`}
                    render={(item: Screens) => (
                      <div className='flex flex-col'>
                        <div className='flex flex-row'>
                          {getIcon(item.icon || '')}
                          <code className='px-1'>
                            {item.name} - {item.slug}
                          </code>
                        </div>
                        <p className='m-0 text-left text-xs'>
                          {item.description}
                        </p>
                      </div>
                    )}
                    checked={(item: Screens) => {
                      return Boolean((item.role_screens ?? []).length)
                    }}
                  />
                ),
                buttons: [
                  {
                    text: t('apply', { ns: 'actions' }),
                    variant: 'default',
                    onClick: () => {
                      if (roleScreensRef.current) {
                        const items = roleScreensRef.current.getSelectedItems()

                        if (items) {
                          editRoleScreens(
                            {
                              roleId: String(item.id),
                              screenIds: items.map((s: Screens) => s.id),
                            },
                            {
                              onSuccess: () => {
                                queryClient.invalidateQueries({
                                  queryKey: [`role-screens-${item.id}`],
                                })
                              },
                            }
                          )
                        }
                      }
                    },
                  },
                ],
              },
            ]}
          />
        )}
      </Overlay>
    )
  }
)
