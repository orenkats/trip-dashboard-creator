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
      <TabsList className="mb-4">
        {subTopics.map((subTopic) => (
          <TabsTrigger key={subTopic.id} value={subTopic.type}>
            {subTopic.type}
          </TabsTrigger>
        ))}
      </TabsList>

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