import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "rating";

export function useRatingCreate() {
  const { ratingCreate } = requests();
  return useDefaultMutation(scope, "create", ratingCreate);
}

export function useRatingDelete() {
  const { ratingDelete } = requests();
  return useDefaultMutation(scope, "delete", ratingDelete);
}

export function useRatingUpdate() {
  const { ratingUpdate } = requests();
  return useDefaultMutation(scope, "update", ratingUpdate);
}

export function useRatingGet(id: number) {
  const { ratingGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => ratingGet(id),
  });
}
