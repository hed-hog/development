import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "dashboard-item";

export function useDashboardItemCreate() {
  const { dashboardItemCreate } = requests();
  return useDefaultMutation(scope, "create", dashboardItemCreate);
}

export function useDashboardItemDelete() {
  const { dashboardItemDelete } = requests();
  return useDefaultMutation(scope, "delete", dashboardItemDelete);
}

export function useDashboardItemUpdate() {
  const { dashboardItemUpdate } = requests();
  return useDefaultMutation(scope, "update", dashboardItemUpdate);
}

export function useDashboardItemGet(id: number) {
  const { dashboardItemGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => dashboardItemGet(id),
  });
}
