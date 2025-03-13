import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "component";

export function useComponentCreate() {
  const { componentCreate } = requests();
  return useDefaultMutation(scope, "create", componentCreate);
}

export function useComponentDelete() {
  const { componentDelete } = requests();
  return useDefaultMutation(scope, "delete", componentDelete);
}

export function useComponentUpdate() {
  const { componentUpdate } = requests();
  return useDefaultMutation(scope, "update", componentUpdate);
}

export function useComponentGet(id: number) {
  const { componentGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => componentGet(id),
  });
}
