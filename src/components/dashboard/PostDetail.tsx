import { useState } from 'react';
import { Dashboard, Comment } from './types';
import { X, MapPin, BookmarkIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { PlaceDetail } from './PlaceDetail';
import { Comments } from './Comments';
import { useToast } from "@/hooks/use-toast";

interface PostDetailProps {
  post: Dashboard;
  onClose: () => void;
}

export const PostDetail = ({ post, onClose }: PostDetailProps) => {
  const [currentPost, setCurrentPost] = useState(post);
  const { toast } = useToast();

  const handleBookmark = () => {
    setCurrentPost(prev => ({
      ...prev,
      isSaved: !prev.isSaved,
      savedCount: prev.isSaved ? prev.savedCount - 1 : prev.savedCount + 1
    }));

    toast({
      title: currentPost.isSaved ? "Removed from bookmarks" : "Added to bookmarks",
      description: currentPost.isSaved ? "Post removed from your bookmarks" : "Post saved to your bookmarks",
    });
  };

  const handleAddComment = (content: string) => {
    const newComment: Comment = {
      id: Math.random().toString(),
      content,
      authorUsername: "current_user", // In a real app, this would come from auth
      createdAt: new Date().toISOString(),
    };

    setCurrentPost(prev => ({
      ...prev,
      comments: [newComment, ...prev.comments]
    }));
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{currentPost.title}</h2>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className={currentPost.isSaved ? "text-[#fd1d1d]" : ""}
          >
            <BookmarkIcon size={20} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClose}
          >
            <X size={20} />
          </Button>
        </div>
      </div>
      
      <div className="aspect-[21/9] relative rounded-xl overflow-hidden mb-6">
        <img 
          src={currentPost.coverPhoto} 
          alt={currentPost.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <p className="text-lg mb-2">{currentPost.description}</p>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            {currentPost.location}
          </div>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-400px)]">
        {currentPost.subTopics.map((subTopic) => (
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
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <Comments 
              comments={currentPost.comments || []} 
              onAddComment={handleAddComment}
            />
          </CardContent>
        </Card>
      </ScrollArea>
    </div>
  );
};