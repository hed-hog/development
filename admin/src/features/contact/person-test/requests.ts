import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { PersonTest } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const personTestList = async (params: PaginationParams) => {
    return request<PaginationResult<PersonTest>>({
      url: "/person-test",
      params,
    }).then((res) => res.data);
  };

  const personTestGet = async (id: number) => {
    return request<PersonTest>({
      url: `/person-test/${id}`,
    }).then((res) => res.data);
  };

  const personTestCreate = async (data: PersonTest) => {
    return request<PersonTest>({
      url: "/person-test",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const personTestDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/person-test",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const personTestUpdate = async (params: { id: number; data: PersonTest }) => {
    const { id, data } = params;
    return request<PersonTest>({
      url: `/person-test/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    personTestCreate,
    personTestUpdate,
    personTestDelete,
    personTestList,
    personTestGet,
  };
}
