import React from 'react';
import { Card, CardContent } from '../ui/card';
import { PlaceDetail } from './PlaceDetail';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { SubTopic } from './types';

interface PostContentProps {
  subTopics: SubTopic[];
}

export const PostContent: React.FC<PostContentProps> = ({ subTopics }) => {
  if (subTopics.length === 0) {
    return null;
  }

  return (
    <Tabs defaultValue={subTopics[0]?.type} className="w-full">
      <div className="relative">
        <TabsList className="mb-4 flex overflow-x-auto hide-scrollbar pb-2 -mx-2 px-2 w-full justify-start">
          {subTopics.map((subTopic) => (
            <TabsTrigger 
              key={subTopic.id} 
              value={subTopic.type}
              className="flex-shrink-0 whitespace-nowrap"
            >
              {subTopic.type}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {subTopics.map((subTopic) => (
        <TabsContent key={subTopic.id} value={subTopic.type}>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subTopic.places.map((place) => (
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