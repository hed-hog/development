import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Mail } from "@/types/models";
import { HttpMethod } from "@/types/http-method";
import { formatDataWithLocale } from "@hedhog/utils";

export function requests() {
  const { request } = useApp();

  const mailList = async (params: PaginationParams) => {
    return request<PaginationResult<Mail>>({
      url: "/mail",
      params,
    }).then((res) => res.data);
  };

  const mailGet = async (id: number) => {
    return request<Mail>({
      url: `/mail/${id}`,
    }).then((res) => res.data);
  };

  const mailCreate = async (params: { data: Mail }) => {
    const { data } = params;
    return request<Mail>({
      url: "/mail",
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  const mailDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/mail",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const mailUpdate = async (params: { id: number; data: Mail }) => {
    const { id, data } = params;
    return request<Mail>({
      url: `/mail/${id}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data);
  };

  return {
    mailCreate,
    mailUpdate,
    mailDelete,
    mailList,
    mailGet,
  };
}
