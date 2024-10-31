import { useApp } from '@/hooks/use-app'

export function requests() {
  const { request } = useApp()

  const setEnabled = async (params: { codes: string[] }) => {
    const { codes } = params
    return request({
      url: `/locale`,
      method: 'put',
      data: {
        codes,
      },
    }).then((res) => res.data)
  }

  return {
    setEnabled,
  }
}
