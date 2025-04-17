import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { WalletTransaction } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const walletTransactionList = async (params: PaginationParams) => {
    return request<PaginationResult<WalletTransaction>>({
      url: "/wallet-transaction",
      params,
    }).then((res) => res.data);
  };

  const walletTransactionGet = async (id: number) => {
    return request<WalletTransaction>({
      url: `/wallet-transaction/${id}`,
    }).then((res) => res.data);
  };

  const walletTransactionCreate = async (params: {
    data: WalletTransaction;
  }) => {
    const { data } = params;
    return request<WalletTransaction>({
      url: "/wallet-transaction",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const walletTransactionDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/wallet-transaction",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const walletTransactionUpdate = async (params: {
    id: number;
    data: WalletTransaction;
  }) => {
    const { id, data } = params;
    return request<WalletTransaction>({
      url: `/wallet-transaction/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    walletTransactionCreate,
    walletTransactionUpdate,
    walletTransactionDelete,
    walletTransactionList,
    walletTransactionGet,
  };
}
