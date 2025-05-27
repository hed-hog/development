import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "instance";

export function useInstanceCreate() {
  const { instanceCreate } = requests();
  return useDefaultMutation(scope, "create", instanceCreate);
}

export function useInstanceDelete() {
  const { instanceDelete } = requests();
  return useDefaultMutation(scope, "delete", instanceDelete);
}

export function useInstanceUpdate() {
  const { instanceUpdate } = requests();
  return useDefaultMutation(scope, "update", instanceUpdate);
}

export function useInstanceGet(id: number) {
  const { instanceGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => instanceGet(id),
  });
}
