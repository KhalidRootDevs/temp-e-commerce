'use client';

import { useGetWebSettingsQuery } from '@/features/web/settings/settingsApi';

export default function TermsCondition() {
  const { data: settingsData, isLoading } = useGetWebSettingsQuery({
    select: 'terms,privacy'
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div
        className="terms-container text-white"
        dangerouslySetInnerHTML={{ __html: settingsData?.data?.terms }}
      ></div>
    </>
  );
}
