import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "component-prop";

export function useComponentPropCreate() {
  const { componentPropCreate } = requests();
  return useDefaultMutation(scope, "create", componentPropCreate);
}

export function useComponentPropDelete() {
  const { componentPropDelete } = requests();
  return useDefaultMutation(scope, "delete", componentPropDelete);
}

export function useComponentPropUpdate() {
  const { componentPropUpdate } = requests();
  return useDefaultMutation(scope, "update", componentPropUpdate);
}

export function useComponentPropGet(id: number) {
  const { componentPropGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => componentPropGet(id),
  });
}
