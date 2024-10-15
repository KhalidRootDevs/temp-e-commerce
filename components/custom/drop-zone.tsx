import React, { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { Icons } from '../icons';

interface DropZoneProps {
  name: string;
  existingImage?: string | string[];
}

const DropZone: React.FC<DropZoneProps> = ({ name, existingImage }) => {
  const { setValue, watch } = useFormContext();
  const file = watch(name);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setValue(name, acceptedFiles[0]);
      }
    },
    [name, setValue]
  );

  useEffect(() => {
    if (existingImage) {
      const imageToSet = Array.isArray(existingImage)
        ? existingImage[0]
        : existingImage;
      setValue(name, imageToSet);
    }
  }, [existingImage, name, setValue]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    maxFiles: 1
  });

  const handleRemoveImage = () => {
    setValue(name, null);
  };

  const previewFile =
    file && typeof file === 'string' ? file : file && URL.createObjectURL(file);

  return (
    <div>
      <div
        {...getRootProps()}
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-50 p-6 text-gray-500 transition-all duration-200 ease-in-out hover:bg-gray-100"
      >
        <input {...getInputProps()} />
        <p className="text-center text-sm font-medium">
          Drag & drop an image here, or click to select an image
        </p>
      </div>

      {previewFile && (
        <div className="relative m-2 mt-4 h-24 w-24">
          <img
            src={previewFile}
            alt="Preview"
            className="h-full w-full rounded-md object-cover"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute right-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 p-1 text-white shadow-md transition-colors duration-200 hover:bg-red-700"
          >
            <Icons.close className="h-4 w-4" />
          </button>
          {typeof file === 'string' ? (
            <div className="absolute bottom-0 left-0 right-0 rounded-b-md bg-black bg-opacity-50 p-1 text-center text-xs text-white">
              Existing Image
            </div>
          ) : (
            <div className="absolute bottom-0 left-0 right-0 rounded-b-md bg-green-600 bg-opacity-75 p-1 text-center text-xs text-white">
              New Image
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropZone;
