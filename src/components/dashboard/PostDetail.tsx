import { useState } from 'react';
import { Dashboard, Comment } from './types';
import { X, MapPin, BookmarkIcon, Edit2, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { PlaceDetail } from './PlaceDetail';
import { Comments } from './Comments';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface PostDetailProps {
  post: Dashboard;
  onClose: () => void;
}

export const PostDetail = ({ post, onClose }: PostDetailProps) => {
  const [currentPost, setCurrentPost] = useState(post);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedDescription, setEditedDescription] = useState(post.description);
  const [editedLocation, setEditedLocation] = useState(post.location);
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
      authorUsername: "current_user",
      createdAt: new Date().toISOString(),
    };

    setCurrentPost(prev => ({
      ...prev,
      comments: [newComment, ...prev.comments]
    }));
  };

  const handleSaveEdit = () => {
    setCurrentPost(prev => ({
      ...prev,
      title: editedTitle,
      description: editedDescription,
      location: editedLocation
    }));
    setIsEditing(false);
    toast({
      title: "Changes saved",
      description: "Your post has been updated successfully",
    });
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        {isEditing ? (
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="text-2xl font-semibold w-full mr-4"
          />
        ) : (
          <h2 className="text-2xl font-semibold">{currentPost.title}</h2>
        )}
        <div className="flex gap-2">
          {currentPost.authorId === "1" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => isEditing ? handleSaveEdit() : setIsEditing(true)}
            >
              {isEditing ? <Check size={20} /> : <Edit2 size={20} />}
            </Button>
          )}
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
          {isEditing ? (
            <div className="space-y-2">
              <Textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="text-black mb-2"
                rows={3}
              />
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <Input
                  value={editedLocation}
                  onChange={(e) => setEditedLocation(e.target.value)}
                  className="text-black"
                />
              </div>
            </div>
          ) : (
            <>
              <p className="text-lg mb-2">{currentPost.description}</p>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                {currentPost.location}
              </div>
            </>
          )}
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-400px)]">
        <Tabs defaultValue={currentPost.subTopics[0]?.type} className="w-full">
          <TabsList className="mb-4">
            {currentPost.subTopics.map((subTopic) => (
              <TabsTrigger key={subTopic.id} value={subTopic.type}>
                {subTopic.type}
              </TabsTrigger>
            ))}
          </TabsList>

          {currentPost.subTopics.map((subTopic) => (
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
        
        <Card className="mt-6">
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