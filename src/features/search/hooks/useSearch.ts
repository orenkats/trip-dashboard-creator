import { useState } from 'react';

interface SearchResult {
  id: string;
  type: 'user' | 'post';
  username?: string;
  name?: string;
  title?: string;
  location?: string;
}

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for demonstration - in a real app, this would come from an API
  const searchResults: SearchResult[] = [
    {
      id: "1",
      type: "user",
      username: "@traveler",
      name: "World Traveler"
    },
    {
      id: "2",
      type: "post",
      title: "Amazing Paris Trip",
      location: "Paris, France"
    }
  ];

  const filteredResults = searchResults.filter((result) => {
    const searchTerm = searchQuery.toLowerCase();
    if (result.type === "user") {
      return (result.username?.toLowerCase().includes(searchTerm) || 
             result.name?.toLowerCase().includes(searchTerm));
    }
    return (result.title?.toLowerCase().includes(searchTerm) || 
           result.location?.toLowerCase().includes(searchTerm));
  });

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    filteredResults
  };
};