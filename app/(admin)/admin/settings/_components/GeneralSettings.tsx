'use client';

import { GeneralSettingsForm } from '@/components/forms/general-settings-form';
import LoadingPage from '@/components/loading';
import { useGetSettingsQuery } from '@/features/admin/settings/settingsApi';

export default function GeneralSettings() {
  const { isLoading, data: settings } = useGetSettingsQuery({});

  if (isLoading) return <LoadingPage />;

  return (
    <>
      <GeneralSettingsForm initialData={settings?.data} />
    </>
  );
}
