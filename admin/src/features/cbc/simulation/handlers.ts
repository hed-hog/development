import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "simulation";

export function useSimulationCreate() {
  const { simulationCreate } = requests();
  return useDefaultMutation(scope, "create", simulationCreate);
}

export function useSimulationDelete() {
  const { simulationDelete } = requests();
  return useDefaultMutation(scope, "delete", simulationDelete);
}

export function useSimulationUpdate() {
  const { simulationUpdate } = requests();
  return useDefaultMutation(scope, "update", simulationUpdate);
}

export function useSimulationGet(id: number) {
  const { simulationGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => simulationGet(id),
  });
}
