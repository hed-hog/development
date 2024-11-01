import { EnumFieldType } from '@/enums/EnumFieldType'
import {
  useEditRole,
  useEditRoleMenu,
  useEditRoleRoute,
  useEditRoleScreen,
  useEditRoleUser,
  useRoleShow,
} from '@/features/role'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { getIcon } from '@/lib/get-icon'
import { queryClient } from '@/lib/query-provider'
import { FieldType } from '@/types/form-panel'
import { Menu, Role, Route, Screen, User } from '@/types/models'
import { getLocaleFields, getLocalesFromItem } from '@hedhog/utils'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import DataPanel from '@/components/panels/data-panel'
import FormPanel from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'

export type RoleEditPanelProps = {
  data: Role
  onEdit?: (data: Role) => void
}

export const RoleEditPanel = forwardRef(
  ({ data, onEdit }: RoleEditPanelProps, ref) => {
    const { t } = useTranslation(['actions', 'role', 'modules', 'translation'])

    const { data: item, isLoading } = useRoleShow(data.id as number)
    const { mutate: editRoleRoutes } = useEditRoleRoute()
    const { mutate: editRoleScreens } = useEditRoleScreen()
    const { mutate: editRoleUsers } = useEditRoleUser()
    const { mutate: editRoleMenus } = useEditRoleMenu()
    const { mutate: editRole } = useEditRole()

    const formRef = useRef<any>(null)
    const roleScreensRef = useRef<any>(null)
    const roleMenusRef = useRef<any>(null)
    const roleRoutesRef = useRef<any>(null)
    const roleUsersRef = useRef<any>(null)

    useEffectAfterFirstUpdate(() => {
      if (item && formRef.current) {
        formRef.current.setValuesFromItem(item)
      }
    }, [item, formRef])

    useImperativeHandle(ref, () => ({}), [])

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
                    onSubmit={(data: Role) => {
                      editRole({ id: String(data.id), data })

                      if (typeof onEdit === 'function') {
                        onEdit(data)
                      }
                    }}
                  />
                ),
              },
              {
                title: t('user', { ns: 'modules' }),
                children: (
                  <DataPanel
                    ref={roleUsersRef}
                    selectable
                    extractKey={(item) => String(item.id)}
                    multiple
                    layout='list'
                    id={`role-user-${item.id}`}
                    url={`/role/${item.id}/user`}
                    checked={(item: Role) => {
                      return Boolean((item.role_user ?? []).length)
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
                              userIds: items.map((u: User) => u.id),
                            },
                            {
                              onSuccess: () => {
                                queryClient.invalidateQueries({
                                  queryKey: [`role-user-${item.id}`],
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
                title: t('route', { ns: 'modules' }),
                children: (
                  <DataPanel
                    ref={roleRoutesRef}
                    selectable
                    multiple
                    layout='list'
                    id={`role-route-${item.id}`}
                    url={`/role/${item.id}/route`}
                    render={(item: Route) => (
                      <div className='flex flex-row gap-2'>
                        <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
                          {item.method}
                        </code>
                        <code>{item.url}</code>
                      </div>
                    )}
                    checked={(item: Route) => {
                      return Boolean((item.role_route ?? []).length)
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
                              routeIds: items.map((r: Route) => r.id),
                            },
                            {
                              onSuccess: () => {
                                queryClient.invalidateQueries({
                                  queryKey: [`role-route-${item.id}`],
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
                title: t('menu', { ns: 'modules' }),
                children: (
                  <DataPanel
                    ref={roleMenusRef}
                    selectable
                    multiple
                    layout='list'
                    id={`role-menu-${item.id}`}
                    url={`/role/${item.id}/menu`}
                    render={(item: Menu) => (
                      <div className='flex flex-row items-center gap-2'>
                        {getIcon(item.icon || '')}
                        <code>
                          {item.name} - {item.url}
                        </code>
                      </div>
                    )}
                    checked={(item: Menu) => {
                      return Boolean((item.role_menu ?? []).length)
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
                              menuIds: items.map((m: Menu) => m.id),
                            },
                            {
                              onSuccess: () => {
                                queryClient.invalidateQueries({
                                  queryKey: [`role-menu-${item.id}`],
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
                    url={`/role/${item.id}/screen`}
                    render={(item: Screen) => (
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
                    checked={(item: Screen) => {
                      return Boolean((item.role_screen ?? []).length)
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
                              screenIds: items.map((s: Screen) => s.id),
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
