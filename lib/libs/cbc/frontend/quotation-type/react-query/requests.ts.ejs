import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { QuotationType } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const quotationTypeList = async (params: PaginationParams) => {
    return request<PaginationResult<QuotationType>>({
      url: "/quotation-type",
      params,
    }).then((res) => res.data);
  };

  const quotationTypeGet = async (id: number) => {
    return request<QuotationType>({
      url: `/quotation-type/${id}`,
    }).then((res) => res.data);
  };

  const quotationTypeCreate = async (params: { data: QuotationType }) => {
    const { data } = params;
    return request<QuotationType>({
      url: "/quotation-type",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const quotationTypeDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/quotation-type",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const quotationTypeUpdate = async (params: {
    id: number;
    data: QuotationType;
  }) => {
    const { id, data } = params;
    return request<QuotationType>({
      url: `/quotation-type/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    quotationTypeCreate,
    quotationTypeUpdate,
    quotationTypeDelete,
    quotationTypeList,
    quotationTypeGet,
  };
}
