import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { DiscountType } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const discountTypeList = async (params: PaginationParams) => {
    return request<PaginationResult<DiscountType>>({
      url: "/discount-type",
      params,
    }).then((res) => res.data);
  };

  const discountTypeGet = async (id: number) => {
    return request<DiscountType>({
      url: `/discount-type/${id}`,
    }).then((res) => res.data);
  };

  const discountTypeCreate = async (params: { data: DiscountType }) => {
    const { data } = params;
    return request<DiscountType>({
      url: "/discount-type",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const discountTypeDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/discount-type",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const discountTypeUpdate = async (params: {
    id: number;
    data: DiscountType;
  }) => {
    const { id, data } = params;
    return request<DiscountType>({
      url: `/discount-type/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    discountTypeCreate,
    discountTypeUpdate,
    discountTypeDelete,
    discountTypeList,
    discountTypeGet,
  };
}
