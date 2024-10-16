'use client';

import { useGetWebSettingsQuery } from '@/features/web/settings/settingsApi';

export default function PrivacyPolicy() {
  const { data: settingsData, isLoading } = useGetWebSettingsQuery({
    select: 'privacy'
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: settingsData?.data?.privacy }}
      ></div>
    </>
  );
}
