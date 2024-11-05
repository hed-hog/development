import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "plan-duration";

export function usePlanDurationCreate() {
  const { planDurationCreate } = requests();
  return useDefaultMutation(scope, "create", planDurationCreate);
}

export function usePlanDurationDelete() {
  const { planDurationDelete } = requests();
  return useDefaultMutation(scope, "delete", planDurationDelete);
}

export function usePlanDurationUpdate() {
  const { planDurationUpdate } = requests();
  return useDefaultMutation(scope, "update", planDurationUpdate);
}

export function usePlanDurationGet(id: number) {
  const { planDurationGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => planDurationGet(id),
  });
}
