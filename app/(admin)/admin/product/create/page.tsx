import BreadCrumb from '@/components/breadcrumb';
import CreateProduct from '../_components/CreateProduct';

const breadcrumbItems = [
  { title: 'Product', link: '/admin/product' },
  { title: 'Create', link: '/admin/product/create' }
];

export default function page() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <CreateProduct />
    </div>
  );
}
