import { Dashboard } from './types';
import { X, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { PlaceDetail } from './PlaceDetail';

interface PostDetailProps {
  post: Dashboard;
  onClose: () => void;
}

export const PostDetail = ({ post, onClose }: PostDetailProps) => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{post.title}</h2>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onClose}
        >
          <X size={20} />
        </Button>
      </div>
      
      <div className="aspect-[21/9] relative rounded-xl overflow-hidden mb-6">
        <img 
          src={post.coverPhoto} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <p className="text-lg mb-2">{post.description}</p>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            {post.location}
          </div>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-400px)]">
        {post.subTopics.map((subTopic) => (
          <Card key={subTopic.id} className="mb-6">
            <CardHeader>
              <CardTitle>{subTopic.type}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subTopic.places.map((place) => (
                  <PlaceDetail key={place.id} place={place} />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
};