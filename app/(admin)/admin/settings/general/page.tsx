import BreadCrumb from '@/components/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
import GeneralSettings from '../_components/GeneralSettings';

const breadcrumbItems = [
  { title: 'General Setting', link: '/admin/settings/general' }
];

export default function page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <GeneralSettings />
      </div>
    </ScrollArea>
  );
}
