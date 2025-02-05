import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "notification";

export function useNotificationCreate() {
  const { notificationCreate } = requests();
  return useDefaultMutation(scope, "create", notificationCreate);
}

export function useNotificationDelete() {
  const { notificationDelete } = requests();
  return useDefaultMutation(scope, "delete", notificationDelete);
}

export function useNotificationUpdate() {
  const { notificationUpdate } = requests();
  return useDefaultMutation(scope, "update", notificationUpdate);
}

export function useNotificationGet(id: number) {
  const { notificationGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => notificationGet(id),
  });
}
