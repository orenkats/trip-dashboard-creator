import React from 'react';
import { Button } from "@/components/ui/button";
import { SubTopic, SubTopicType } from './DashboardForm';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from 'lucide-react';
import { ImageDropzone } from './ImageDropzone';
import { toast } from 'sonner';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

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

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceSubTopicId = source.droppableId;
    const destSubTopicId = destination.droppableId;

    const newSubTopics = [...subTopics];
    const sourceSubTopic = newSubTopics.find(st => st.id === sourceSubTopicId);
    const destSubTopic = newSubTopics.find(st => st.id === destSubTopicId);

    if (!sourceSubTopic || !destSubTopic) return;

    const [movedPlace] = sourceSubTopic.places.splice(source.index, 1);
    destSubTopic.places.splice(destination.index, 0, movedPlace);

    setSubTopics(newSubTopics);
    toast.success("Place moved successfully!");
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

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {subTopics.map((subTopic) => (
            <div key={subTopic.id} className="flex flex-col bg-dashboard-50 rounded-lg p-4">
              <h3 className="text-xl font-medium text-dashboard-700 mb-4">
                {SUB_TOPIC_LABELS[subTopic.type]}
              </h3>

              <Droppable droppableId={subTopic.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex-1 space-y-4"
                  >
                    {subTopic.places.map((place, index) => (
                      <Draggable key={place.id} draggableId={place.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white rounded-xl border border-dashboard-200 shadow-sm hover:shadow-md transition-shadow p-4"
                          >
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1 space-y-3">
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
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium text-dashboard-700">
                                    Photos
                                  </label>
                                  <div className="grid grid-cols-2 gap-2">
                                    {place.photos.map((photo, index) => (
                                      <ImageDropzone
                                        key={index}
                                        currentImage={photo}
                                        onImageUpload={(file) => handlePlacePhotoUpload(subTopic.id, place.id, file)}
                                        onImageRemove={() => removePlacePhoto(subTopic.id, place.id, index)}
                                        className="h-24"
                                      />
                                    ))}
                                    <ImageDropzone
                                      onImageUpload={(file) => handlePlacePhotoUpload(subTopic.id, place.id, file)}
                                      className="h-24"
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
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <Button
                variant="outline"
                onClick={() => addPlace(subTopic.id)}
                className="mt-4 border-dashed border-2 hover:border-purple-500 hover:text-purple-600 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Place
              </Button>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};