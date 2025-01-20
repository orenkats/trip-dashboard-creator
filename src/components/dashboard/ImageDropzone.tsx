import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImagePlus, X } from 'lucide-react';
import { cn } from "../../lib/utils";

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
        <div className="relative w-full h-full group">
          <img
            src={currentImage}
            alt="Uploaded preview"
            className="w-full h-full object-cover rounded-xl"
          />
          {onImageRemove && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onImageRemove();
              }}
              className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all h-full flex flex-col items-center justify-center",
            isDragActive ? "border-[#fd1d1d] bg-red-50/5" : "border-gray-200 hover:border-[#fd1d1d] hover:bg-gray-50/50",
            className
          )}
        >
          <input {...getInputProps()} />
          <ImagePlus className="w-8 h-8 mb-2 text-gray-400" />
          <p className="text-sm text-gray-500">
            {isDragActive ? (
              "Drop your photo here..."
            ) : (
              "Upload a photo, or drag and drop"
            )}
          </p>
        </div>
      )}
    </div>
  );
};
