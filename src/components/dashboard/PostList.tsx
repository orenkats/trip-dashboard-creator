import React from 'react';
import { Post } from './types';
import { BookmarkIcon, MapPin, Edit2, SlidersHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from "../../hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from 'react';

interface PostListProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
  onSavePost?: (post: Post) => void;
}

type SortOption = 'newest' | 'oldest' | 'mostSaved' | 'leastSaved';

export const PostList = ({ posts, onPostClick, onSavePost }: PostListProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [locationFilter, setLocationFilter] = useState<string>('all');

  const handleSaveClick = (e: React.MouseEvent, post: Post) => {
    e.stopPropagation();
    if (onSavePost) {
      onSavePost(post);
      toast({
        title: post.isSaved ? "Removed from bookmarks" : "Added to bookmarks",
        description: post.isSaved ? "Post removed from your bookmarks" : "Post saved to your bookmarks",
      });
    }
  };

  const handleUsernameClick = (e: React.MouseEvent, username: string) => {
    e.stopPropagation();
    navigate(`/profile/${username}`);
  };

  // Get unique locations for filter dropdown
  const uniqueLocations = ['all', ...new Set(posts.map(post => post.location))];

  // Sort and filter posts
  const sortedAndFilteredPosts = [...posts]
    .filter(post => locationFilter === 'all' || post.location === locationFilter)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'mostSaved':
          return b.savedCount - a.savedCount;
        case 'leastSaved':
          return a.savedCount - b.savedCount;
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-row gap-2 overflow-x-auto bg-white p-4 rounded-lg shadow-sm -mx-4 sm:mx-0">
        <div className="flex items-center gap-2 flex-shrink-0">
          <SlidersHorizontal size={16} className="text-gray-500" />
          <Select
            value={sortBy}
            onValueChange={(value: SortOption) => setSortBy(value)}
          >
            <SelectTrigger className="w-[140px] sm:w-[180px]">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="mostSaved">Most Saved</SelectItem>
              <SelectItem value="leastSaved">Least Saved</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <MapPin size={16} className="text-gray-500" />
          <Select
            value={locationFilter}
            onValueChange={setLocationFilter}
          >
            <SelectTrigger className="w-[140px] sm:w-[180px]">
              <SelectValue placeholder="Filter by location..." />
            </SelectTrigger>
            <SelectContent>
              {uniqueLocations.map(location => (
                <SelectItem key={location} value={location}>
                  {location === 'all' ? 'All Locations' : location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedAndFilteredPosts.map((post) => (
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
                <button
                  onClick={(e) => handleUsernameClick(e, post.authorUsername)}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {post.authorUsername}
                </button>
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
    </div>
  );
};
