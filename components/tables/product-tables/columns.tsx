'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Product } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Product>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'image',
    header: 'IMAGE',
    cell: ({ row }) => (
      <Image
        width={0}
        height={0}
        sizes='100vh'
        src={row.original?.image}
        alt={row.original?.name}
        className="aspect-video h-10 w-fit rounded object-cover"
      />
    )
  },
  {
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'price',
    header: 'PRICE'
  },
  {
    accessorKey: 'quantity',
    header: 'QUANTITY'
  },
  {
    accessorKey: 'category.name',
    header: 'CATEGORY'
  },
  {
    accessorKey: 'status',
    header: 'STATUS',
    cell: ({ row }) => (
      <span
        className={`${
          row.original.status ? 'text-green-500' : 'text-red-500'
        } rounded-full border px-2 py-0.5 shadow`}
      >
        {row.original.status ? 'Active' : 'Inactive'}
      </span>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
