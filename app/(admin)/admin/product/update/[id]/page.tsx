import BreadCrumb from '@/components/breadcrumb';
import UpdateProduct from '../../_components/UpdateProduct';

const breadcrumbItems = [
  { title: 'Product', link: '/admin/product' },
  { title: 'Update', link: '/admin/product/update' }
];

export default function page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />
      <UpdateProduct id={id} />
    </div>
  );
}
