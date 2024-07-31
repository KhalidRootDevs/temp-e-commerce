import BreadCrumb from '@/components/breadcrumb';
import UpdateCategory from '../../_components/UpdateCategory';

const breadcrumbItems = [
  { title: 'Category', link: '/admin/category' },
  { title: 'Update', link: '/admin/category/update' }
];

export default function page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
      <UpdateCategory id={id} />
    </div>
  );
}
