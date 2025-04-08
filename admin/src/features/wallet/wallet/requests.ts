import { useApp } from '@/hooks/use-app'
import { Delete, PaginationParams, PaginationResult } from '@/types'
import { Wallet } from '@/types/models'
import { HttpMethod } from '@/types/http-method'

export function requests() {
  const { request } = useApp()

  const walletList = async (params: PaginationParams) => {
    return request<PaginationResult<Wallet>>({
      url: '/wallet',
      params,
    }).then((res) => res.data)
  }

  const walletGet = async (id: number) => {
    return request<Wallet>({
      url: `/wallet/${id}`,
    }).then((res) => res.data)
  }

  const walletCreate = async (params: { data: Wallet }) => {
    const { data } = params
    return request<Wallet>({
      url: '/wallet',
      method: HttpMethod.POST,
      data: {
        name: data.name,
        balance: Number(data.balance),
      },
    }).then((res) => res.data)
  }

  const walletDelete = async (ids: number[]) => {
    return request<Delete>({
      url: '/wallet',
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data)
  }

  const walletUpdate = async (params: { id: number; data: Wallet }) => {
    const { id } = params
    let data = {}

    Object.keys(params.data).forEach((key) => {
      if (key === 'balance') {
        data[key] = Number(params.data[key])
      } else {
        data[key] = params.data[key]
      }
    })

    return request<Wallet>({
      url: `/wallet/${id}`,
      method: HttpMethod.PATCH,
      data,
    }).then((res) => res.data)
  }

  return {
    walletCreate,
    walletUpdate,
    walletDelete,
    walletList,
    walletGet,
  }
}
