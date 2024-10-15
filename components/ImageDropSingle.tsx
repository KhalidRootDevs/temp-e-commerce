import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Icons } from './icons';

const ImageDropSingle = ({ className, value, onChange }: any) => {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      if (acceptedFiles?.length) {
        const file = acceptedFiles[0];
        const fileWithPreview = Object.assign(file, {
          preview: URL.createObjectURL(file)
        });
        setPreview(fileWithPreview.preview);
        onChange(fileWithPreview);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxSize: 1024 * 1000,
    onDrop
  });

  useEffect(() => {
    // Revoke the data uri to avoid memory leaks
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const removeFile = () => {
    setPreview(null);
    onChange(null);
  };

  return (
    <>
      <div
        {...getRootProps({
          className: className
        })}
      >
        {value && preview ? (
          <div className="flex items-center gap-3">
            <img
              src={preview}
              alt="Uploaded Image"
              className="h-24 w-24 rounded-md border border-gray-200 object-contain p-1"
            />
            {value && value.name && (
              <p className="mt-2 text-[14px] font-bold text-gray-800">
                {value.name}
              </p>
            )}
            <button
              type="button"
              className="rounded bg-red-500 p-1"
              onClick={removeFile}
            >
              <Icons.trash className="hover:fill-secondary-400 h-5 w-5 fill-white transition-colors" />
            </button>
          </div>
        ) : (
          <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-green-50 p-2">
            <input {...getInputProps()} />

            <div className="flex flex-col items-center">
              <p className="font-bold text-gray-600">Drag & Drop Image here</p>
              <div className="divider">OR</div>
              <button type="button" className="btn btn-primary btn-sm rounded">
                Browse File
              </button>
              <p className="mt-3 text-xs text-orange-400">Maximum Size: 1MB</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageDropSingle;
