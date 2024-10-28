import { useApp } from '@/hooks/use-app'
import { SettingType } from '@/types/setting'

export function requests() {
  const { request } = useApp()

  const createSetting = async (data: SettingType) => {
    return request({
      url: '/settings',
      data,
      method: 'post',
    }).then((res) => res.data)
  }

  const editSetting = async (params: {
    id: string
    data: Partial<SettingType>
  }) => {
    const { id, data } = params
    return request({
      url: `/settings/${id}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  const editSettingSlug = async (params: {
    slug: string
    data: Partial<SettingType>
  }) => {
    const { slug, data } = params
    return request({
      url: `/settings/${slug}`,
      method: 'put',
      data,
    }).then((res) => res.data)
  }

  const editUserSettingSlug = async (params: {
    slug: string
    value: string
  }) => {
    const { slug, value } = params
    return request({
      url: `/settings/users/${slug}`,
      method: 'put',
      data: { value },
    }).then((res) => res.data)
  }

  const editMultipleSettings = async (
    params: {
      slug: string
      value: string
    }[]
  ) => {
    return request({
      url: `/settings`,
      method: 'put',
      data: { settings: params },
    }).then((res) => res.data)
  }

  const deleteSettings = async <T>(settingIds: T[]) => {
    return request({
      url: '/settings',
      data: { ids: settingIds },
      method: 'delete',
    }).then((res) => res.data)
  }

  return {
    createSetting,
    editSetting,
    editSettingSlug,
    deleteSettings,
    editMultipleSettings,
    editUserSettingSlug,
  }
}
