import { useDefaultMutation } from "@/hooks/use-default-mutation";
import { useQuery } from "@tanstack/react-query";
import { requests } from "./requests";

const scope = "setting-group";

export function useSettingGroupCreate() {
  const { settingGroupCreate } = requests();
  return useDefaultMutation(scope, "create", settingGroupCreate);
}

export function useSettingGroupDelete() {
  const { settingGroupDelete } = requests();
  return useDefaultMutation(scope, "delete", settingGroupDelete);
}

export function useSettingGroupUpdate() {
  const { settingGroupUpdate } = requests();
  return useDefaultMutation(scope, "update", settingGroupUpdate);
}

export function useSettingGroupGet(id: number) {
  const { settingGroupGet } = requests();
  return useQuery({
    queryKey: [scope, "get"],
    queryFn: () => settingGroupGet(id),
  });
}
