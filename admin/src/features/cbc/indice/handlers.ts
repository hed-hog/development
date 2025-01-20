import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "indice";

export function useIndiceCreate() {
  const { indiceCreate } = requests();
  return useDefaultMutation(scope, "create", indiceCreate);
}

export function useIndiceDelete() {
  const { indiceDelete } = requests();
  return useDefaultMutation(scope, "delete", indiceDelete);
}

export function useIndiceUpdate() {
  const { indiceUpdate } = requests();
  return useDefaultMutation(scope, "update", indiceUpdate);
}

export function useIndiceGet(id: number) {
  const { indiceGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => indiceGet(id),
  });
}
