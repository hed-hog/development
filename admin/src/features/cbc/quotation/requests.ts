import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Quotation } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const quotationList = async (params: PaginationParams) => {
    return request<PaginationResult<Quotation>>({
      url: "/quotation",
      params,
    }).then((res) => res.data);
  };

  const quotationGet = async (id: number) => {
    return request<Quotation>({
      url: `/quotation/${id}`,
    }).then((res) => res.data);
  };

  const quotationCreate = async (params: { data: Quotation }) => {
    const { data } = params;
    return request<Quotation>({
      url: "/quotation",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const quotationDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/quotation",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const quotationUpdate = async (params: { id: number; data: Quotation }) => {
    const { id, data } = params;
    return request<Quotation>({
      url: `/quotation/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    quotationCreate,
    quotationUpdate,
    quotationDelete,
    quotationList,
    quotationGet,
  };
}
