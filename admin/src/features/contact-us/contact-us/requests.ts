import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { ContactUs } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const contactUsList = async (params: PaginationParams) => {
    return request<PaginationResult<ContactUs>>({
      url: "/contact-us",
      params,
    }).then((res) => res.data);
  };

  const contactUsGet = async (id: number) => {
    return request<ContactUs>({
      url: `/contact-us/${id}`,
    }).then((res) => res.data);
  };

  const contactUsCreate = async (params: { data: ContactUs }) => {
    const { data } = params;
    return request<ContactUs>({
      url: "/contact-us",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const contactUsDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/contact-us",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const contactUsUpdate = async (params: { id: number; data: ContactUs }) => {
    const { id, data } = params;
    return request<ContactUs>({
      url: `/contact-us/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    contactUsCreate,
    contactUsUpdate,
    contactUsDelete,
    contactUsList,
    contactUsGet,
  };
}
