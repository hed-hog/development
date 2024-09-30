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

  const editSetting = async (params: { id: string; data: SettingType }) => {
    const { id, data } = params
    return request({
      url: `/settings/${id}`,
      method: 'patch',
      data,
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
    deleteSettings,
  }
}
