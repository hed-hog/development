import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "event";

export function useEventCreate() {
  const { eventCreate } = requests();
  return useDefaultMutation(scope, "create", eventCreate);
}

export function useEventDelete() {
  const { eventDelete } = requests();
  return useDefaultMutation(scope, "delete", eventDelete);
}

export function useEventUpdate() {
  const { eventUpdate } = requests();
  return useDefaultMutation(scope, "update", eventUpdate);
}

export function useEventGet(id: number) {
  const { eventGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => eventGet(id),
  });
}
