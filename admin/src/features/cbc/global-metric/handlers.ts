import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "global-metric";

export function useGlobalMetricCreate() {
  const { globalMetricCreate } = requests();
  return useDefaultMutation(scope, "create", globalMetricCreate);
}

export function useGlobalMetricDelete() {
  const { globalMetricDelete } = requests();
  return useDefaultMutation(scope, "delete", globalMetricDelete);
}

export function useGlobalMetricUpdate() {
  const { globalMetricUpdate } = requests();
  return useDefaultMutation(scope, "update", globalMetricUpdate);
}

export function useGlobalMetricGet(id: number) {
  const { globalMetricGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => globalMetricGet(id),
  });
}
