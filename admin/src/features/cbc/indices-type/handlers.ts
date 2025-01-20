import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "indices-type";

export function useIndicesTypeCreate() {
  const { indicesTypeCreate } = requests();
  return useDefaultMutation(scope, "create", indicesTypeCreate);
}

export function useIndicesTypeDelete() {
  const { indicesTypeDelete } = requests();
  return useDefaultMutation(scope, "delete", indicesTypeDelete);
}

export function useIndicesTypeUpdate() {
  const { indicesTypeUpdate } = requests();
  return useDefaultMutation(scope, "update", indicesTypeUpdate);
}

export function useIndicesTypeGet(id: number) {
  const { indicesTypeGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => indicesTypeGet(id),
  });
}
