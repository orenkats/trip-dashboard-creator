import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../services/api/fetchPosts';
import FilteredPostList from '../components/posts/FilteredPostList';
import { Post } from '../services/types';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const HomePage: React.FC = () => {
  const [filters, setFilters] = useState({ sortBy: '', location: '' });

  const { data: posts = [], isLoading, error } = useQuery<Post[], Error>({
    queryKey: ['posts', filters],
    queryFn: () => fetchPosts(filters),
    staleTime: 5 * 60 * 1000,
  });

  const handlePostClick = (post: Post) => {
    console.log('Post clicked:', post);
  };

  const handleFiltersChange = (newFilters: { sortBy: string; location: string }) => {
    setFilters(newFilters);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Explore Posts
        </Typography>
      </Box>

      <FilteredPostList
        posts={posts}
        onPostClick={handlePostClick}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        isLoading={isLoading}
        error={error}
      />
    </Container>
  );
};

export default HomePage;
