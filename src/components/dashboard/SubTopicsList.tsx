import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaceCard } from './PlaceCard';
import { SubTopic, SubTopicType } from './types';
import styles from './styles/dashboard.module.css';

interface SubTopicsListProps {
  subTopics: SubTopic[];
  setSubTopics: React.Dispatch<React.SetStateAction<SubTopic[]>>;
}

const SUB_TOPIC_LABELS: Record<SubTopicType, string> = {
  restaurants: 'Restaurants',
  attractions: 'Attractions',
  neighborhoods: 'Neighborhoods',
  shopping: 'Shopping',
};

export const SubTopicsList: React.FC<SubTopicsListProps> = ({ subTopics, setSubTopics }) => {
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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-dashboard-800 border-b pb-2">Categories</h2>

      <Tabs defaultValue={subTopics[0].id} className="w-full">
        <TabsList className={styles.tabsList}>
          {subTopics.map((subTopic) => (
            <TabsTrigger 
              key={subTopic.id} 
              value={subTopic.id}
              className={styles.tabTrigger}
            >
              {SUB_TOPIC_LABELS[subTopic.type]}
            </TabsTrigger>
          ))}
        </TabsList>

        {subTopics.map((subTopic) => (
          <TabsContent key={subTopic.id} value={subTopic.id} className="space-y-4">
            <div className="grid gap-4">
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
              className={styles.addButton}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Place
            </Button>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};