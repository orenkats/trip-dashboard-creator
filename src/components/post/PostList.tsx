import React, { useState } from 'react';
import { Post } from './types';
import { SlidersHorizontal, MapPin } from 'lucide-react';
import { PostCard } from './PostCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface PostListProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
  onSavePost?: (post: Post) => void;
}

type SortOption = 'newest' | 'oldest' | 'mostSaved' | 'leastSaved';

export const PostList: React.FC<PostListProps> = ({ posts, onPostClick, onSavePost }) => {
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [locationFilter, setLocationFilter] = useState<string>('all');

  const uniqueLocations = ['all', ...new Set(posts.map(post => post.location))];

  const getSortedAndFilteredPosts = () => {
    return [...posts]
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
  };

  const renderFilters = () => (
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
  );

  return (
    <div className="space-y-6">
      {renderFilters()}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getSortedAndFilteredPosts().map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onPostClick={onPostClick}
            onSavePost={onSavePost}
            isCurrentUser={post.userId === "1"}
          />
        ))}
      </div>
    </div>
  );
};