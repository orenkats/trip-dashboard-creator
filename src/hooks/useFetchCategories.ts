import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../services/api/fetchCategories';
import { Category } from '../services/types';

export const useFetchCategories = (postId: string) => {
  return useQuery({
    queryKey: ['categories', postId], // Unique key with dynamic parameter
    queryFn: () => fetchCategories(postId), // Fetch function
    enabled: !!postId, // Only run if postId is provided
  });
};
