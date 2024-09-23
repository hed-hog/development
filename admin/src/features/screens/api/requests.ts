import { useApp } from '@/hooks/use-app'

export function requests() {
  const { request } = useApp()

  const createScreen = async (data: any) => {
    return request({
      url: '/screens',
      data,
      method: 'post',
    }).then((res) => res.data)
  }

  const deleteScreens = async <T>(screenIds: T[]) => {
    return request({
      url: '/screens',
      data: { ids: screenIds },
      method: 'delete',
    }).then((res) => res.data)
  }

  const editScreen = async (params: { id: string; data: any }) => {
    const { id, data } = params
    return request({
      url: `/screens/${id}`,
      method: 'patch',
      data,
    }).then((res) => res.data)
  }

  return { createScreen, deleteScreens, editScreen }
}
