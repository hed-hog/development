import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "gainer-loser";

export function useGainerLoserCreate() {
  const { gainerLoserCreate } = requests();
  return useDefaultMutation(scope, "create", gainerLoserCreate);
}

export function useGainerLoserDelete() {
  const { gainerLoserDelete } = requests();
  return useDefaultMutation(scope, "delete", gainerLoserDelete);
}

export function useGainerLoserUpdate() {
  const { gainerLoserUpdate } = requests();
  return useDefaultMutation(scope, "update", gainerLoserUpdate);
}

export function useGainerLoserGet(id: number) {
  const { gainerLoserGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => gainerLoserGet(id),
  });
}
