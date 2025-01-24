import { useQuery } from '@tanstack/react-query';
import { searchPosts } from '../services/api/searchPosts';
import { DiscoverSearchResults } from '../services/types';

export const useSearchPosts = (query: string) => {
  return useQuery({
    queryKey: ['searchResults', query], // Unique key with query
    queryFn: () => searchPosts(query), // Fetch function
    enabled: !!query, // Only fetch if query is non-empty
    staleTime: 0, // Optional: Always fetch fresh results
  });
};
