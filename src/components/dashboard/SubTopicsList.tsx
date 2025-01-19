import React from 'react';
import { Button } from "@/components/ui/button";
import { SubTopic } from './DashboardForm';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from 'lucide-react';
import { ImageDropzone } from './ImageDropzone';
import { toast } from 'sonner';

interface SubTopicsListProps {
  subTopics: SubTopic[];
  setSubTopics: React.Dispatch<React.SetStateAction<SubTopic[]>>;
}

export const SubTopicsList: React.FC<SubTopicsListProps> = ({ subTopics, setSubTopics }) => {
  const addSubTopic = () => {
    const newSubTopic: SubTopic = {
      id: Date.now().toString(),
      title: '',
      places: [],
    };
    setSubTopics([...subTopics, newSubTopic]);
  };

  const updateSubTopicTitle = (id: string, title: string) => {
    setSubTopics(subTopics.map(st => 
      st.id === id ? { ...st, title } : st
    ));
  };

  const deleteSubTopic = (id: string) => {
    setSubTopics(subTopics.filter(st => st.id !== id));
  };

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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-dashboard-800">Sub-Topics</h2>
        <Button onClick={addSubTopic} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Sub-Topic
        </Button>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {subTopics.map((subTopic) => (
          <AccordionItem key={subTopic.id} value={subTopic.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <Input
                value={subTopic.title}
                onChange={(e) => updateSubTopicTitle(subTopic.id, e.target.value)}
                placeholder="Sub-topic title"
                className="max-w-[200px]"
              />
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteSubTopic(subTopic.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
                <AccordionTrigger />
              </div>
            </div>

            <AccordionContent className="pt-4">
              <div className="space-y-4">
                {subTopic.places.map((place) => (
                  <div key={place.id} className="space-y-3 p-4 bg-dashboard-100 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 space-y-3">
                        <Input
                          value={place.name}
                          onChange={(e) => updatePlace(subTopic.id, place.id, 'name', e.target.value)}
                          placeholder="Place name"
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
                        />
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-dashboard-700">
                            Photos
                          </label>
                          <div className="grid grid-cols-2 gap-4">
                            {place.photos.map((photo, index) => (
                              <ImageDropzone
                                key={index}
                                currentImage={photo}
                                onImageUpload={(file) => handlePlacePhotoUpload(subTopic.id, place.id, file)}
                                onImageRemove={() => removePlacePhoto(subTopic.id, place.id, index)}
                                className="h-32"
                              />
                            ))}
                            <ImageDropzone
                              onImageUpload={(file) => handlePlacePhotoUpload(subTopic.id, place.id, file)}
                              className="h-32"
                            />
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deletePlace(subTopic.id, place.id)}
                        className="ml-2"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => addPlace(subTopic.id)}
                  className="w-full mt-4"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Place
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};