'use client';

import { useGetWebSettingsQuery } from '@/features/web/settings/settingsApi';

export default function TermsCondition() {
  const { data: settingsData, isLoading } = useGetWebSettingsQuery({
    select: 'terms'
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: settingsData?.data?.terms }}
      ></div>
    </>
  );
}
