import axios from "axios";
import { Post } from "../types";

export const fetchPosts = async (filters: { location?: string; sortBy?: string }): Promise<Post[]> => {
  const { location, sortBy } = filters;
  const params = new URLSearchParams();

  if (location) params.append("location", location);
  if (sortBy) params.append("sortBy", sortBy);

  const response = await axios.get(`/api/posts?${params.toString()}`);
  return response.data;
};
