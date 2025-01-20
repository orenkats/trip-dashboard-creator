import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2, MapPin, Camera } from 'lucide-react';
import { ImageDropzone } from './ImageDropzone';
import { Place } from './types';
import styles from './styles/dashboard.module.css';
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
    <Card className="w-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-[#fd1d1d]" />
          <Input
            value={place.name}
            onChange={(e) => onUpdate('name', e.target.value)}
            placeholder="Name this spot"
            className="text-lg font-semibold border-none focus:ring-0 p-0 h-auto"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <Input
            value={place.location}
            onChange={(e) => onUpdate('location', e.target.value)}
            placeholder="Add the exact location"
            className="flex-1"
          />
        </div>
        
        <Textarea
          value={place.notes}
          onChange={(e) => onUpdate('notes', e.target.value)}
          placeholder="Share your experience, tips, and recommendations about this spot..."
          className="min-h-[100px] resize-none"
        />
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Photos
            </label>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {place.photos.map((photo, index) => (
              <ImageDropzone
                key={index}
                currentImage={photo}
                onImageUpload={onPhotoUpload}
                onImageRemove={() => onPhotoRemove(index)}
                className="aspect-square"
              />
            ))}
            <ImageDropzone
              onImageUpload={onPhotoUpload}
              className="aspect-square bg-gray-50 hover:bg-gray-100 transition-colors"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};