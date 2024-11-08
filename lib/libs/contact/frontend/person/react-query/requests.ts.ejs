import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Person } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const personList = async (params: PaginationParams) => {
    return request<PaginationResult<Person>>({
      url: "/person",
      params,
    }).then((res) => res.data);
  };

  const personGet = async (id: number) => {
    return request<Person>({
      url: `/person/${id}`,
    }).then((res) => res.data);
  };

  const personCreate = async (data: Person) => {
    return request<Person>({
      url: "/person",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const personDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/person",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const personUpdate = async (params: { id: number; data: Person }) => {
    const { id, data } = params;
    return request<Person>({
      url: `/person/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    personCreate,
    personUpdate,
    personDelete,
    personList,
    personGet,
  };
}
