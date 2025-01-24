import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../services/api/fetchPosts";
import { Post } from "../services/types";

export const useFetchPosts = (filters: { location?: string; sortBy?: string }) => {
  return useQuery<Post[]>({
    queryKey: ["posts", filters],
    queryFn: () => fetchPosts(filters),
    staleTime: 300000, // Optional: Cache for 5 minutes
  });
};
