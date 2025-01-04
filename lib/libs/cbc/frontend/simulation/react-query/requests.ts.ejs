import { useApp } from "@/hooks/use-app";
import { Delete, PaginationParams, PaginationResult } from "@/types";
import { Simulation } from "@/types/models";
import { HttpMethod } from "@/types/http-method";

export function requests() {
  const { request } = useApp();

  const simulationList = async (params: PaginationParams) => {
    return request<PaginationResult<Simulation>>({
      url: "/simulation",
      params,
    }).then((res) => res.data);
  };

  const simulationGet = async (id: number) => {
    return request<Simulation>({
      url: `/simulation/${id}`,
    }).then((res) => res.data);
  };

  const simulationCreate = async (params: { data: Simulation }) => {
    const { data } = params;
    return request<Simulation>({
      url: "/simulation",
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data);
  };

  const simulationDelete = async (ids: number[]) => {
    return request<Delete>({
      url: "/simulation",
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data);
  };

  const simulationUpdate = async (params: { id: number; data: Simulation }) => {
    const { id, data } = params;
    return request<Simulation>({
      url: `/simulation/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data);
  };

  return {
    simulationCreate,
    simulationUpdate,
    simulationDelete,
    simulationList,
    simulationGet,
  };
}
