import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "dashboard-component";

export function useDashboardComponentCreate() {
  const { dashboardComponentCreate } = requests();
  return useDefaultMutation(scope, "create", dashboardComponentCreate);
}

export function useDashboardComponentDelete() {
  const { dashboardComponentDelete } = requests();
  return useDefaultMutation(scope, "delete", dashboardComponentDelete);
}

export function useDashboardComponentUpdate() {
  const { dashboardComponentUpdate } = requests();
  return useDefaultMutation(scope, "update", dashboardComponentUpdate);
}

export function useDashboardComponentGet(id: number) {
  const { dashboardComponentGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => dashboardComponentGet(id),
  });
}
