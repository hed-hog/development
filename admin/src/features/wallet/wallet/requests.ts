import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Wallet } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const walletList = async (params: PaginationParams) => {
    return request<PaginationResult<Wallet>>({
      url: "/wallet",
      params,
    }).then((res) => res.data);
  };

  const walletGet = async (id: number) => {
    return request<Wallet>({
      url: `/wallet/${id}`,
    }).then((res) => res.data);
  };

  const walletCreate = async (params: { data: Wallet }) => {
    const { data } = params;
    return request<Wallet>({
      url: "/wallet",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const walletDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/wallet",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const walletUpdate = async (params: { id: number; data: Wallet }) => {
    const { id, data } = params;
    return request<Wallet>({
      url: `/wallet/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    walletCreate,
    walletUpdate,
    walletDelete,
    walletList,
    walletGet,
  };
}
