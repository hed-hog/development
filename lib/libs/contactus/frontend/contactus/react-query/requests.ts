import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Contactus } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const contactusList = async (params: PaginationParams) => {
    return request<PaginationResult<Contactus>>({
      url: "/contactus",
      params,
    }).then((res) => res.data);
  };

  const contactusGet = async (id: number) => {
    return request<Contactus>({
      url: `/contactus/${id}`,
    }).then((res) => res.data);
  };

  const contactusCreate = async (data: Contactus) => {
    return request<Contactus>({
      url: "/contactus",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const contactusDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/contactus",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const contactusUpdate = async (params: { id: number; data: Contactus }) => {
    const { id, data } = params;
    return request<Contactus>({
      url: `/contactus/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    contactusCreate,
    contactusUpdate,
    contactusDelete,
    contactusList,
    contactusGet,
  };
}
