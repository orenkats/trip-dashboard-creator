import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageDropzoneProps {
  onImageUpload: (file: File) => void;
  currentImage?: string;
  onImageRemove?: () => void;
  className?: string;
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  onImageUpload,
  currentImage,
  onImageRemove,
  className
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1
  });

  return (
    <div className={cn("w-full", className)}>
      {currentImage ? (
        <div className="relative w-full h-48 group">
          <img
            src={currentImage}
            alt="Uploaded preview"
            className="w-full h-full object-cover rounded-lg"
          />
          {onImageRemove && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onImageRemove();
              }}
              className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
            isDragActive ? "border-primary bg-primary/10" : "border-gray-300 hover:border-primary",
            className
          )}
        >
          <input {...getInputProps()} />
          <Upload className="w-10 h-10 mx-auto mb-4 text-gray-400" />
          <p className="text-sm text-gray-600">
            {isDragActive ? (
              "Drop the image here"
            ) : (
              "Drag & drop an image here, or click to select"
            )}
          </p>
        </div>
      )}
    </div>
  );
};