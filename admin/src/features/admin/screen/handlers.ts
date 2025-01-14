import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "screen";

export function useScreenCreate() {
  const { screenCreate } = requests();
  return useDefaultMutation(scope, "create", screenCreate);
}

export function useScreenDelete() {
  const { screenDelete } = requests();
  return useDefaultMutation(scope, "delete", screenDelete);
}

export function useScreenUpdate() {
  const { screenUpdate } = requests();
  return useDefaultMutation(scope, "update", screenUpdate);
}

export function useScreenGet(id: number) {
  const { screenGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => screenGet(id),
  });
}
