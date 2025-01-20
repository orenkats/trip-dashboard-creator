import React from "react";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { SubTopic } from "./types";
import PlaceCard from "./PlaceCard";

interface PostContentProps {
  subTopics: SubTopic[];
}

const PostContent: React.FC<PostContentProps> = ({ subTopics }) => {
  if (!subTopics.length) return null;

  return (
    <Tabs defaultValue={subTopics[0]?.type} className="w-full">
      <div className="sticky top-0 bg-white z-10">
        <TabsList className="flex overflow-x-auto hide-scrollbar w-full justify-start border-b border-gray-100 p-0">
          {subTopics.map((subTopic) => (
            <TabsTrigger 
              key={subTopic.id} 
              value={subTopic.type}
              className="flex-shrink-0 whitespace-nowrap px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-[#fd1d1d] rounded-none"
            >
              {subTopic.type}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {subTopics.map((subTopic) => (
        <TabsContent key={subTopic.id} value={subTopic.type} className="pt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subTopic.places.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default PostContent;