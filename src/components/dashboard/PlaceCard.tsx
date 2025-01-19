import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
import { ImageDropzone } from './ImageDropzone';
import { Place } from './types';
import styles from './styles/dashboard.module.css';

interface PlaceCardProps {
  place: Place;
  onUpdate: (field: keyof Omit<Place, 'id' | 'photos'>, value: string) => void;
  onPhotoUpload: (file: File) => void;
  onPhotoRemove: (photoIndex: number) => void;
  onDelete: () => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  onUpdate,
  onPhotoUpload,
  onPhotoRemove,
  onDelete,
}) => {
  return (
    <div className={styles.placeCard}>
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 space-y-3">
          <Input
            value={place.name}
            onChange={(e) => onUpdate('name', e.target.value)}
            placeholder="Place name"
            className="text-lg"
          />
          <Input
            value={place.location}
            onChange={(e) => onUpdate('location', e.target.value)}
            placeholder="Location"
          />
          <Textarea
            value={place.notes}
            onChange={(e) => onUpdate('notes', e.target.value)}
            placeholder="Notes about this place..."
            className="min-h-[100px]"
          />
          <div className="space-y-2">
            <label className={styles.label}>Photos</label>
            <div className={styles.photoGrid}>
              {place.photos.map((photo, index) => (
                <ImageDropzone
                  key={index}
                  currentImage={photo}
                  onImageUpload={onPhotoUpload}
                  onImageRemove={() => onPhotoRemove(index)}
                  className="h-24"
                />
              ))}
              <ImageDropzone
                onImageUpload={onPhotoUpload}
                className="h-24"
              />
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className={styles.deleteButton}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};