import { useApp } from '@/hooks/use-app'
import { SettingType } from '@/types/setting'

export function requests() {
  const { request } = useApp()

  const createSetting = async (data: SettingType) => {
    return request({
      url: '/setting',
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
      url: `/setting/${id}`,
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
      url: `/setting/${slug}`,
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
      url: `/setting/user/${slug}`,
      method: 'put',
      data: { value },
    }).then((res) => res.data)
  }

  const editMultipleSetting = async (
    params: {
      slug: string
      value: string
    }[]
  ) => {
    return request({
      url: `/setting`,
      method: 'put',
      data: { setting: params },
    }).then((res) => res.data)
  }

  const deleteSetting = async <T>(settingIds: T[]) => {
    return request({
      url: '/setting',
      data: { ids: settingIds },
      method: 'delete',
    }).then((res) => res.data)
  }

  return {
    createSetting,
    editSetting,
    editSettingSlug,
    deleteSetting,
    editMultipleSetting,
    editUserSettingSlug,
  }
}
