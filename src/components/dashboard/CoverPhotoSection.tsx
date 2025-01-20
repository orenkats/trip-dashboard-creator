import React from 'react';
import { ImageDropzone } from './ImageDropzone';
import styles from './styles/dashboard.module.css';
import { toast } from 'sonner';

interface CoverPhotoSectionProps {
  coverPhoto?: string;
  onCoverPhotoChange: (photo?: string) => void;
}

const CoverPhotoSection: React.FC<CoverPhotoSectionProps> = ({ coverPhoto, onCoverPhotoChange }) => {
  const handleCoverPhotoUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    onCoverPhotoChange(imageUrl);
    toast.success("Photo uploaded successfully!");
  };

  const handleRemoveCoverPhoto = () => {
    onCoverPhotoChange(undefined);
    toast.success("Photo removed");
  };

  return (
    <div className="mb-6">
      <label className={styles.label}>Cover Photo</label>
      <ImageDropzone
        onImageUpload={handleCoverPhotoUpload}
        currentImage={coverPhoto}
        onImageRemove={handleRemoveCoverPhoto}
        className="w-full aspect-[16/9]"
      />
    </div>
  );
};

export default CoverPhotoSection;