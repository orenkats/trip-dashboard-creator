import React from "react";
import PostList from "./PostList";
import PostFilter from "./PostFilter";
import { Post } from "@/services/types";

interface FilteredPostListProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
  filters: { sortBy: string; location: string };
  onFiltersChange: (filters: { sortBy: string; location: string }) => void;
  isLoading: boolean;
  error: Error | null;
}

const FilteredPostList: React.FC<FilteredPostListProps> = ({
  posts,
  onPostClick,
  filters,
  onFiltersChange,
  isLoading,
  error,
}) => {
  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "mostSaved", label: "Most Saved" },
    { value: "leastSaved", label: "Least Saved" },
  ];

  const locationOptions = [
    { value: "", label: "All Locations" },
    ...Array.from(new Set(posts.map((post) => post.location))).map((location) => ({
      value: location,
      label: location,
    })),
  ];

  return (
    <div>
      <PostFilter
        sortBy={filters.sortBy}
        location={filters.location}
        sortOptions={sortOptions}
        locationOptions={locationOptions}
        onSortChange={(sortBy) =>
          onFiltersChange({ ...filters, sortBy })
        }
        onLocationChange={(location) =>
          onFiltersChange({ ...filters, location })
        }
      />
      {isLoading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p>Error loading posts: {error.message}</p>
      ) : (
        <PostList posts={posts} onPostClick={onPostClick} />
      )}
    </div>
  );
};

export default FilteredPostList;
