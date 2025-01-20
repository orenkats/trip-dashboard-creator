import { useState } from 'react';
import { Post } from '../types';

export const usePostList = (initialPosts: Post[]) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const handleSavePost = (postToUpdate: Post) => {
    setPosts(currentPosts =>
      currentPosts.map(post =>
        post.id === postToUpdate.id
          ? {
              ...post,
              isSaved: !post.isSaved,
              savedCount: post.isSaved ? post.savedCount - 1 : post.savedCount + 1,
            }
          : post
      )
    );
  };

  return { posts, handleSavePost };
};