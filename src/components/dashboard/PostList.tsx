import { Dashboard } from './types';
import { BookmarkIcon, MapPin, Edit2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from "@/hooks/use-toast";

interface PostListProps {
  posts: Dashboard[];
  onPostClick: (post: Dashboard) => void;
  onSavePost?: (post: Dashboard) => void;
}

export const PostList = ({ posts, onPostClick, onSavePost }: PostListProps) => {
  const { toast } = useToast();

  const handleSaveClick = (e: React.MouseEvent, post: Dashboard) => {
    e.stopPropagation();
    if (onSavePost) {
      onSavePost(post);
      toast({
        title: post.isSaved ? "Removed from bookmarks" : "Added to bookmarks",
        description: post.isSaved ? "Post removed from your bookmarks" : "Post saved to your bookmarks",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div 
          key={post.id} 
          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer relative"
          onClick={() => onPostClick(post)}
        >
          {post.authorId === "1" && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                onPostClick(post);
              }}
            >
              <Edit2 size={16} />
            </Button>
          )}
          <div className="aspect-[4/3] relative overflow-hidden">
            <img 
              src={post.coverPhoto} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
              <div className="flex items-center gap-1 text-sm">
                <MapPin size={14} />
                {post.location}
              </div>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-600 text-sm mb-4">{post.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{post.authorUsername}</span>
              <Button 
                variant="ghost" 
                size="sm"
                className={post.isSaved ? "text-[#fd1d1d]" : "text-gray-500"}
                onClick={(e) => handleSaveClick(e, post)}
              >
                <BookmarkIcon size={16} className="mr-1" />
                {post.savedCount}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};