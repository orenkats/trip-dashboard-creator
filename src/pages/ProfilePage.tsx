import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAppState } from '../../store/useAppState';
import PostList from '../components/posts/PostList';
import { Post } from '../services/types';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const fetchUserPosts = async (userId: string): Promise<Post[]> => {
  const response = await fetch(`/api/users/${userId}/posts`);
  if (!response.ok) {
    throw new Error('Failed to fetch user posts');
  }
  return response.json();
};

const ProfilePage: React.FC = () => {
  const { setSelectedPost } = useAppState();
  const userId = 'currentUser'; // Replace with actual user ID logic.

  const { data: posts = [], isLoading, error } = useQuery<Post[], Error>({
    queryKey: ['userPosts', userId],
    queryFn: () => fetchUserPosts(userId),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error" variant="h6">
          Error: {error.message}
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        My Profile
      </Typography>
      <PostList
        posts={posts}
        onPostClick={(post) => setSelectedPost(post.id)}
        isCurrentUser
      />
    </Container>
  );
};

export default ProfilePage;
