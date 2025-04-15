import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { WalletPerson } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const walletPersonList = async (params: PaginationParams) => {
    return request<PaginationResult<WalletPerson>>({
      url: "/wallet-person",
      params,
    }).then((res) => res.data);
  };

  const walletPersonGet = async (id: number) => {
    return request<WalletPerson>({
      url: `/wallet-person/${id}`,
    }).then((res) => res.data);
  };

  const walletPersonCreate = async (params: { data: WalletPerson }) => {
    const { data } = params;
    return request<WalletPerson>({
      url: "/wallet-person",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const walletPersonDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/wallet-person",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const walletPersonUpdate = async (params: {
    id: number;
    data: WalletPerson;
  }) => {
    const { id, data } = params;
    return request<WalletPerson>({
      url: `/wallet-person/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    walletPersonCreate,
    walletPersonUpdate,
    walletPersonDelete,
    walletPersonList,
    walletPersonGet,
  };
}
