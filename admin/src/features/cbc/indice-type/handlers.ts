import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "indice-type";

export function useIndiceTypeCreate() {
  const { indiceTypeCreate } = requests();
  return useDefaultMutation(scope, "create", indiceTypeCreate);
}

export function useIndiceTypeDelete() {
  const { indiceTypeDelete } = requests();
  return useDefaultMutation(scope, "delete", indiceTypeDelete);
}

export function useIndiceTypeUpdate() {
  const { indiceTypeUpdate } = requests();
  return useDefaultMutation(scope, "update", indiceTypeUpdate);
}

export function useIndiceTypeGet(id: number) {
  const { indiceTypeGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => indiceTypeGet(id),
  });
}
