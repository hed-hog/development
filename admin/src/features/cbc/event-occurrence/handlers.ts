import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "event-occurrence";

export function useEventOccurrenceCreate() {
  const { eventOccurrenceCreate } = requests();
  return useDefaultMutation(scope, "create", eventOccurrenceCreate);
}

export function useEventOccurrenceDelete() {
  const { eventOccurrenceDelete } = requests();
  return useDefaultMutation(scope, "delete", eventOccurrenceDelete);
}

export function useEventOccurrenceUpdate() {
  const { eventOccurrenceUpdate } = requests();
  return useDefaultMutation(scope, "update", eventOccurrenceUpdate);
}

export function useEventOccurrenceGet(id: number) {
  const { eventOccurrenceGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => eventOccurrenceGet(id),
  });
}
