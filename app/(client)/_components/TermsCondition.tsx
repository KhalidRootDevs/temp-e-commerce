'use client';

import { useGetSettingsQuery } from '@/features/admin/settings/settingsApi';

export default function TermsCondition() {
  const { isLoading, data: settings } = useGetSettingsQuery({});

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: settings?.data?.terms }}></div>
    </>
  );
}
