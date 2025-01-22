import React from 'react';
import { Button } from "../ui/button";
import { Plus, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PlaceCard } from './PlaceCard';
import { Category } from './types';
import { getCategoryIcon } from './utils/topicIcons';
import styles from './styles/dashboard.module.css';

interface CategoryListProps {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export const CategoryList: React.FC<CategoryListProps> = ({ 
  categories, 
  setCategories,
}) => {
  const handlePlaceUpdate = (
    CategoryId: string,
    placeId: string,
    field: keyof Omit<Category['places'][0], 'id' | 'photos'>,
    value: string
  ) => {
    setCategories(categories.map(st => {
      if (st.id === CategoryId) {
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

  const handlePlacePhotoUpload = (CategoryId: string, placeId: string, file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setCategories(categories.map(st => {
      if (st.id === CategoryId) {
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

  const handlePlacePhotoRemove = (CategoryId: string, placeId: string, photoIndex: number) => {
    setCategories(categories.map(st => {
      if (st.id === CategoryId) {
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

  const handlePlaceDelete = (CategoryId: string, placeId: string) => {
    setCategories(categories.map(st => {
      if (st.id === CategoryId) {
        return {
          ...st,
          places: st.places.filter(p => p.id !== placeId),
        };
      }
      return st;
    }));
  };

  const handleAddPlace = (CategoryId: string) => {
    setCategories(categories.map(st => {
      if (st.id === CategoryId) {
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

  if (categories.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
        <Pencil className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600 mb-4">Start creating your travel guide!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue={categories[0].id} className="w-full">
        <TabsList className="bg-gray-100/50 p-1 rounded-xl flex overflow-x-auto hide-scrollbar">
          {categories.map((Category) => (
            <TabsTrigger 
              key={Category.id} 
              value={Category.id}
              className="flex-shrink-0 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all"
            >
              <div className="flex items-center gap-2">
                {getCategoryIcon(Category.type)}
                <span>{Category.type}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((Category) => (
          <TabsContent key={Category.id} value={Category.id} className="space-y-4 mt-6">
            <div className="grid gap-6">
              {Category.places.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  onUpdate={(field, value) => handlePlaceUpdate(Category.id, place.id, field, value)}
                  onPhotoUpload={(file) => handlePlacePhotoUpload(Category.id, place.id, file)}
                  onPhotoRemove={(photoIndex) => handlePlacePhotoRemove(Category.id, place.id, photoIndex)}
                  onDelete={() => handlePlaceDelete(Category.id, place.id)}
                />
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => handleAddPlace(Category.id)}
              className="w-full py-6 border-dashed border-2 hover:border-[#fd1d1d] hover:text-[#fd1d1d] transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add {Category.type.slice(0, -1)}
            </Button>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};