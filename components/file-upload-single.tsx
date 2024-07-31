'use client';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import { UploadDropzone } from '@uploadthing/react';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { UploadFileResponse } from 'uploadthing/client';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

interface ImageUploadProps {
  onChange?: (value: string) => void;
  onRemove: () => void;
  value: string;
}

export default function FileUploadSingle({
  onChange,
  onRemove,
  value: initialValue
}: ImageUploadProps) {
  const { toast } = useToast();
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onDeleteFile = () => {
    setValue('');
    onRemove();
  };

  const onUpdateFile = (newFiles: UploadFileResponse[]) => {
    if (newFiles.length > 0) {
      const newValue = newFiles[0].url;
      setValue(newValue);
      onChange && onChange(newValue);
    }
  };

  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        {value && (
          <div className="relative h-[200px] w-[200px] overflow-hidden rounded-md">
            <div className="absolute right-2 top-2 z-10">
              <Button
                type="button"
                onClick={onDeleteFile}
                variant="destructive"
                size="sm"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <Image fill className="object-cover" alt="Image" src={value} />
            </div>
          </div>
        )}
      </div>
      <div>
        {!value && (
          <UploadDropzone<OurFileRouter>
            className="ut-label:text-sm ut-allowed-content:ut-uploading:text-red-300 py-2 dark:bg-zinc-800"
            endpoint="imageUploader"
            config={{ mode: 'auto' }}
            content={{
              allowedContent({ isUploading }) {
                if (isUploading) {
                  return (
                    <>
                      <p className="mt-2 animate-pulse text-sm text-slate-400">
                        Img Uploading...
                      </p>
                    </>
                  );
                }
              }
            }}
            onClientUploadComplete={(res) => {
              const data: UploadFileResponse[] | undefined = res;
              if (data) {
                onUpdateFile(data);
              }
            }}
            onUploadError={(error: Error) => {
              toast({
                title: 'Error',
                variant: 'destructive',
                description: error.message
              });
            }}
            onUploadBegin={() => {
              // Do something once upload begins
            }}
          />
        )}
      </div>
    </>
  );
}
