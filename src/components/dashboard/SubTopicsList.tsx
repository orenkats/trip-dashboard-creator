import React from 'react';
import { Button } from "@/components/ui/button";
import { SubTopic, SubTopicType } from './DashboardForm';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from 'lucide-react';
import { ImageDropzone } from './ImageDropzone';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

      <Tabs defaultValue={subTopics[0]?.id} className="w-full">
        <TabsList className="w-full justify-start mb-6 bg-dashboard-50 p-1 rounded-lg">
          {subTopics.map((subTopic) => (
            <TabsTrigger
              key={subTopic.id}
              value={subTopic.id}
              className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              {SUB_TOPIC_LABELS[subTopic.type]}
            </TabsTrigger>
          ))}
        </TabsList>

        {subTopics.map((subTopic) => (
          <TabsContent key={subTopic.id} value={subTopic.id} className="mt-6">
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-dashboard-700">
                {SUB_TOPIC_LABELS[subTopic.type]}
              </h3>

              <div className="grid gap-6">
                {subTopic.places.map((place) => (
                  <div 
                    key={place.id} 
                    className="p-6 bg-white rounded-xl border border-dashboard-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 space-y-4">
                        <Input
                          value={place.name}
                          onChange={(e) => updatePlace(subTopic.id, place.id, 'name', e.target.value)}
                          placeholder="Place name"
                          className="text-lg"
                        />
                        <Input
                          value={place.location}
                          onChange={(e) => updatePlace(subTopic.id, place.id, 'location', e.target.value)}
                          placeholder="Location"
                        />
                        <Textarea
                          value={place.notes}
                          onChange={(e) => updatePlace(subTopic.id, place.id, 'notes', e.target.value)}
                          placeholder="Notes about this place..."
                          className="min-h-[100px]"
                        />
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-dashboard-700">
                            Photos
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {place.photos.map((photo, index) => (
                              <ImageDropzone
                                key={index}
                                currentImage={photo}
                                onImageUpload={(file) => handlePlacePhotoUpload(subTopic.id, place.id, file)}
                                onImageRemove={() => removePlacePhoto(subTopic.id, place.id, index)}
                                className="h-32 w-full"
                              />
                            ))}
                            <ImageDropzone
                              onImageUpload={(file) => handlePlacePhotoUpload(subTopic.id, place.id, file)}
                              className="h-32 w-full"
                            />
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deletePlace(subTopic.id, place.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                onClick={() => addPlace(subTopic.id)}
                className="w-full border-dashed border-2 hover:border-purple-500 hover:text-purple-600 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Place to {SUB_TOPIC_LABELS[subTopic.type]}
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
