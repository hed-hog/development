import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "instance-prop";

export function useInstancePropCreate() {
  const { instancePropCreate } = requests();
  return useDefaultMutation(scope, "create", instancePropCreate);
}

export function useInstancePropDelete() {
  const { instancePropDelete } = requests();
  return useDefaultMutation(scope, "delete", instancePropDelete);
}

export function useInstancePropUpdate() {
  const { instancePropUpdate } = requests();
  return useDefaultMutation(scope, "update", instancePropUpdate);
}

export function useInstancePropGet(id: number) {
  const { instancePropGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => instancePropGet(id),
  });
}
