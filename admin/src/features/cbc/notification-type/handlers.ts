import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "notification-type";

export function useNotificationTypeCreate() {
  const { notificationTypeCreate } = requests();
  return useDefaultMutation(scope, "create", notificationTypeCreate);
}

export function useNotificationTypeDelete() {
  const { notificationTypeDelete } = requests();
  return useDefaultMutation(scope, "delete", notificationTypeDelete);
}

export function useNotificationTypeUpdate() {
  const { notificationTypeUpdate } = requests();
  return useDefaultMutation(scope, "update", notificationTypeUpdate);
}

export function useNotificationTypeGet(id: number) {
  const { notificationTypeGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => notificationTypeGet(id),
  });
}
