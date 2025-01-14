import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { QuotationRequestType } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const quotationRequestTypeList = async (params: PaginationParams) => {
    return request<PaginationResult<QuotationRequestType>>({
      url: "/quotation-request-type",
      params,
    }).then((res) => res.data);
  };

  const quotationRequestTypeGet = async (id: number) => {
    return request<QuotationRequestType>({
      url: `/quotation-request-type/${id}`,
    }).then((res) => res.data);
  };

  const quotationRequestTypeCreate = async (params: {
    data: QuotationRequestType;
  }) => {
    const { data } = params;
    return request<QuotationRequestType>({
      url: "/quotation-request-type",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const quotationRequestTypeDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/quotation-request-type",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const quotationRequestTypeUpdate = async (params: {
    id: number;
    data: QuotationRequestType;
  }) => {
    const { id, data } = params;
    return request<QuotationRequestType>({
      url: `/quotation-request-type/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    quotationRequestTypeCreate,
    quotationRequestTypeUpdate,
    quotationRequestTypeDelete,
    quotationRequestTypeList,
    quotationRequestTypeGet,
  };
}
