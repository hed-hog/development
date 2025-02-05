import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "event-type";

export function useEventTypeCreate() {
  const { eventTypeCreate } = requests();
  return useDefaultMutation(scope, "create", eventTypeCreate);
}

export function useEventTypeDelete() {
  const { eventTypeDelete } = requests();
  return useDefaultMutation(scope, "delete", eventTypeDelete);
}

export function useEventTypeUpdate() {
  const { eventTypeUpdate } = requests();
  return useDefaultMutation(scope, "update", eventTypeUpdate);
}

export function useEventTypeGet(id: number) {
  const { eventTypeGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => eventTypeGet(id),
  });
}
