'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import { useCategoryDeleteApiMutation } from '@/features/admin/category/categoryApi';

import { Product } from '@/types';
import { Edit, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CellActionProps {
  data: Product;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const [deleteApi] = useCategoryDeleteApiMutation();

  const onDelete = async () => {
    setLoading(true);
    deleteApi(data.id)
      .then((res: any) => {
        if (res?.data?.status) {
          setOpen(false);
          setLoading(false);
          toast({
            description: `Category ${data?.name} has been deleted.`
          });
        } else {
          setLoading(false);
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'There was a problem with your delete request.',
            action: (
              <ToastAction onClick={onDelete} altText="Try again">
                Try again
              </ToastAction>
            )
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  const onConfirm = async () => {
    try {
      onDelete();
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />

      <TooltipProvider>
        <div className="flex items-center justify-center gap-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                onClick={() => router.push(`/admin/category/update/${data.id}`)}
                variant="outline"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Update</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" onClick={() => setOpen(true)} variant="outline">
                {' '}
                <Trash className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </>
  );
};
