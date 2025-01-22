import React from 'react';
import { Card, CardContent } from '../ui/card';
import { PlaceDetail } from './PlaceDetail';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Category } from './types';

interface PostContentProps {
  categories: Category[];
}

export const PostContent: React.FC<PostContentProps> = ({ categories }) => {
  if (categories.length === 0) {
    return null;
  }

  return (
    <Tabs defaultValue={categories[0]?.type} className="w-full">
      <div className="sticky top-0 bg-white z-10">
        <TabsList className="flex overflow-x-auto hide-scrollbar w-full justify-start border-b border-gray-100 p-0">
          {categories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.type}
              className="flex-shrink-0 whitespace-nowrap px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-[#fd1d1d] rounded-none"
            >
              {category.type}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {categories.map((category) => (
        <TabsContent key={category.id} value={category.type} className="pt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.places.map((place) => (
                  <PlaceDetail key={place.id} place={place} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};