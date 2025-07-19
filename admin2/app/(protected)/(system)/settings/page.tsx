'use client';

import { useSystem } from '@/components/provider/system-provider';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import {
  SettingGroup,
  SettingItem,
  SettingsSection,
} from './components/settings-section';

export default function SettingsPage({ params }: { params: { slug: string } }) {
  const { request, token } = useSystem();
  const { data: settings } = useQuery<{ data: any[] }>({
    queryKey: ['settings-group', params.slug],
    queryFn: () =>
      request({
        url: `/setting/group/${params.slug}`,
      }),
    enabled: token !== null,
  });

  return (
    <SettingsSection
      title="Tema e Aparência"
      description="Personalize a aparência visual da interface"
    >
      {(settings?.data ?? []).map((group) => (
        <SettingGroup>
          <SettingItem title={group.name} description={group.description}>
            <Input
              value={group.setting_group.value}
              placeholder="https://api.exemplo.com/webhook"
              className="w-[300px]"
            />
          </SettingItem>
        </SettingGroup>
      ))}
    </SettingsSection>
  );
}
