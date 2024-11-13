import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "setting";

export function useSettingCreate() {
  const { settingCreate } = requests();
  return useDefaultMutation(scope, "create", settingCreate);
}

export function useSettingDelete() {
  const { settingDelete } = requests();
  return useDefaultMutation(scope, "delete", settingDelete);
}

export function useSettingUpdate() {
  const { settingUpdate } = requests();
  return useDefaultMutation(scope, "update", settingUpdate);
}

export function useSettingGet(id: number) {
  const { settingGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => settingGet(id),
  });
}
