'use client';

import { useSystem } from '@/components/provider/system-provider';
import { useQuery } from '@tanstack/react-query';

export default function Page({ params }: { params: { slug: string } }) {
  console.log('Settings Page', params);

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
    <>
      <ul>
        {(settings?.data ?? []).map((item) => (
          <li>{item.name}</li>
        ))}
      </ul>
    </>
  );
}
