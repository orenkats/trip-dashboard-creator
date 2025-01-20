import React from 'react';
import { Button } from "../ui/button";
import { Plus, MapPin, Compass, Utensils, Landmark } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PlaceCard } from './PlaceCard';
import { SubTopic, SubTopicType } from './types';
import styles from './styles/dashboard.module.css';

interface SubTopicsListProps {
  subTopics: SubTopic[];
  setSubTopics: React.Dispatch<React.SetStateAction<SubTopic[]>>;
}

const getSubTopicIcon = (type: SubTopicType) => {
  switch (type) {
    case 'Restaurants':
      return <Utensils className="w-4 h-4" />;
    case 'Spots':
      return <Compass className="w-4 h-4" />;
    case 'Culture':
      return <Landmark className="w-4 h-4" />;
    default:
      return <MapPin className="w-4 h-4" />;
  }
};

export const SubTopicsList: React.FC<SubTopicsListProps> = ({ 
  subTopics, 
  setSubTopics,
}) => {
  const addPlace = (subTopicId: string) => {
    setSubTopics(subTopics.map(st => {
      if (st.id === subTopicId) {
        return {
          ...st,
          places: [...st.places, {
            id: Date.now().toString(),
            name: '',
            location: '',
            notes: '',
            photos: [],
          }],
        };
      }
      return st;
    }));
  };

  const updatePlace = (
    subTopicId: string,
    placeId: string,
    field: keyof Omit<SubTopic['places'][0], 'id' | 'photos'>,
    value: string
  ) => {
    setSubTopics(subTopics.map(st => {
      if (st.id === subTopicId) {
        return {
          ...st,
          places: st.places.map(p => 
            p.id === placeId ? { ...p, [field]: value } : p
          ),
        };
      }
      return st;
    }));
  };

  const handlePlacePhotoUpload = (subTopicId: string, placeId: string, file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setSubTopics(subTopics.map(st => {
      if (st.id === subTopicId) {
        return {
          ...st,
          places: st.places.map(p => 
            p.id === placeId ? { ...p, photos: [...p.photos, imageUrl] } : p
          ),
        };
      }
      return st;
    }));
    toast.success("Photo uploaded successfully!");
  };

  const removePlacePhoto = (subTopicId: string, placeId: string, photoIndex: number) => {
    setSubTopics(subTopics.map(st => {
      if (st.id === subTopicId) {
        return {
          ...st,
          places: st.places.map(p => {
            if (p.id === placeId) {
              const newPhotos = [...p.photos];
              newPhotos.splice(photoIndex, 1);
              return { ...p, photos: newPhotos };
            }
            return p;
          }),
        };
      }
      return st;
    }));
    toast.success("Photo removed");
  };

  const deletePlace = (subTopicId: string, placeId: string) => {
    setSubTopics(subTopics.map(st => {
      if (st.id === subTopicId) {
        return {
          ...st,
          places: st.places.filter(p => p.id !== placeId),
        };
      }
      return st;
    }));
  };

  if (subTopics.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
        <MapPin className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600 mb-4">Start creating your travel guide!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue={subTopics[0].id} className="w-full">
        <TabsList className="bg-gray-100/50 p-1 rounded-xl flex overflow-x-auto hide-scrollbar">
          {subTopics.map((subTopic) => (
            <TabsTrigger 
              key={subTopic.id} 
              value={subTopic.id}
              className="flex-shrink-0 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all"
            >
              <div className="flex items-center gap-2">
                {getSubTopicIcon(subTopic.type)}
                <span>{subTopic.type}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {subTopics.map((subTopic) => (
          <TabsContent key={subTopic.id} value={subTopic.id} className="space-y-4 mt-6">
            <div className="grid gap-6">
              {subTopic.places.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  onUpdate={(field, value) => updatePlace(subTopic.id, place.id, field, value)}
                  onPhotoUpload={(file) => handlePlacePhotoUpload(subTopic.id, place.id, file)}
                  onPhotoRemove={(photoIndex) => removePlacePhoto(subTopic.id, place.id, photoIndex)}
                  onDelete={() => deletePlace(subTopic.id, place.id)}
                />
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => addPlace(subTopic.id)}
              className="w-full py-6 border-dashed border-2 hover:border-[#fd1d1d] hover:text-[#fd1d1d] transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add {subTopic.type.slice(0, -1)}
            </Button>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};