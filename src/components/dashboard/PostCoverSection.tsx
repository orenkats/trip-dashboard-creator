import { MapPin } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface PostCoverSectionProps {
  coverPhoto: string;
  description: string;
  location: string;
  isEditing: boolean;
  editedDescription: string;
  editedLocation: string;
  onEditedDescriptionChange: (value: string) => void;
  onEditedLocationChange: (value: string) => void;
}

export const PostCoverSection = ({
  coverPhoto,
  description,
  location,
  isEditing,
  editedDescription,
  editedLocation,
  onEditedDescriptionChange,
  onEditedLocationChange,
}: PostCoverSectionProps) => {
  return (
    <div className="aspect-[21/9] relative rounded-xl overflow-hidden mb-6">
      <img 
        src={coverPhoto} 
        alt="Cover"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        {isEditing ? (
          <div className="space-y-2">
            <Textarea
              value={editedDescription}
              onChange={(e) => onEditedDescriptionChange(e.target.value)}
              className="text-black mb-2"
              rows={3}
            />
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <Input
                value={editedLocation}
                onChange={(e) => onEditedLocationChange(e.target.value)}
                className="text-black"
              />
            </div>
          </div>
        ) : (
          <>
            <p className="text-lg mb-2">{description}</p>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              {location}
            </div>
          </>
        )}
      </div>
    </div>
  );
};